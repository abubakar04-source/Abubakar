import { useState } from "react";
import { User } from "firebase/auth";
import { useCart } from "../context/CartContext";
import { motion } from "motion/react";
import { Shield, Lock, CreditCard, Truck, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { db, handleFirestoreError, OperationType } from "../lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

interface CheckoutPageProps {
  user: User | null;
}

export default function CheckoutPage({ user }: CheckoutPageProps) {
  const { items, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "cod">("card");
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    if (!user) {
      toast.error("Please login to place an order");
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        userId: user.uid,
        items: items.map(i => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity })),
        total,
        paymentMethod,
        status: "pending",
        createdAt: new Date().toISOString(),
      };

      await addDoc(collection(db, "orders"), orderData);
      clearCart();
      setStep(3);
      toast.success("Order placed successfully!");
    } catch (error: any) {
      handleFirestoreError(error, OperationType.CREATE, "orders");
    } finally {
      setLoading(false);
    }
  };

  if (step === 3) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center p-8 text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8"
        >
          <CheckCircle2 className="w-12 h-12 text-green-600" />
        </motion.div>
        <h2 className="text-4xl font-bold text-stone-900 mb-4">Order Confirmed!</h2>
        <p className="text-stone-500 mb-8 max-w-md">
          Thank you for your purchase. We've received your order and will notify you once it's shipped.
        </p>
        <button
          onClick={() => navigate("/profile")}
          className="px-12 py-4 bg-stone-900 text-white rounded-2xl font-bold hover:bg-stone-800 transition-all"
        >
          View Order History
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Checkout Form */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center gap-4 mb-8">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 1 ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-400"}`}>1</div>
            <div className="h-px flex-1 bg-stone-200"></div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 2 ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-400"}`}>2</div>
          </div>

          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl p-8 border border-stone-100 shadow-sm space-y-8"
            >
              <h2 className="text-2xl font-bold text-stone-900 flex items-center gap-3">
                <Truck className="w-6 h-6" /> Shipping Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-stone-700">Full Name</label>
                  <input type="text" className="w-full px-4 py-4 bg-stone-50 border border-stone-200 rounded-2xl" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-stone-700">Phone Number</label>
                  <input type="tel" className="w-full px-4 py-4 bg-stone-50 border border-stone-200 rounded-2xl" placeholder="+92 300 1234567" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-bold text-stone-700">Street Address</label>
                  <input type="text" className="w-full px-4 py-4 bg-stone-50 border border-stone-200 rounded-2xl" placeholder="123 Main St, Apartment 4B" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-stone-700">City</label>
                  <input type="text" className="w-full px-4 py-4 bg-stone-50 border border-stone-200 rounded-2xl" placeholder="Karachi" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-stone-700">Postal Code</label>
                  <input type="text" className="w-full px-4 py-4 bg-stone-50 border border-stone-200 rounded-2xl" placeholder="75500" />
                </div>
              </div>
              <button
                onClick={() => setStep(2)}
                className="w-full py-5 bg-stone-900 text-white rounded-2xl font-bold text-lg hover:bg-stone-800 transition-all"
              >
                Continue to Payment
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl p-8 border border-stone-100 shadow-sm space-y-8"
            >
              <h2 className="text-2xl font-bold text-stone-900 flex items-center gap-3">
                <CreditCard className="w-6 h-6" /> Payment Method
              </h2>
              
              <div className="space-y-4">
                <button
                  onClick={() => setPaymentMethod("card")}
                  className={`w-full p-6 rounded-2xl border-2 flex items-center justify-between transition-all ${
                    paymentMethod === "card" ? "border-stone-900 bg-stone-50" : "border-stone-100 hover:border-stone-200"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                      <CreditCard className="w-6 h-6 text-stone-900" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-stone-900">Credit / Debit Card</div>
                      <div className="text-sm text-stone-500">Pay securely via Stripe</div>
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === "card" ? "border-stone-900" : "border-stone-200"
                  }`}>
                    {paymentMethod === "card" && <div className="w-2.5 h-2.5 bg-stone-900 rounded-full"></div>}
                  </div>
                </button>

                <button
                  onClick={() => setPaymentMethod("cod")}
                  className={`w-full p-6 rounded-2xl border-2 flex items-center justify-between transition-all ${
                    paymentMethod === "cod" ? "border-stone-900 bg-stone-50" : "border-stone-100 hover:border-stone-200"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                      <Truck className="w-6 h-6 text-stone-900" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-stone-900">Cash on Delivery</div>
                      <div className="text-sm text-stone-500">Pay when you receive your order</div>
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === "cod" ? "border-stone-900" : "border-stone-200"
                  }`}>
                    {paymentMethod === "cod" && <div className="w-2.5 h-2.5 bg-stone-900 rounded-full"></div>}
                  </div>
                </button>
              </div>

              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-3 text-sm text-stone-500">
                  <Lock className="w-4 h-4" /> {paymentMethod === "card" ? "Your payment information is encrypted and secure." : "Pay the exact amount at the time of delivery."}
                </div>
                <button
                  onClick={handlePlaceOrder}
                  disabled={loading}
                  className="w-full py-5 bg-stone-900 text-white rounded-2xl font-bold text-lg hover:bg-stone-800 transition-all disabled:opacity-50"
                >
                  {loading ? "Processing..." : paymentMethod === "card" ? `Pay Rs. ${total}` : "Place Order"}
                </button>
                <button
                  onClick={() => setStep(1)}
                  className="w-full py-3 text-stone-500 font-bold hover:text-stone-900 transition-colors"
                >
                  Back to Shipping
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl p-8 border border-stone-100 shadow-sm sticky top-24">
            <h2 className="text-2xl font-bold text-stone-900 mb-8">Your Order</h2>
            <div className="space-y-6 mb-8">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-16 h-16 bg-stone-50 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-stone-900 text-sm">{item.name}</div>
                    <div className="text-xs text-stone-500">Qty: {item.quantity}</div>
                    <div className="text-sm font-bold text-stone-900 mt-1">Rs. {item.price * item.quantity}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-4 pt-6 border-t border-stone-100">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span>Rs. {total}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Shipping</span>
                <span className="text-green-600 font-bold uppercase text-xs">Free</span>
              </div>
              <div className="pt-4 border-t border-stone-100 flex justify-between text-xl font-bold text-stone-900">
                <span>Total</span>
                <span>Rs. {total}</span>
              </div>
            </div>
            <div className="mt-8 p-4 bg-stone-50 rounded-2xl flex items-center gap-3">
              <Shield className="w-5 h-5 text-stone-600" />
              <span className="text-xs text-stone-600 font-medium">100% Secure Transaction</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
