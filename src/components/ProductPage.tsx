import { useState } from "react";
import { motion } from "motion/react";
import { Star, Check, Shield, Truck, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "../context/CartContext";

export default function ProductPage() {
  const [selectedPack, setSelectedPack] = useState(1);
  const { addToCart } = useCart();

  const product = {
    id: "hair-health-gummies",
    name: "Hair Health Gummies",
    subtitle: "For Stronger, Thicker Hair",
    rating: 4.8,
    reviews: 1240,
    price: 1650,
    originalPrice: 2000,
    description: "Formulated with Biotin, Zinc, and Multivitamins to nourish your hair from within.",
    benefits: [
      "Reduces hair fall",
      "Promotes hair growth",
      "Strengthens hair follicles",
      "Delicious strawberry flavor"
    ],
    images: [
      "https://picsum.photos/seed/hair-gummies/800/800",
      "https://picsum.photos/seed/hair-gummies-2/800/800"
    ]
  };

  const handleAddToCart = () => {
    addToCart({
      id: `${product.id}-${selectedPack}`,
      name: `${product.name} (${selectedPack} Month Pack)`,
      price: product.price * selectedPack,
      quantity: 1,
      image: product.images[0]
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Image Gallery */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="aspect-square rounded-3xl overflow-hidden bg-stone-100"
          >
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((img, i) => (
              <div key={i} className="aspect-square rounded-xl overflow-hidden bg-stone-100 cursor-pointer border-2 border-transparent hover:border-stone-900 transition-all">
                <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-stone-500 uppercase tracking-wider">
              Best Seller
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-stone-900">
              {product.name}
            </h1>
            <p className="text-lg text-stone-600">{product.subtitle}</p>
            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center gap-1 bg-stone-900 text-white px-2 py-1 rounded text-sm font-bold">
                {product.rating} <Star className="w-3 h-3 fill-current" />
              </div>
              <span className="text-sm text-stone-500 underline underline-offset-4 cursor-pointer">
                {product.reviews} Reviews
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-stone-900">Rs. {product.price}</span>
              <span className="text-xl text-stone-400 line-through">Rs. {product.originalPrice}</span>
              <span className="text-sm font-bold text-green-600">Save 17%</span>
            </div>
            <p className="text-stone-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-stone-900">Select Pack</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[1, 3].map((pack) => (
                <button
                  key={pack}
                  onClick={() => setSelectedPack(pack)}
                  className={`p-4 rounded-2xl border-2 text-left transition-all ${
                    selectedPack === pack
                      ? "border-stone-900 bg-stone-900 text-white"
                      : "border-stone-200 hover:border-stone-400"
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold">{pack} Month Pack</span>
                    {pack === 3 && (
                      <span className="text-[10px] bg-green-500 text-white px-2 py-0.5 rounded-full uppercase font-bold">
                        Best Value
                      </span>
                    )}
                  </div>
                  <div className="text-sm opacity-80">Rs. {product.price * pack}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <button
              onClick={handleAddToCart}
              className="w-full py-5 bg-stone-900 text-white rounded-2xl font-bold text-lg hover:bg-stone-800 transition-all flex items-center justify-center gap-2 group"
            >
              Add to Cart <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5 text-stone-600" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-stone-500">Safe & Secure</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center">
                  <Truck className="w-5 h-5 text-stone-600" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-stone-500">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center">
                  <Check className="w-5 h-5 text-stone-600" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-stone-500">Dermatologist Tested</span>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-stone-200">
            <h3 className="font-bold text-stone-900 mb-4">Key Benefits</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {product.benefits.map((benefit, i) => (
                <li key={i} className="flex items-center gap-3 text-stone-600">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-sm">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
