import React, { useState } from 'react';
import './Filters.css';

function Filters({ filters, setFilters }) {
  const [startDate, setStartDate] = useState(filters.startDate || '');
  const [endDate, setEndDate] = useState(filters.endDate || '');
  const [excludeStatus, setExcludeStatus] = useState(filters.excludeStatus || 'Retirado');

  const handleApply = () => {
    setFilters({
      startDate: startDate || null,
      endDate: endDate || null,
      excludeStatus
    });
  };

  const handleReset = () => {
    setStartDate('');
    setEndDate('');
    setExcludeStatus('Retirado');
    setFilters({
      startDate: null,
      endDate: null,
      excludeStatus: 'Retirado'
    });
  };

  return (
    <div className="filters-container">
      <div className="filters-content">
        <div className="filter-group">
          <label htmlFor="startDate">Fecha Inicial</label>
          <input
            id="startDate"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="endDate">Fecha Final</label>
          <input
            id="endDate"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="excludeStatus">Excluir Estado</label>
          <select
            id="excludeStatus"
            value={excludeStatus}
            onChange={(e) => setExcludeStatus(e.target.value)}
          >
            <option value="">Ninguno</option>
            <option value="Retirado">Retirado</option>
            <option value="Inactivo">Inactivo</option>
          </select>
        </div>

        <div className="filter-actions">
          <button className="btn-apply" onClick={handleApply}>Aplicar</button>
          <button className="btn-reset" onClick={handleReset}>Limpiar</button>
        </div>
      </div>
    </div>
  );
}

export default Filters;
