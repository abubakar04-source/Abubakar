export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400 py-12 px-4 md:px-8 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-4">
          <h3 className="text-white font-bold text-xl tracking-tight">BODYWISE</h3>
          <p className="text-sm leading-relaxed">
            Premium health and wellness solutions for the modern individual. Science-backed, dermatologist-tested, and results-driven.
          </p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Shop</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Hair Care</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Skin Care</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Weight Management</a></li>
            <li><a href="#" className="hover:text-white transition-colors">General Health</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Support</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Track Order</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Shipping Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Returns & Refunds</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">Newsletter</h4>
          <p className="text-sm mb-4">Subscribe for health tips and exclusive offers.</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Email"
              className="bg-stone-800 border-none rounded-lg px-4 py-2 text-sm flex-1 focus:ring-1 focus:ring-stone-700"
            />
            <button className="bg-white text-stone-900 px-4 py-2 rounded-lg text-sm font-bold">Join</button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-12 mt-12 border-t border-stone-800 flex flex-col md:row justify-between items-center gap-4 text-xs">
        <p>© 2026 Bodywise. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
