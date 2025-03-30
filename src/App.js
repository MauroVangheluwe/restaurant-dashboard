import React, { useState, useEffect } from 'react';
import LeftSidebar from './components/LeftSidebar';
import CenterContent from './components/CenterContent';
import { initializeTables } from './data/tableLayout';
import './App.css';

function App() {
  const [tables, setTables] = useState(initializeTables());
  const [upcomingReservations, setUpcomingReservations] = useState([]);
  const [nextReservationId, setNextReservationId] = useState(1);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    const currentRevenue = tables.reduce((sum, table) => sum + (table.reserved ? table.bill : 0), 0);
    setTotalRevenue(currentRevenue);
  }, [tables]);

  const handleAddUpcomingReservation = (newReservation) => {
    setUpcomingReservations(prev => [...prev, newReservation].sort((a, b) => new Date(a.reservationTime) - new Date(b.reservationTime)));
    setNextReservationId(prevId => prevId + 1);
  };

  const handleAssignReservationToTable = (reservationId, tableId) => {
    const reservation = upcomingReservations.find(res => res.id === reservationId);
    const tableToAssign = tables.find(t => t.id === tableId);

    if (!reservation || !tableToAssign) return;

    if (tableToAssign.reserved || tableToAssign.capacity < reservation.numberOfGuests) {
      alert(`Kan reservering niet toewijzen: Tafel ${tableId} is ${tableToAssign.reserved ? 'bezet' : `niet groot genoeg (${tableToAssign.capacity}p) voor ${reservation.numberOfGuests} gasten`}.`);
      return;
    }

    setTables(prevTables =>
      prevTables.map(table =>
        table.id === tableId
          ? {
            ...table,
            reserved: true,
            guestName: reservation.guestName,
            numberOfGuests: reservation.numberOfGuests,
            specialRequests: reservation.specialRequests,
            isBirthday: reservation.isBirthday,
            reservationTime: new Date(),
            order: [],
            bill: 0,
          }
          : table
      )
    );

    setUpcomingReservations(prev => prev.filter(res => res.id !== reservationId));
  };

  const handleUpdateTable = (tableId, updates) => {
    setTables(prevTables => prevTables.map(table => table.id === tableId ? { ...table, ...updates } : table));
  };

  const handleClearTable = (tableId) => {
    setTables(prevTables =>
      prevTables.map(table => {
        if (table.id === tableId) {
          const initialTableState = initializeTables().find(t => t.id === tableId);
          return initialTableState ? { ...initialTableState } : table;
        }
        return table;
      })
    );
  };

  const formatCurrency = (amount) => {
    const numericAmount = Number(amount);
    if (isNaN(numericAmount)) return '€ --,--';
    return numericAmount.toLocaleString('nl-BE', { style: 'currency', currency: 'EUR' });
  };

  const reservedTablesCount = tables.filter(t => t.reserved).length;
  const availableTablesCount = tables.length - reservedTablesCount;

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-branding">
          <span className="header-logo-placeholder"></span>
          <h1 className="header-title">Ristorante Bella Italia Dashboard</h1>
        </div>
        <div className="header-stats">
          <div className="stat-item">
            <span className="stat-label">Actieve Rekeningen:</span>
            <span className="stat-value">{formatCurrency(totalRevenue)}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Bezet:</span>
            <span className="stat-value">{reservedTablesCount}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Beschikbaar:</span>
            <span className="stat-value">{availableTablesCount}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Totaal Tafels:</span>
            <span className="stat-value">{tables.length}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Komende Res.:</span>
            <span className="stat-value">{upcomingReservations.length}</span>
          </div>
        </div>
      </header>

      <div className="app-body">
        <LeftSidebar
          upcomingReservations={upcomingReservations}
          addUpcomingReservation={handleAddUpcomingReservation}
          assignReservationToTable={handleAssignReservationToTable}
          tables={tables}
          nextReservationId={nextReservationId}
        />
        <CenterContent
          tables={tables}
          updateTable={handleUpdateTable}
          clearTable={handleClearTable}
          assignReservationToTable={handleAssignReservationToTable}
        />
      </div>
    </div>
  );
}

export default App;