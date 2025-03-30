import React, { useState, useMemo } from 'react';
import { getMenuItemsByCategory, findMenuItemById } from '../data/menuData';
import './OrderMenu.css';

const OrderMenu = ({ tableId, currentOrder, onUpdateOrder }) => {
  const [selectedCategory, setSelectedCategory] = useState('antipasti');
  const [selectedItemId, setSelectedItemId] = useState('');
  const [quantity, setQuantity] = useState(1);

  const menuByCategory = useMemo(() => getMenuItemsByCategory(), []);
  const categories = useMemo(() => Object.keys(menuByCategory), [menuByCategory]);
  const itemsInCategory = useMemo(() => menuByCategory[selectedCategory] || [], [menuByCategory, selectedCategory]);


  const handleAddItem = () => {
    if (!selectedItemId || quantity < 1) {
      console.warn("Geen item geselecteerd of ongeldig aantal");
      return;
    }
    const itemToAdd = findMenuItemById(selectedItemId);
    if (!itemToAdd) {
      console.error(`Item met ID ${selectedItemId} niet gevonden!`);
      return;
    }

    const existingOrderItemIndex = currentOrder.findIndex(item => item.id === selectedItemId);
    let updatedOrder;

    if (existingOrderItemIndex > -1) {
      updatedOrder = [...currentOrder];
      updatedOrder[existingOrderItemIndex] = {
        ...updatedOrder[existingOrderItemIndex],
        quantity: updatedOrder[existingOrderItemIndex].quantity + quantity,
      };
    } else {
      updatedOrder = [...currentOrder, { ...itemToAdd, quantity: quantity }];
    }

    onUpdateOrder(updatedOrder);
    setQuantity(1);
  };


  const handleItemSelectionChange = (e) => {
    setSelectedItemId(e.target.value);
  };

  return (
    <div className="order-menu">
      <div className="category-tabs">
        {categories.map(category => (
          <button
            key={category}
            className={`category-tab ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <div className="add-item-controls">
        <select
          value={selectedItemId}
          onChange={handleItemSelectionChange}
          className="item-select"
          disabled={itemsInCategory.length === 0}
        >
          {itemsInCategory.map(item => (
            <option key={item.id} value={item.id}>
              {item.name} ({item.price.toFixed(2)}€)
            </option>
          ))}
          {itemsInCategory.length === 0 && (
            <option value="" disabled>Geen items in categorie</option>
          )}
        </select>

        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value, 10) || 1)}
          className="quantity-input"
        />

        <button
          onClick={handleAddItem}
          className="add-item-button"
          disabled={!selectedItemId || quantity < 1}
        >
          + Voeg toe
        </button>
      </div>
    </div>
  );
};

export default OrderMenu;