import React from 'react';
import TableCard from './TableCard';
import './CenterContent.css';

const CenterContent = ({ tables, updateTable, clearTable, assignReservationToTable }) => {
  return (
    <main className="center-content">
      <h2>Tafel Overzicht & Beheer</h2>
      <div className="restaurant-layout">
        {tables.map((table) => (
          <TableCard
            key={table.id}
            table={table}
            onUpdateTable={updateTable}
            onClearTable={clearTable}
            onAssignViaDrop={assignReservationToTable} // Function to handle reservation assignment via drag-and-drop
            style={{
              gridRow: table.gridRow,
              gridColumn: table.gridColumn,
            }}
          />
        ))}
      </div>
    </main>
  );
};

export default CenterContent;