import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarController, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import api from '../services/api';
import './General.css';

ChartJS.register(CategoryScale, LinearScale, BarController, BarElement, Title, Tooltip, Legend);

function General({ filters }) {
  const [metrics, setMetrics] = useState(null);
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMetrics();
  }, [filters]);

  const fetchMetrics = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (filters.startDate) queryParams.append('startDate', filters.startDate);
      if (filters.endDate) queryParams.append('endDate', filters.endDate);
      if (filters.excludeStatus) queryParams.append('excludeStatus', filters.excludeStatus);

      const [generalRes, programsRes] = await Promise.all([
        api.get(`/metrics/general?${queryParams}`),
        api.get(`/metrics/programs?${queryParams}`)
      ]);

      setMetrics(generalRes.data);
      setPrograms(programsRes.data);
    } catch (error) {
      console.error('Error fetching metrics:', error);
    }
    setLoading(false);
  };

  const formatCOP = (value) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value || 0);
  };

  const chartData = {
    labels: programs.map(p => p.program),
    datasets: [
      {
        label: 'Ventas Totales (COP)',
        data: programs.map(p => p.ventasTotales || 0),
        backgroundColor: '#2563eb',
        borderColor: '#1e40af',
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    indexAxis: 'y',
    plugins: {
      legend: {
        display: true,
        position: 'bottom'
      },
      title: {
        display: true,
        text: 'Ventas Totales por Programa'
      }
    },
    scales: {
      x: {
        ticks: {
          callback: function(value) {
            return '$' + (value / 1000000).toFixed(1) + 'M';
          }
        }
      }
    }
  };

  if (loading) {
    return <div className="page-loading">Cargando...</div>;
  }

  return (
    <div className="page-general">
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-label">Ventas Totales</div>
          <div className="metric-value">{metrics?.totalTransactions || 0}</div>
          <div className="metric-subtext">transacciones</div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Total Recaudado</div>
          <div className="metric-value">{formatCOP(metrics?.totalRecaudado)}</div>
          <div className="metric-subtext">en COP</div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Cartera Pendiente</div>
          <div className="metric-value">{formatCOP(metrics?.carteraPendiente)}</div>
          <div className="metric-subtext">por recaudar</div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Programas Vendidos</div>
          <div className="metric-value">{metrics?.programasVendidos || 0}</div>
          <div className="metric-subtext">programas únicos</div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Estudiantes Atendidos</div>
          <div className="metric-value">{metrics?.estudiantesAtendidos || 0}</div>
          <div className="metric-subtext">total</div>
        </div>
      </div>

      <div className="chart-container">
        <Bar data={chartData} options={chartOptions} />
      </div>

      <div className="table-container">
        <h3>Detalle por Programa</h3>
        <table className="metrics-table">
          <thead>
            <tr>
              <th>Programa</th>
              <th>Ventas</th>
              <th>Total Vendido</th>
              <th>Estudiantes</th>
              <th>Recaudado</th>
            </tr>
          </thead>
          <tbody>
            {programs.map((p, idx) => (
              <tr key={idx}>
                <td>{p.program}</td>
                <td>{p.totalVentas}</td>
                <td>{formatCOP(p.ventasTotales)}</td>
                <td>{p.estudiantes}</td>
                <td>{formatCOP(p.recaudoTotal)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default General;
