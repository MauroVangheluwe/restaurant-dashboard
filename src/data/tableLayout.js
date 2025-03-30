export const initialTablesData = [
    { id: 1, capacity: 2, size: 'small', gridRow: '1 / 2', gridColumn: '1 / 2' },
    { id: 2, capacity: 2, size: 'small', gridRow: '1 / 2', gridColumn: '2 / 3' },
    { id: 3, capacity: 4, size: 'medium', gridRow: '1 / 2', gridColumn: '3 / 4' },
    { id: 4, capacity: 6, size: 'large', gridRow: '2 / 3', gridColumn: '1 / 3' },
    { id: 5, capacity: 4, size: 'medium', gridRow: '2 / 3', gridColumn: '3 / 4' },
    { id: 6, capacity: 2, size: 'small', gridRow: '3 / 4', gridColumn: '1 / 2' },
    { id: 7, capacity: 4, size: 'medium', gridRow: '3 / 4', gridColumn: '2 / 3' },
    { id: 8, capacity: 4, size: 'medium', gridRow: '3 / 4', gridColumn: '3 / 4' },
];

export const initializeTables = () => {
    return initialTablesData.map(tableLayout => ({
        ...tableLayout,
        guestName: '',
        numberOfGuests: 0,
        reserved: false,
        order: [],
        bill: 0,
        specialRequests: '',
        isBirthday: false,
        reservationTime: null,
    }));
};