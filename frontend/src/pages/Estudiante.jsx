import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarController, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import api from '../services/api';
import './Estudiante.css';

ChartJS.register(CategoryScale, LinearScale, BarController, BarElement, Title, Tooltip, Legend);

function Estudiante({ filters }) {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [studentMetrics, setStudentMetrics] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    if (selectedStudent) {
      fetchStudentMetrics(selectedStudent);
    }
  }, [selectedStudent, filters]);

  const fetchStudents = async () => {
    try {
      const res = await api.get('/metrics/students');
      setStudents(res.data);
      if (res.data.length > 0) {
        setSelectedStudent(res.data[0]);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const fetchStudentMetrics = async (studentName) => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (filters.startDate) queryParams.append('startDate', filters.startDate);
      if (filters.endDate) queryParams.append('endDate', filters.endDate);
      if (filters.excludeStatus) queryParams.append('excludeStatus', filters.excludeStatus);

      const res = await api.get(`/metrics/student/${encodeURIComponent(studentName)}?${queryParams}`);
      setStudentMetrics(res.data);
    } catch (error) {
      console.error('Error fetching student metrics:', error);
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

  const chartData = studentMetrics?.detalles ? {
    labels: studentMetrics.detalles.map(d => d.program_name),
    datasets: [
      {
        label: 'Recaudado',
        data: studentMetrics.detalles.map(d =>
          (d.payment_status && (d.payment_status.includes('Pagado') || d.payment_status.includes('Completo')))
            ? d.sale_amount_cop : 0
        ),
        backgroundColor: '#10b981',
        borderColor: '#059669',
        borderWidth: 1
      },
      {
        label: 'Pendiente',
        data: studentMetrics.detalles.map(d =>
          (d.payment_status && !(d.payment_status.includes('Pagado') || d.payment_status.includes('Completo')))
            ? d.sale_amount_cop : 0
        ),
        backgroundColor: '#ef4444',
        borderColor: '#dc2626',
        borderWidth: 1
      }
    ]
  } : null;

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
        text: 'Recaudo / Ingreso por Programa'
      }
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          callback: function(value) {
            return '$' + (value / 1000000).toFixed(1) + 'M';
          }
        }
      },
      y: {
        stacked: true
      }
    }
  };

  if (loading) {
    return <div className="page-loading">Cargando...</div>;
  }

  return (
    <div className="page-estudiante">
      <div className="student-selector">
        <label htmlFor="student-select">Seleccionar Estudiante:</label>
        <select
          id="student-select"
          value={selectedStudent}
          onChange={(e) => setSelectedStudent(e.target.value)}
        >
          {students.map(student => (
            <option key={student} value={student}>{student}</option>
          ))}
        </select>
      </div>

      {studentMetrics && (
        <>
          <div className="metrics-grid">
            <div className="metric-card">
              <div className="metric-label">Total Vendido</div>
              <div className="metric-value">{formatCOP(studentMetrics.totalVendido)}</div>
            </div>

            <div className="metric-card">
              <div className="metric-label">Pendiente por Recaudo</div>
              <div className="metric-value">{formatCOP(studentMetrics.pendiente)}</div>
            </div>

            <div className="metric-card">
              <div className="metric-label">Total Recaudado</div>
              <div className="metric-value">{formatCOP(studentMetrics.totalRecaudado)}</div>
            </div>

            <div className="metric-card">
              <div className="metric-label">Estado</div>
              <div className="metric-value-status">{studentMetrics.estado}</div>
            </div>

            <div className="metric-card">
              <div className="metric-label">Programas Matriculados</div>
              <div className="metric-value">{studentMetrics.programasMatriculados}</div>
            </div>
          </div>

          {chartData && (
            <div className="chart-container">
              <Bar data={chartData} options={chartOptions} />
            </div>
          )}

          <div className="table-container">
            <h3>Detalle de Programas</h3>
            <table className="metrics-table">
              <thead>
                <tr>
                  <th>Programa</th>
                  <th>Monto Vendido</th>
                  <th>Estado de Pago</th>
                  <th>Método de Pago</th>
                </tr>
              </thead>
              <tbody>
                {studentMetrics.detalles?.map((d, idx) => (
                  <tr key={idx}>
                    <td>{d.program_name}</td>
                    <td>{formatCOP(d.sale_amount_cop)}</td>
                    <td>
                      <span className={`badge badge-${d.payment_status?.includes('Pagado') || d.payment_status?.includes('Completo') ? 'success' : 'warning'}`}>
                        {d.payment_status || 'Sin info'}
                      </span>
                    </td>
                    <td>{d.payment_method || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default Estudiante;
