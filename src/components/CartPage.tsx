import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center p-8 text-center">
        <div className="w-24 h-24 bg-stone-100 rounded-full flex items-center justify-center mb-8">
          <ShoppingBag className="w-10 h-10 text-stone-400" />
        </div>
        <h2 className="text-3xl font-bold text-stone-900 mb-4">Your cart is empty</h2>
        <p className="text-stone-500 mb-8 max-w-md">
          Looks like you haven't added anything to your cart yet. Explore our products and find something you love!
        </p>
        <Link
          to="/"
          className="px-12 py-4 bg-stone-900 text-white rounded-2xl font-bold hover:bg-stone-800 transition-all"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <h1 className="text-4xl font-bold text-stone-900 mb-12">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <motion.div
              layout
              key={item.id}
              className="flex gap-6 p-6 bg-white rounded-3xl border border-stone-100 shadow-sm"
            >
              <div className="w-24 h-24 md:w-32 md:h-32 bg-stone-50 rounded-2xl overflow-hidden flex-shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="flex-1 flex flex-col justify-between py-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-stone-900">{item.name}</h3>
                    <p className="text-sm text-stone-500">Rs. {item.price}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-stone-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center gap-4 bg-stone-50 rounded-xl px-2 py-1">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 hover:bg-white rounded-lg transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-bold w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 hover:bg-white rounded-lg transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-lg font-bold text-stone-900">Rs. {item.price * item.quantity}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl p-8 border border-stone-100 shadow-sm sticky top-24">
            <h2 className="text-2xl font-bold text-stone-900 mb-8">Order Summary</h2>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span>Rs. {total}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Shipping</span>
                <span className="text-green-600 font-bold uppercase text-sm">Free</span>
              </div>
              <div className="pt-4 border-t border-stone-100 flex justify-between text-xl font-bold text-stone-900">
                <span>Total</span>
                <span>Rs. {total}</span>
              </div>
            </div>
            <Link
              to="/checkout"
              className="w-full py-5 bg-stone-900 text-white rounded-2xl font-bold text-lg hover:bg-stone-800 transition-all flex items-center justify-center gap-2 group"
            >
              Checkout <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <p className="text-center text-xs text-stone-400 mt-6 uppercase tracking-widest font-bold">
              Secure Checkout Powered by Stripe
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
