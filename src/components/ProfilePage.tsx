import React, { useState, useEffect } from "react";
import { User } from "firebase/auth";
import { db } from "../lib/firebase";
import { doc, getDoc, updateDoc, collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { handleFirestoreError, OperationType } from "../lib/firebase";
import { motion } from "motion/react";
import { User as UserIcon, MapPin, CreditCard, Package, Settings, ChevronRight } from "lucide-react";
import { toast } from "sonner";

interface ProfilePageProps {
  user: User;
}

export default function ProfilePage({ user }: ProfilePageProps) {
  const [profile, setProfile] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data());
        }

        const ordersQuery = query(
          collection(db, "orders"),
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc")
        );
        const ordersSnap = await getDocs(ordersQuery);
        setOrders(ordersSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        handleFirestoreError(error, OperationType.GET, "users/orders");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const handleUpdateAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    // Implementation for updating address
    toast.success("Address updated");
  };

  if (loading) return <div className="p-8 text-center">Loading profile...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar */}
        <div className="w-full lg:w-64 space-y-2">
          <button
            onClick={() => setActiveTab("profile")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
              activeTab === "profile" ? "bg-stone-900 text-white" : "hover:bg-stone-100 text-stone-600"
            }`}
          >
            <UserIcon className="w-5 h-5" /> Profile
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
              activeTab === "orders" ? "bg-stone-900 text-white" : "hover:bg-stone-100 text-stone-600"
            }`}
          >
            <Package className="w-5 h-5" /> Orders
          </button>
          <button
            onClick={() => setActiveTab("address")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
              activeTab === "address" ? "bg-stone-900 text-white" : "hover:bg-stone-100 text-stone-600"
            }`}
          >
            <MapPin className="w-5 h-5" /> Shipping
          </button>
          <button
            onClick={() => setActiveTab("payment")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
              activeTab === "payment" ? "bg-stone-900 text-white" : "hover:bg-stone-100 text-stone-600"
            }`}
          >
            <CreditCard className="w-5 h-5" /> Payments
          </button>
        </div>

        {/* Content */}
        <div className="flex-1">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl p-8 border border-stone-100 shadow-sm"
          >
            {activeTab === "profile" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-stone-900">Personal Information</h2>
                  <p className="text-stone-500">Manage your account details</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-stone-700">Full Name</label>
                    <input
                      type="text"
                      readOnly
                      value={profile?.name || ""}
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-stone-700">Email Address</label>
                    <input
                      type="email"
                      readOnly
                      value={profile?.email || ""}
                      className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-stone-900">Order History</h2>
                  <p className="text-stone-500">Track and manage your orders</p>
                </div>
                {orders.length === 0 ? (
                  <div className="text-center py-12 bg-stone-50 rounded-2xl">
                    <Package className="w-12 h-12 text-stone-300 mx-auto mb-4" />
                    <p className="text-stone-500">No orders found</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="p-6 border border-stone-100 rounded-2xl hover:bg-stone-50 transition-colors">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <div className="text-sm text-stone-500">Order #{order.id.slice(-8)}</div>
                            <div className="font-bold text-stone-900">Rs. {order.total}</div>
                          </div>
                          <span className="px-3 py-1 bg-stone-900 text-white text-[10px] font-bold uppercase rounded-full">
                            {order.status}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm text-stone-500">
                          <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                          <button className="flex items-center gap-1 font-bold text-stone-900">
                            Details <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "address" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-stone-900">Shipping Address</h2>
                  <p className="text-stone-500">Where should we send your products?</p>
                </div>
                <form onSubmit={handleUpdateAddress} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-stone-700">Street Address</label>
                      <input
                        type="text"
                        placeholder="123 Main St"
                        className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-stone-900/10"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-stone-700">City</label>
                      <input
                        type="text"
                        placeholder="Karachi"
                        className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-stone-900/10"
                      />
                    </div>
                  </div>
                  <button className="px-8 py-3 bg-stone-900 text-white rounded-xl font-bold hover:bg-stone-800 transition-all">
                    Save Address
                  </button>
                </form>
              </div>
            )}

            {activeTab === "payment" && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-stone-900">Payment Methods</h2>
                  <p className="text-stone-500">Manage your saved cards</p>
                </div>
                <div className="p-12 text-center bg-stone-50 rounded-2xl border-2 border-dashed border-stone-200">
                  <CreditCard className="w-12 h-12 text-stone-300 mx-auto mb-4" />
                  <p className="text-stone-500 mb-6">No payment methods saved</p>
                  <button className="px-8 py-3 border-2 border-stone-900 text-stone-900 rounded-xl font-bold hover:bg-stone-900 hover:text-white transition-all">
                    Add New Card
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
