// src/components/keranjang/KeranjangList.tsx
import React from 'react';
import KeranjangItem from './KeranjangItem';

interface KeranjangListProps {
  items: Array<{
    id: string;
    name: string;
    quantity: number;
  }>;
  onIncrement: (itemId: string) => void;
  onDecrement: (itemId: string) => void;
  onRemove: (itemId: string) => void;
  onUpdate: (itemId: string, quantity: number) => void;
  quantities: { [key: string]: number };
  setQuantities: (itemId: string, quantity: number) => void;
}

const KeranjangList: React.FC<KeranjangListProps> = ({ items, onIncrement, onDecrement, onRemove, onUpdate, quantities, setQuantities }) => {
  return (
    <ul>
      {items.map((item) => (
        <KeranjangItem
          key={item.id}
          item={item}
          onIncrement={() => onIncrement(item.id)}
          onDecrement={() => onDecrement(item.id)}
          onRemove={() => onRemove(item.id)}
          onUpdate={(quantity) => onUpdate(item.id, quantity)}
          quantity={quantities[item.id] || item.quantity}
          setQuantity={(quantity) => setQuantities(item.id, quantity)}
        />
      ))}
    </ul>
  );
};

export default KeranjangList;
