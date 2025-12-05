import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarController, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import api from '../services/api';
import './Marketing.css';

ChartJS.register(CategoryScale, LinearScale, BarController, BarElement, Title, Tooltip, Legend);

function Marketing({ filters }) {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCampaigns();
  }, [filters]);

  const fetchCampaigns = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (filters.startDate) queryParams.append('startDate', filters.startDate);
      if (filters.endDate) queryParams.append('endDate', filters.endDate);
      if (filters.excludeStatus) queryParams.append('excludeStatus', filters.excludeStatus);

      const res = await api.get(`/metrics/campaigns?${queryParams}`);
      setCampaigns(res.data);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
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

  const totalVentas = campaigns.reduce((sum, c) => sum + (c.ventasTotales || 0), 0);
  const totalRecaudo = campaigns.reduce((sum, c) => sum + (c.recaudoTotal || 0), 0);
  const totalCampaigns = campaigns.length;
  const totalEstudiantes = campaigns.reduce((sum, c) => sum + (c.estudiantes || 0), 0);
  const promedioEfectividad = campaigns.length > 0
    ? (campaigns.reduce((sum, c) => sum + (c.efectividad || 0), 0) / campaigns.length).toFixed(2)
    : 0;

  const chartData = {
    labels: campaigns.map(c => c.campaign),
    datasets: [
      {
        label: 'Ventas Totales (COP)',
        data: campaigns.map(c => c.ventasTotales || 0),
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
        text: 'Ventas Totales por Campaña'
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
    <div className="page-marketing">
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-label">Ventas Totales Campañas</div>
          <div className="metric-value">{formatCOP(totalVentas)}</div>
          <div className="metric-subtext">en COP</div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Total Recaudado Campañas</div>
          <div className="metric-value">{formatCOP(totalRecaudo)}</div>
          <div className="metric-subtext">en COP</div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Total Campañas Realizadas</div>
          <div className="metric-value">{totalCampaigns}</div>
          <div className="metric-subtext">campañas</div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Efectividad Promedio</div>
          <div className="metric-value">{promedioEfectividad}%</div>
          <div className="metric-subtext">tasa promedio</div>
        </div>

        <div className="metric-card">
          <div className="metric-label">Estudiantes Por Campaña</div>
          <div className="metric-value">{totalEstudiantes}</div>
          <div className="metric-subtext">total</div>
        </div>
      </div>

      <div className="chart-container">
        <Bar data={chartData} options={chartOptions} />
      </div>

      <div className="table-container">
        <h3>Detalle por Campaña</h3>
        <table className="metrics-table">
          <thead>
            <tr>
              <th>Campaña</th>
              <th>Ventas</th>
              <th>Total Vendido</th>
              <th>Recaudado</th>
              <th>Estudiantes</th>
              <th>Efectividad</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((c, idx) => (
              <tr key={idx}>
                <td className="campaign-name">{c.campaign}</td>
                <td>{c.totalVentas}</td>
                <td>{formatCOP(c.ventasTotales)}</td>
                <td>{formatCOP(c.recaudoTotal)}</td>
                <td>{c.estudiantes}</td>
                <td>
                  <div className="efectividad-bar">
                    <div className="efectividad-fill" style={{ width: `${Math.min(c.efectividad, 100)}%` }}>
                      {c.efectividad?.toFixed(1)}%
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Marketing;
