import { useEffect, useState } from 'react';
import { supabase, getSessionId } from '../lib/supabase';
import { CartItem } from '../types';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

interface CartPageProps {
  onNavigate: (page: string) => void;
  onCartUpdate: () => void;
}

export default function CartPage({ onNavigate, onCartUpdate }: CartPageProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    setLoading(true);
    const sessionId = getSessionId();

    const { data, error } = await supabase
      .from('cart_items')
      .select(
        `
        *,
        product:products(*)
      `
      )
      .eq('session_id', sessionId);

    if (!error && data) {
      setCartItems(data as CartItem[]);
    }
    setLoading(false);
  };

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    await supabase
      .from('cart_items')
      .update({ quantity: newQuantity, updated_at: new Date().toISOString() })
      .eq('id', itemId);

    loadCart();
    onCartUpdate();
  };

  const removeItem = async (itemId: string) => {
    await supabase.from('cart_items').delete().eq('id', itemId);
    loadCart();
    onCartUpdate();
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => {
      return sum + (item.product?.price || 0) * item.quantity;
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600">
            {cartItems.length === 0
              ? 'Your cart is empty'
              : `${cartItems.length} ${cartItems.length === 1 ? 'item' : 'items'} in your cart`}
          </p>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">
              Start shopping to add items to your cart
            </p>
            <button
              onClick={() => onNavigate('products')}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="flex items-center space-x-6">
                    <img
                      src={item.product?.image_url}
                      alt={item.product?.name}
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {item.product?.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {item.product?.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="bg-gray-100 hover:bg-gray-200 p-2 rounded-lg transition-colors"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-4 h-4 text-gray-700" />
                          </button>
                          <span className="font-semibold text-gray-900 w-12 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="bg-gray-100 hover:bg-gray-200 p-2 rounded-lg transition-colors"
                          >
                            <Plus className="w-4 h-4 text-gray-700" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">
                        ${((item.product?.price || 0) * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        ${item.product?.price.toFixed(2)} each
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (8%)</span>
                    <span className="font-semibold">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-semibold text-green-600">FREE</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4 flex justify-between text-xl font-bold text-gray-900">
                    <span>Total</span>
                    <span className="text-green-600">${total.toFixed(2)}</span>
                  </div>
                </div>
                <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-lg font-semibold text-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 mb-4">
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onNavigate('products')}
                  className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Continue Shopping
                </button>
                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800 text-center">
                    Free shipping on all orders! Plus 25-year warranty included.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
