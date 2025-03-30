import React, { useState } from 'react';
import './UpcomingReservationsList.css';

const UpcomingReservationsList = ({ reservations, assignReservationToTable, tables }) => {
  const [selectedTableId, setSelectedTableId] = useState({}); // { reservationId: tableId }

  const handleTableSelectionChange = (reservationId, tableId) => {
    setSelectedTableId(prev => ({
      ...prev,
      [reservationId]: tableId ? parseInt(tableId) : '',
    }));
  };

  const handleAssignClick = (reservation) => {
    const tableIdToAssign = selectedTableId[reservation.id];
    if (!tableIdToAssign) {
      alert('Selecteer eerst een beschikbare tafel.');
      return;
    }
    assignReservationToTable(reservation.id, tableIdToAssign);
    // Clear selection for this reservation after assignment (optional)
    // handleTableSelectionChange(reservation.id, '');
  };

  const getAvailableTablesForGuests = (numberOfGuests) => {
    // Find tables that are not reserved AND have enough or more capacity
    return tables.filter(table => !table.reserved && table.capacity >= numberOfGuests);
  };

  const formatTime = (date) => {
    if (!date) return 'N/A';
    // Ensure date is a Date object
    const dateObj = date instanceof Date ? date : new Date(date);
    if (isNaN(dateObj)) return 'Invalid Date'; // Handle invalid date strings
    return dateObj.toLocaleTimeString('nl-BE', { hour: '2-digit', minute: '2-digit' });
  };

  // --- Drag and Drop Handlers ---
  const handleDragStart = (event, reservation) => {
    // Store necessary reservation data as a JSON string
    const reservationData = JSON.stringify({
      id: reservation.id,
      numberOfGuests: reservation.numberOfGuests // Pass guest count for capacity check on drop
    });
    event.dataTransfer.setData("application/json", reservationData);
    event.dataTransfer.effectAllowed = "move";
    // Add a class to the dragged item for styling
    event.currentTarget.classList.add('dragging');
  };

  const handleDragEnd = (event) => {
    // Remove dragging class when drag ends (successfully or not)
    event.currentTarget.classList.remove('dragging');
  };
  // -----------------------------

  // Reservations are already sorted in App.js when added

  return (
    <div className="upcoming-reservations">
      <h2>Komende Reserveringen</h2>
      {reservations.length === 0 ? (
        <p>Geen komende reserveringen.</p>
      ) : (
        <ul className="reservation-list">
          {reservations.map((res) => {
            // Find available tables specifically for this reservation's guest count
            const availableTables = getAvailableTablesForGuests(res.numberOfGuests);
            return (
              <li
                key={res.id}
                className="reservation-item"
                draggable="true" // Make item draggable
                onDragStart={(e) => handleDragStart(e, res)} // Add drag start handler
                onDragEnd={handleDragEnd} // Add drag end handler
              >
                <div className="reservation-info">
                  <span className="guest-name">{res.guestName} ({res.numberOfGuests}p)</span>
                  <span className="reservation-time">Tijd: {formatTime(res.reservationTime)}</span>
                  {res.isBirthday && <span className="birthday-tag" title="Verjaardag">🎂</span>}
                  {/* Show full request on hover */}
                  {res.specialRequests && <span className="special-requests" title={res.specialRequests}>"{res.specialRequests}"</span>}
                </div>
                <div className="assign-section">
                  <select
                    value={selectedTableId[res.id] || ''}
                    onChange={(e) => handleTableSelectionChange(res.id, e.target.value)}
                    disabled={availableTables.length === 0} // Disable if no suitable tables
                    title={availableTables.length === 0 ? 'Geen geschikte tafel beschikbaar' : 'Kies een tafel'}
                  >
                    <option value="" disabled>
                      {availableTables.length === 0 ? 'Geen tafel vrij' : 'Kies tafel'}
                    </option>
                    {/* Only show tables that fit the guest count */}
                    {availableTables.map(table => (
                      <option key={table.id} value={table.id}>
                        Tafel {table.id} (Cap: {table.capacity})
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => handleAssignClick(res)}
                    disabled={!selectedTableId[res.id]} // Disable if no table selected in dropdown
                    className="assign-button"
                  >
                    Plaats Gasten
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default UpcomingReservationsList;