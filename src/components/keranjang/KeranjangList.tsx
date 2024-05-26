import React from 'react';

interface KeranjangListProps {
  cart: any;
  onClearCart: () => void;
  onIncrementItem: (itemId: string) => void;
  onDecrementItem: (itemId: string) => void;
  onRemoveItem: (itemId: string) => void;
  onUpdateItem: (itemId: string, quantity: number) => void;
}

const KeranjangList: React.FC<KeranjangListProps> = ({
  cart,
  onClearCart,
  onIncrementItem,
  onDecrementItem,
  onRemoveItem,
  onUpdateItem
}) => {
  return (
    <div>
      <ul>
        {Object.keys(cart.items).map((itemId) => (
          <li key={itemId}>
            <span>{itemId}: {cart.items[itemId]}</span>
            <button onClick={() => onIncrementItem(itemId)}>+</button>
            <button onClick={() => onDecrementItem(itemId)}>-</button>
            <button onClick={() => onRemoveItem(itemId)}>Remove</button>
            <input
              type="number"
              value={cart.items[itemId]}
              onChange={(e) => onUpdateItem(itemId, parseInt(e.target.value))}
            />
          </li>
        ))}
      </ul>
      <button onClick={onClearCart}>Clear Cart</button>
      <p>Total Price: {cart.totalPrice}</p>
    </div>
  );
};

export default KeranjangList;
