// src/pages/keranjang/[email].tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../../layout/layout';
import KeranjangList from '../../components/keranjang/KeranjangList';
import { getCart, clearCart, incrementItem, decrementItem, removeItem, updateItem } from '../../utils/api';

const CartPage = () => {
  const router = useRouter();
  const { email } = router.query;
  const [cart, setCart] = useState<any>(null);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    if (email) {
      getCart(email as string).then((data) => {
        setCart(data);
        const initialQuantities: { [key: string]: number } = {};
        data.items.forEach((item: { id: string; quantity: number }) => {
          initialQuantities[item.id] = item.quantity;
        });
        setQuantities(initialQuantities);
      });
    }
  }, [email]);

  const handleClearCart = async () => {
    const updatedCart = await clearCart(email as string);
    setCart(updatedCart);
  };

  const handleIncrementItem = async (itemId: string) => {
    const updatedCart = await incrementItem(email as string, itemId);
    setCart(updatedCart);
  };

  const handleDecrementItem = async (itemId: string) => {
    const updatedCart = await decrementItem(email as string, itemId);
    setCart(updatedCart);
  };

  const handleRemoveItem = async (itemId: string) => {
    const updatedCart = await removeItem(email as string, itemId);
    setCart(updatedCart);
  };

  const handleUpdateItem = async (itemId: string, quantity: number) => {
    const updatedCart = await updateItem(email as string, itemId, quantity);
    setCart(updatedCart);
  };

  if (!cart) return <p>Loading...</p>;

  return (
    <Layout>
      <h1>Cart for {email}</h1>
      <KeranjangList
        items={cart.items}
        onIncrement={handleIncrementItem}
        onDecrement={handleDecrementItem}
        onRemove={handleRemoveItem}
        onUpdate={handleUpdateItem}
        quantities={quantities}
        setQuantities={(itemId, quantity) => setQuantities({ ...quantities, [itemId]: quantity })}
      />
      <button onClick={handleClearCart}>Clear Cart</button>
    </Layout>
  );
};

export default CartPage;
