import React, { useState } from 'react';
import OrderMenu from './OrderMenu';
import './TableCard.css';

const TableCard = ({ table, onUpdateTable, onClearTable, style, onAssignViaDrop }) => {
  const [isExpanded, setIsExpanded] = useState(!table.reserved);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (event) => {
    if (!table.reserved) {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
      setIsDragOver(true);
    } else {
      event.dataTransfer.dropEffect = 'none';
    }
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (event) => {
    if (!table.reserved) {
      event.preventDefault();
      setIsDragOver(false);
      try {
        const reservationDataString = event.dataTransfer.getData('application/json');
        if (!reservationDataString) return;

        const reservationData = JSON.parse(reservationDataString);
        if (table.capacity >= reservationData.numberOfGuests) {
          onAssignViaDrop(reservationData.id, table.id);
        } else {
          alert(`Tafel ${table.id} (Cap: ${table.capacity}) heeft niet genoeg capaciteit.`);
        }
      } catch (error) {
        alert('Fout bij toewijzen reservering.');
      }
    }
  };

  const handleRemoveItem = (itemId) => {
    const updatedOrder = table.order.filter((item) => item.id !== itemId);
    const updatedBill = updatedOrder.reduce((total, item) => total + item.price * item.quantity, 0);
    onUpdateTable(table.id, { order: updatedOrder, bill: updatedBill });
  };

  const handleUpdateOrder = (updatedOrder) => {
    const updatedBill = updatedOrder.reduce((total, item) => total + item.price * item.quantity, 0);
    onUpdateTable(table.id, { order: updatedOrder, bill: updatedBill });
  };

  const handleToggleBirthday = () => {
    onUpdateTable(table.id, { isBirthday: !table.isBirthday });
  };

  const handleClearTableRequest = () => {
    if (window.confirm(`Weet u zeker dat u tafel ${table.id} wilt afrekenen?`)) {
      onClearTable(table.id);
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const cardClasses = `table-card ${table.reserved ? (table.isBirthday ? 'status-birthday' : 'status-reserved') : 'status-available'} table-size-${table.size} ${isExpanded ? 'expanded' : 'collapsed'} ${isDragOver ? 'drag-over' : ''}`;

  return (
    <div className={cardClasses.trim()} style={style} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
      <div className="table-header">
        <div className="table-header-info">
          <h3>
            Tafel {table.id} <span className="table-capacity">({table.capacity}p)</span>
          </h3>
          {!isExpanded && table.reserved && <span className="collapsed-guest-name">{table.guestName}</span>}
        </div>
        <div className="table-header-controls">
          <span className={`status-indicator ${table.reserved ? (table.isBirthday ? 'status-birthday' : 'status-reserved') : 'status-available'}`}>
            {table.reserved ? (table.isBirthday ? 'Verjaardag!' : 'Gereserveerd') : 'Beschikbaar'}
          </span>
          {table.reserved && (
            <button onClick={toggleExpand} className="toggle-expand-btn" title={isExpanded ? 'Inklappen' : 'Uitklappen'}>
              {isExpanded ? '−' : '+'}
            </button>
          )}
        </div>
      </div>

      {isExpanded && table.reserved && (
        <>
          <div className="table-details">
            <p>
              <strong>Gast:</strong> {table.guestName || 'N/A'}
            </p>
            <p>
              <strong>Aantal:</strong> {table.numberOfGuests || 'N/A'} / {table.capacity}
            </p>
            {table.specialRequests && (
              <p>
                <strong>Verzoeken:</strong> <span className="special-requests-text">{table.specialRequests}</span>
              </p>
            )}
            {table.reservationTime && (
              <p>
                <strong>Aangekomen:</strong> {new Date(table.reservationTime).toLocaleTimeString('nl-BE', { hour: '2-digit', minute: '2-digit' })}
              </p>
            )}
          </div>

          <div className="order-section">
            <h4 className="section-title">Bestelling</h4>
            {table.order.length === 0 ? (
              <p className="no-order">Geen bestelling.</p>
            ) : (
              <ul className="order-list">
                {table.order.map((item) => (
                  <li key={item.id} className="order-item">
                    <span className="item-details">
                      {item.quantity}x {item.name}
                    </span>
                    <span className="item-price">€{(item.price * item.quantity).toFixed(2)}</span>
                    <button onClick={() => handleRemoveItem(item.id)} className="remove-item-btn" title="Verwijder">
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <OrderMenu tableId={table.id} currentOrder={table.order} onUpdateOrder={handleUpdateOrder} />
          </div>

          <div className="bill-section">
            <h4 className="section-title">Rekening</h4>
            <p className="total-bill">€{table.bill.toFixed(2)}</p>
          </div>

          <div className="table-actions">
            <button onClick={handleToggleBirthday} className={`action-btn birthday-btn ${table.isBirthday ? 'birthday-active' : ''}`} title={table.isBirthday ? 'Verwijder verjaardag' : 'Verjaardag'}>
              🎂
            </button>
            <button onClick={handleClearTableRequest} className="action-btn clear-btn" title={`Afrekenen ${table.id}`}>
              Afrekenen
            </button>
          </div>
        </>
      )}

      {!table.reserved && (
        <div className="available-container">
          <p className="available-text">Beschikbaar</p>
          <p className="available-capacity">Capaciteit: {table.capacity} personen</p>
          <span className="drop-target-indicator">(Sleep reservering)</span>
        </div>
      )}
    </div>
  );
};

export default TableCard;