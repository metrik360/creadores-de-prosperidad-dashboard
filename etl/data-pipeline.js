const axios = require('axios');
const csv = require('csv-parse');
const db = require('../db');

const GOOGLE_SHEETS_URL = 'https://docs.google.com/spreadsheets/d/1xPx1KNRJg0n6pYmKUn7cwD0kEs999xso3cLlwxZe1sg/gviz/tq?tqx=out:csv&gid=739894217';

async function loadDataFromGoogleSheets() {
  console.log('Fetching data from Google Sheets...');
  try {
    const response = await axios.get(GOOGLE_SHEETS_URL);
    const csvData = response.data;

    return new Promise((resolve, reject) => {
      const records = [];
      const parser = csv.parse({
        columns: true,
        skip_empty_lines: true,
        trim: true
      });

      parser.on('readable', function() {
        let record;
        while (record = parser.read()) {
          records.push(record);
        }
      });

      parser.on('error', reject);
      parser.on('end', () => {
        console.log(`Loaded ${records.length} records from Google Sheets`);
        resolve(records);
      });

      parser.write(csvData);
      parser.end();
    });
  } catch (error) {
    console.error('Error fetching Google Sheets:', error.message);
    throw error;
  }
}

function parseAmount(value) {
  if (!value) return 0;
  return parseFloat(String(value).replace(/[^\d.-]/g, '')) || 0;
}

function parseDate(dateStr) {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  return isNaN(date.getTime()) ? null : date.toISOString().split('T')[0];
}

function insertOrIgnore(table, column, value, callback) {
  db.run(
    `INSERT OR IGNORE INTO ${table} (${column}) VALUES (?)`,
    [value],
    function(err) {
      if (err) {
        console.error(`Error inserting into ${table}:`, err);
        callback(null);
      } else {
        db.get(
          `SELECT id FROM ${table} WHERE ${column} = ?`,
          [value],
          (err, row) => callback(row ? row.id : null)
        );
      }
    }
  );
}

async function processPipeline() {
  try {
    const records = await loadDataFromGoogleSheets();

    console.log('Starting data pipeline...');

    let processedCount = 0;

    for (const record of records) {
      // Mapeo de columnas - usar los nombres exactos
      const studentName = record['ESTUDIANTE']?.trim();
      const programName = record['PROGRAMA']?.trim();
      const campaignName = record['CAMPAÑA( Juli)']?.trim() || 'Sin Campaña';
      const status = record['ESTADO']?.trim();

      // Intentar parsear monto - la columna principal es 'TOTAL VENTA *EXP COP*'
      let saleAmount = parseAmount(record['TOTAL VENTA *EXP COP*']);
      if (!saleAmount || saleAmount === 0) {
        // Si no hay valor válido en COP, intenta USD
        saleAmount = parseAmount(record['TOTAL VENTA $/Usd !AJUSTADO!']);
      }

      const paymentStatus = record['ESTADO PAGOS']?.trim();
      const paymentMethod = record['MEDIO DE PAGO']?.trim();

      if (!studentName || !programName) {
        continue;
      }

      // Filtrar registros con estado "Retirado"
      if (status === 'Retirado') {
        continue;
      }

      await new Promise((resolve) => {
        insertOrIgnore('students', 'name', studentName, (studentId) => {
          if (!studentId) {
            resolve();
            return;
          }

          insertOrIgnore('programs', 'name', programName, (programId) => {
            if (!programId) {
              resolve();
              return;
            }

            insertOrIgnore('campaigns', 'name', campaignName, (campaignId) => {
              // Buscar columna de fecha - puede ser varias opciones
              let saleDate = null;
              const dateColumns = [
                record[''],  // Primera columna vacía contiene el año
              ];

              // Si hay fecha disponible, usar; si no, usar fecha actual
              if (!saleDate) {
                saleDate = new Date().toISOString().split('T')[0];
              }

              db.run(
                `INSERT OR IGNORE INTO sales
                (student_id, program_id, campaign_id, sale_date, sale_amount_cop, currency, status, payment_status, payment_method)
                VALUES (?, ?, ?, ?, ?, 'COP', ?, ?, ?)`,
                [studentId, programId, campaignId, saleDate, saleAmount, status, paymentStatus, paymentMethod],
                (err) => {
                  if (err) {
                    console.error('Error inserting sale:', err);
                  }
                  processedCount++;
                  resolve();
                }
              );
            });
          });
        });
      });
    }

    console.log(`Pipeline completed. Processed ${processedCount} records.`);
    db.close();
  } catch (error) {
    console.error('Pipeline error:', error);
    db.close();
    process.exit(1);
  }
}

processPipeline();
