export const menuItems = [
    { id: 'ant1', name: 'Bruschetta al Pomodoro', price: 8.50, category: 'antipasti' },
    { id: 'ant2', name: 'Caprese Salad', price: 12.00, category: 'antipasti' },
    { id: 'ant3', name: 'Prosciutto e Melone', price: 14.50, category: 'antipasti' },
    { id: 'ant4', name: 'Arancini (3 pcs)', price: 9.00, category: 'antipasti' },
    { id: 'ant5', name: 'Vitello Tonnato', price: 15.00, category: 'antipasti' },
    { id: 'pri1', name: 'Spaghetti Carbonara', price: 16.50, category: 'primi' },
    { id: 'pri2', name: 'Lasagna Bolognese', price: 17.00, category: 'primi' },
    { id: 'pri3', name: 'Risotto ai Funghi Porcini', price: 19.50, category: 'primi' },
    { id: 'pri4', name: 'Tagliatelle al Ragù', price: 16.00, category: 'primi' },
    { id: 'pri5', name: 'Penne all\'Arrabbiata', price: 14.00, category: 'primi' },
    { id: 'pri6', name: 'Gnocchi al Pesto', price: 15.50, category: 'primi' },
    { id: 'sec1', name: 'Saltimbocca alla Romana', price: 24.50, category: 'secondi' },
    { id: 'sec2', name: 'Osso Buco con Risotto alla Milanese', price: 28.00, category: 'secondi' },
    { id: 'sec3', name: 'Grilled Sea Bream (Orata)', price: 26.50, category: 'secondi' },
    { id: 'sec4', name: 'Tagliata di Manzo (Sliced Steak)', price: 29.00, category: 'secondi' },
    { id: 'sec5', name: 'Pollo alla Cacciatora', price: 21.00, category: 'secondi' },
    { id: 'piz1', name: 'Pizza Margherita', price: 13.00, category: 'pizza' },
    { id: 'piz2', name: 'Pizza Diavola (Spicy Salami)', price: 15.50, category: 'pizza' },
    { id: 'piz3', name: 'Pizza Quattro Formaggi', price: 16.00, category: 'pizza' },
    { id: 'piz4', name: 'Pizza Prosciutto e Funghi', price: 15.00, category: 'pizza' },
    { id: 'piz5', name: 'Pizza Vegetariana', price: 14.50, category: 'pizza' },
    { id: 'con1', name: 'Patate al Forno (Roasted Potatoes)', price: 5.50, category: 'contorni' },
    { id: 'con2', name: 'Insalata Mista (Mixed Salad)', price: 6.00, category: 'contorni' },
    { id: 'con3', name: 'Spinaci Saltati (Sautéed Spinach)', price: 6.50, category: 'contorni' },
    { id: 'dol1', name: 'Tiramisù', price: 9.00, category: 'dolci' },
    { id: 'dol2', name: 'Panna Cotta', price: 8.50, category: 'dolci' },
    { id: 'dol3', name: 'Cannoli Siciliani (2 pcs)', price: 7.50, category: 'dolci' },
    { id: 'dol4', name: 'Affogato al Caffè', price: 6.50, category: 'dolci' },
    { id: 'bev1', name: 'Acqua Panna (Still Water) 75cl', price: 5.00, category: 'bevande' },
    { id: 'bev2', name: 'San Pellegrino (Sparkling Water) 75cl', price: 5.00, category: 'bevande' },
    { id: 'bev3', name: 'Coca-Cola / Zero', price: 3.50, category: 'bevande' },
    { id: 'bev4', name: 'Espresso', price: 3.00, category: 'bevande' },
    { id: 'bev5', name: 'Cappuccino', price: 4.00, category: 'bevande' },
    { id: 'bev6', name: 'Vino della Casa Rosso (Glass)', price: 6.00, category: 'bevande' },
    { id: 'bev7', name: 'Vino della Casa Bianco (Glass)', price: 6.00, category: 'bevande' },
    { id: 'bev8', name: 'Prosecco (Glass)', price: 7.50, category: 'bevande' },
    { id: 'bev9', name: 'Aperol Spritz', price: 9.00, category: 'bevande' },
    { id: 'bev10', name: 'Limoncello', price: 5.50, category: 'bevande' },
    { id: 'bev11', name: 'Peroni Beer', price: 5.00, category: 'bevande' },
];

export const findMenuItemById = (id) => menuItems.find(item => item.id === id);

export const getMenuItemsByCategory = () => {
    const categoryOrder = ['antipasti', 'primi', 'secondi', 'pizza', 'contorni', 'dolci', 'bevande'];

    const grouped = menuItems.reduce((acc, item) => {
        const category = item.category || 'other';
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(item);
        return acc;
    }, {});

    const sortedGrouped = {};
    categoryOrder.forEach(category => {
        if (grouped[category]) {
            sortedGrouped[category] = grouped[category];
        }
    });

    Object.keys(grouped).forEach(category => {
        if (!sortedGrouped[category]) {
            sortedGrouped[category] = grouped[category];
        }
    });

    return sortedGrouped;
};