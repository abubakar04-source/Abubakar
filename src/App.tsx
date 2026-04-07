import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./lib/firebase";
import { Toaster } from "sonner";
import Navbar from "./components/Navbar";
import ProductPage from "./components/ProductPage";
import AuthPage from "./components/AuthPage";
import ProfilePage from "./components/ProfilePage";
import CartPage from "./components/CartPage";
import CheckoutPage from "./components/CheckoutPage";

import Footer from "./components/Footer";

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-stone-50">
        <div className="animate-pulse text-stone-400 font-medium">Loading Bodywise...</div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-stone-200">
        <Navbar user={user} />
        <main className="pt-16 min-h-[calc(100vh-64px)]">
          <Routes>
            <Route path="/" element={<ProductPage />} />
            <Route path="/auth" element={user ? <Navigate to="/profile" /> : <AuthPage />} />
            <Route path="/profile" element={user ? <ProfilePage user={user} /> : <Navigate to="/auth" />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage user={user} />} />
          </Routes>
        </main>
        <Footer />
        <Toaster position="top-center" />
      </div>
    </Router>
  );
}
