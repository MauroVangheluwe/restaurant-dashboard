import React from 'react';
import ReservationForm from './ReservationForm';
import UpcomingReservationsList from './UpcomingReservationsList';
import './LeftSidebar.css';

const LeftSidebar = ({ upcomingReservations, addUpcomingReservation, assignReservationToTable, tables, nextReservationId }) => {
  return (
    <aside className="left-sidebar">
      <div className="sidebar-section">
        <ReservationForm addUpcomingReservation={addUpcomingReservation} nextReservationId={nextReservationId} />
      </div>
      <div className="sidebar-section">
        <UpcomingReservationsList reservations={upcomingReservations} assignReservationToTable={assignReservationToTable} tables={tables} />
      </div>
    </aside>
  );
};

export default LeftSidebar;