import React from 'react';

interface KeranjangItemProps {
  item: {
    id: string;
    name: string;
    quantity: number;
  };
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
  onUpdate: (quantity: number) => void;
  quantity: number;
  setQuantity: (quantity: number) => void;
}

const KeranjangItem: React.FC<KeranjangItemProps> = ({ item, onIncrement, onDecrement, onRemove, onUpdate, quantity, setQuantity }) => {
  return (
    <li>
      <p>{item.name}</p>
      <p>Quantity: {item.quantity}</p>
      <button onClick={onIncrement}>Increment</button>
      <button onClick={onDecrement}>Decrement</button>
      <button onClick={onRemove}>Remove</button>
      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />
      <button onClick={() => onUpdate(quantity)}>Update Quantity</button>
    </li>
  );
};

export default KeranjangItem;
