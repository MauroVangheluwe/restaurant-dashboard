import React, { useState } from 'react';
import './ReservationForm.css';

const ReservationForm = ({ addUpcomingReservation, nextReservationId }) => {
  const [guestName, setGuestName] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [reservationTimeInput, setReservationTimeInput] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [isBirthday, setIsBirthday] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!guestName.trim()) return setError('Vul de naam in.');
    if (numberOfGuests < 1) return setError('Minimaal 1 gast.');
    if (!reservationTimeInput) return setError('Vul de tijd in.');

    const [hours, minutes] = reservationTimeInput.split(':').map(Number);
    const reservationDateTime = new Date();
    if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
      return setError('Ongeldige tijd.');
    }
    reservationDateTime.setHours(hours, minutes, 0, 0);

    addUpcomingReservation({
      id: nextReservationId,
      guestName,
      numberOfGuests,
      reservationTime: reservationDateTime,
      specialRequests,
      isBirthday,
      status: 'upcoming',
    });

    setGuestName('');
    setNumberOfGuests(1);
    setReservationTimeInput('');
    setSpecialRequests('');
    setIsBirthday(false);
  };

  return (
    <form onSubmit={handleSubmit} className="reservation-form">
      <h2 className="form-title">Nieuwe Reservering</h2>
      {error && <p className="error-message">{error}</p>}

      <div className="form-group">
        <label htmlFor="guestName">Naam:</label>
        <input id="guestName" type="text" value={guestName} onChange={(e) => setGuestName(e.target.value)} required className="form-input" />
      </div>

      <div className="form-row">
        <div className="form-group form-group-half">
          <label htmlFor="numberOfGuests">Gasten:</label>
          <input id="numberOfGuests" type="number" min="1" value={numberOfGuests} onChange={(e) => setNumberOfGuests(parseInt(e.target.value, 10))} required className="form-input" />
        </div>

        <div className="form-group form-group-half">
          <label htmlFor="reservationTime">Tijd:</label>
          <input id="reservationTime" type="time" value={reservationTimeInput} onChange={(e) => setReservationTimeInput(e.target.value)} required className="form-input" />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="specialRequests">Verzoeken:</label>
        <textarea id="specialRequests" value={specialRequests} onChange={(e) => setSpecialRequests(e.target.value)} rows="2" className="form-textarea" />
      </div>

      <div className="form-group form-group-checkbox">
        <input id="isBirthday" type="checkbox" checked={isBirthday} onChange={(e) => setIsBirthday(e.target.checked)} className="form-checkbox" />
        <label htmlFor="isBirthday">Verjaardag?</label>
      </div>

      <button type="submit" className="submit-button">Voeg Toe</button>
    </form>
  );
};

export default ReservationForm;