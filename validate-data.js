#!/usr/bin/env node

/**
 * MÉTRIK - Data Validation Script
 * Verifica integridad de datos y calcula estadísticas
 */

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = path.join(__dirname, 'db.sqlite');
const db = new sqlite3.Database(DB_PATH);

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

async function validateData() {
  console.log('🔍 MÉTRIK - Data Validation Report\n');
  console.log('='.repeat(50));

  try {
    // Estadísticas por tabla
    const students = await runQuerySingle('SELECT COUNT(*) as count FROM students');
    const programs = await runQuerySingle('SELECT COUNT(*) as count FROM programs');
    const campaigns = await runQuerySingle('SELECT COUNT(*) as count FROM campaigns');
    const sales = await runQuerySingle('SELECT COUNT(*) as count FROM sales');
    const cart = await runQuerySingle('SELECT COUNT(*) as count FROM cart');

    console.log('\n📊 TABLE STATISTICS');
    console.log('-'.repeat(50));
    console.log(`Students:      ${students.count} registros`);
    console.log(`Programs:      ${programs.count} registros`);
    console.log(`Campaigns:     ${campaigns.count} registros`);
    console.log(`Sales:         ${sales.count} registros`);
    console.log(`Cart:          ${cart.count} registros`);

    // Validación de integridad referencial
    console.log('\n🔗 REFERENTIAL INTEGRITY');
    console.log('-'.repeat(50));

    const orphanedSales = await runQuerySingle(
      `SELECT COUNT(*) as count FROM sales s
       WHERE s.student_id NOT IN (SELECT id FROM students)
       OR s.program_id NOT IN (SELECT id FROM programs)`
    );

    console.log(`Orphaned sales records: ${orphanedSales.count}`);

    if (orphanedSales.count > 0) {
      console.log('⚠️  WARNING: Found orphaned records!');
    } else {
      console.log('✅ All foreign keys valid');
    }

    // Análisis de datos
    console.log('\n💰 FINANCIAL METRICS');
    console.log('-'.repeat(50));

    const totalSales = await runQuerySingle(
      'SELECT SUM(sale_amount_cop) as total FROM sales'
    );

    const totalPaid = await runQuerySingle(
      `SELECT SUM(sale_amount_cop) as total FROM sales
       WHERE payment_status LIKE '%Pagado%' OR payment_status LIKE '%Completo%'`
    );

    const totalPending = await runQuerySingle(
      `SELECT SUM(sale_amount_cop) as total FROM sales
       WHERE payment_status NOT LIKE '%Pagado%' AND payment_status NOT LIKE '%Completo%'`
    );

    const formatCOP = (value) => {
      return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
      }).format(value || 0);
    };

    console.log(`Total Ventas:       ${formatCOP(totalSales.total)}`);
    console.log(`Total Recaudado:    ${formatCOP(totalPaid.total)}`);
    console.log(`Total Pendiente:    ${formatCOP(totalPending.total)}`);

    const recoveryRate = totalSales.total
      ? ((totalPaid.total / totalSales.total) * 100).toFixed(2)
      : 0;
    console.log(`Tasa de Cobranza:   ${recoveryRate}%`);

    // Top programas
    console.log('\n🏆 TOP 5 PROGRAMS');
    console.log('-'.repeat(50));

    const topPrograms = await runQuery(
      `SELECT p.name, COUNT(*) as ventas, SUM(s.sale_amount_cop) as total
       FROM sales s
       JOIN programs p ON s.program_id = p.id
       GROUP BY p.id, p.name
       ORDER BY total DESC
       LIMIT 5`
    );

    topPrograms.forEach((p, i) => {
      console.log(`${i + 1}. ${p.name}`);
      console.log(`   Ventas: ${p.ventas} | Total: ${formatCOP(p.total)}`);
    });

    // Top campaña
    console.log('\n📢 TOP 5 CAMPAIGNS');
    console.log('-'.repeat(50));

    const topCampaigns = await runQuery(
      `SELECT COALESCE(c.name, 'Sin Campaña') as campaign, COUNT(*) as ventas, SUM(s.sale_amount_cop) as total
       FROM sales s
       LEFT JOIN campaigns c ON s.campaign_id = c.id
       GROUP BY s.campaign_id, c.name
       ORDER BY total DESC
       LIMIT 5`
    );

    topCampaigns.forEach((c, i) => {
      console.log(`${i + 1}. ${c.campaign}`);
      console.log(`   Ventas: ${c.ventas} | Total: ${formatCOP(c.total)}`);
    });

    // Rango de fechas
    console.log('\n📅 DATA RANGE');
    console.log('-'.repeat(50));

    const dateRange = await runQuerySingle(
      'SELECT MIN(sale_date) as minDate, MAX(sale_date) as maxDate FROM sales'
    );

    console.log(`Min Date: ${dateRange.minDate || 'N/A'}`);
    console.log(`Max Date: ${dateRange.maxDate || 'N/A'}`);

    // Estados
    console.log('\n🔖 STATUS DISTRIBUTION');
    console.log('-'.repeat(50));

    const statusDist = await runQuery(
      `SELECT status, COUNT(*) as count
       FROM sales
       GROUP BY status
       ORDER BY count DESC`
    );

    statusDist.forEach(s => {
      console.log(`${s.status}: ${s.count}`);
    });

    // Validación de completitud
    console.log('\n✅ DATA COMPLETENESS');
    console.log('-'.repeat(50));

    const nullSales = await runQuerySingle(
      `SELECT COUNT(*) as count FROM sales
       WHERE sale_amount_cop IS NULL OR sale_amount_cop = 0`
    );

    console.log(`Sales with null amount: ${nullSales.count}`);

    const nullPaymentStatus = await runQuerySingle(
      'SELECT COUNT(*) as count FROM sales WHERE payment_status IS NULL OR payment_status = ""'
    );

    console.log(`Missing payment status: ${nullPaymentStatus.count}`);

    // Resumen
    console.log('\n' + '='.repeat(50));
    console.log('✅ VALIDATION COMPLETE');
    console.log('='.repeat(50) + '\n');

  } catch (error) {
    console.error('❌ Error during validation:', error);
  } finally {
    db.close();
  }
}

validateData();
