const express = require('express');
const router = express.Router();
const db = require('../db');

// Función helper para ejecutar queries
function runQuery(query, params = []) {
  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows || []);
    });
  });
}

function runQuerySingle(query, params = []) {
  return new Promise((resolve, reject) => {
    db.get(query, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

// METRICAS GENERALES
router.get('/general', async (req, res) => {
  try {
    const { startDate, endDate, excludeStatus } = req.query;

    let statusFilter = '';
    if (excludeStatus) {
      statusFilter = `AND s.status != '${excludeStatus}'`;
    }

    let dateFilter = '';
    if (startDate && endDate) {
      dateFilter = `AND s.sale_date BETWEEN '${startDate}' AND '${endDate}'`;
    }

    const totalSales = await runQuerySingle(
      `SELECT COUNT(*) as count, SUM(s.sale_amount_cop) as total
       FROM sales s
       WHERE 1=1 ${dateFilter} ${statusFilter}`
    );

    const programsCount = await runQuerySingle(
      `SELECT COUNT(DISTINCT program_id) as count FROM sales ${statusFilter}`
    );

    const studentsCount = await runQuerySingle(
      `SELECT COUNT(DISTINCT student_id) as count FROM sales ${statusFilter}`
    );

    const pendingAmount = await runQuerySingle(
      `SELECT SUM(sale_amount_cop) as total FROM sales
       WHERE payment_status NOT LIKE '%Pagado%' AND payment_status NOT LIKE '%Completo%' ${statusFilter}`
    );

    res.json({
      totalSales: totalSales?.total || 0,
      totalTransactions: totalSales?.count || 0,
      totalRecaudado: totalSales?.total || 0,
      carteraPendiente: pendingAmount?.total || 0,
      programasVendidos: programsCount?.count || 0,
      estudiantesAtendidos: studentsCount?.count || 0
    });
  } catch (error) {
    console.error('Error fetching general metrics:', error);
    res.status(500).json({ error: error.message });
  }
});

// METRICAS POR ESTUDIANTE
router.get('/student/:studentName', async (req, res) => {
  try {
    const { studentName } = req.params;
    const { startDate, endDate, excludeStatus } = req.query;

    let statusFilter = '';
    if (excludeStatus) {
      statusFilter = `AND s.status != '${excludeStatus}'`;
    }

    let dateFilter = '';
    if (startDate && endDate) {
      dateFilter = `AND s.sale_date BETWEEN '${startDate}' AND '${endDate}'`;
    }

    const student = await runQuerySingle(
      `SELECT id FROM students WHERE name = ?`,
      [studentName]
    );

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const studentSales = await runQuery(
      `SELECT s.*, p.name as program_name, s.status
       FROM sales s
       JOIN programs p ON s.program_id = p.id
       WHERE s.student_id = ? ${dateFilter} ${statusFilter}
       ORDER BY s.sale_date DESC`,
      [student.id]
    );

    const totalVendido = studentSales.reduce((sum, s) => sum + (s.sale_amount_cop || 0), 0);

    const totalRecaudado = studentSales
      .filter(s => s.payment_status && (s.payment_status.includes('Pagado') || s.payment_status.includes('Completo')))
      .reduce((sum, s) => sum + (s.sale_amount_cop || 0), 0);

    const pendiente = totalVendido - totalRecaudado;

    res.json({
      estudiante: studentName,
      totalVendido,
      totalRecaudado,
      pendiente,
      estado: student.status || 'Activo',
      programasMatriculados: studentSales.length,
      detalles: studentSales
    });
  } catch (error) {
    console.error('Error fetching student metrics:', error);
    res.status(500).json({ error: error.message });
  }
});

// METRICAS POR PROGRAMA
router.get('/programs', async (req, res) => {
  try {
    const { startDate, endDate, excludeStatus } = req.query;

    let statusFilter = '';
    if (excludeStatus) {
      statusFilter = `AND s.status != '${excludeStatus}'`;
    }

    let dateFilter = '';
    if (startDate && endDate) {
      dateFilter = `AND s.sale_date BETWEEN '${startDate}' AND '${endDate}'`;
    }

    const programMetrics = await runQuery(
      `SELECT
        p.name as program,
        COUNT(DISTINCT s.id) as totalVentas,
        SUM(s.sale_amount_cop) as ventasTotales,
        COUNT(DISTINCT s.student_id) as estudiantes,
        SUM(CASE WHEN s.payment_status LIKE '%Pagado%' OR s.payment_status LIKE '%Completo%'
          THEN s.sale_amount_cop ELSE 0 END) as recaudoTotal
       FROM sales s
       JOIN programs p ON s.program_id = p.id
       WHERE 1=1 ${dateFilter} ${statusFilter}
       GROUP BY p.id, p.name
       ORDER BY ventasTotales DESC`
    );

    res.json(programMetrics);
  } catch (error) {
    console.error('Error fetching program metrics:', error);
    res.status(500).json({ error: error.message });
  }
});

// METRICAS POR CAMPAÑA
router.get('/campaigns', async (req, res) => {
  try {
    const { startDate, endDate, excludeStatus } = req.query;

    let statusFilter = '';
    if (excludeStatus) {
      statusFilter = `AND s.status != '${excludeStatus}'`;
    }

    let dateFilter = '';
    if (startDate && endDate) {
      dateFilter = `AND s.sale_date BETWEEN '${startDate}' AND '${endDate}'`;
    }

    const campaignMetrics = await runQuery(
      `SELECT
        COALESCE(c.name, 'Sin Campaña') as campaign,
        COUNT(DISTINCT s.id) as totalVentas,
        SUM(s.sale_amount_cop) as ventasTotales,
        COUNT(DISTINCT s.student_id) as estudiantes,
        SUM(CASE WHEN s.payment_status LIKE '%Pagado%' OR s.payment_status LIKE '%Completo%'
          THEN s.sale_amount_cop ELSE 0 END) as recaudoTotal,
        ROUND(100.0 * COUNT(DISTINCT s.student_id) /
          (SELECT COUNT(DISTINCT student_id) FROM sales WHERE 1=1 ${dateFilter} ${statusFilter}), 2) as efectividad
       FROM sales s
       LEFT JOIN campaigns c ON s.campaign_id = c.id
       WHERE 1=1 ${dateFilter} ${statusFilter}
       GROUP BY s.campaign_id, c.name
       ORDER BY ventasTotales DESC`
    );

    res.json(campaignMetrics);
  } catch (error) {
    console.error('Error fetching campaign metrics:', error);
    res.status(500).json({ error: error.message });
  }
});

// OBTENER LISTADO DE ESTUDIANTES
router.get('/students', async (req, res) => {
  try {
    const students = await runQuery(
      `SELECT DISTINCT name FROM students ORDER BY name ASC`
    );
    res.json(students.map(s => s.name));
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: error.message });
  }
});

// OBTENER RANGO DE FECHAS DISPONIBLES
router.get('/date-range', async (req, res) => {
  try {
    const range = await runQuerySingle(
      `SELECT MIN(sale_date) as minDate, MAX(sale_date) as maxDate FROM sales`
    );
    res.json(range);
  } catch (error) {
    console.error('Error fetching date range:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
