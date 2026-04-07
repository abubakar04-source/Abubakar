import { Link } from "react-router-dom";
import { User } from "firebase/auth";
import { ShoppingBag, User as UserIcon, LogOut } from "lucide-react";
import { auth } from "../lib/firebase";
import { signOut } from "firebase/auth";
import { toast } from "sonner";

import { useCart } from "../context/CartContext";

interface NavbarProps {
  user: User | null;
}

export default function Navbar({ user }: NavbarProps) {
  const { items } = useCart();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Failed to log out");
    }
  };

  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-stone-200 z-50 px-4 md:px-8">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
        <Link to="/" className="text-xl font-bold tracking-tight text-stone-900">
          BODYWISE
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/cart" className="relative p-2 hover:bg-stone-100 rounded-full transition-colors">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-stone-900 text-white text-[10px] flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/profile" className="p-2 hover:bg-stone-100 rounded-full transition-colors">
                <UserIcon className="w-5 h-5" />
              </Link>
              <button
                onClick={handleLogout}
                className="p-2 hover:bg-stone-100 rounded-full transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <Link
              to="/auth"
              className="text-sm font-medium hover:text-stone-600 transition-colors"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
