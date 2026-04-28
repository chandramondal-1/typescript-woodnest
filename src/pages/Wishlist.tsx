import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, ArrowRight, Trash2 } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { FadeUp } from "@/components/animations";

export default function Wishlist() {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div className="pt-20 min-h-screen bg-cream">
      <section className="bg-white border-b border-maroon-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <h1 className="font-heading text-4xl text-dark mb-2">Your Wishlist</h1>
            <p className="text-dark/60">{items.length} {items.length === 1 ? "item" : "items"} saved</p>
          </FadeUp>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {items.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="w-16 h-16 text-maroon-200 mx-auto mb-4" />
            <h2 className="font-heading text-2xl text-dark mb-2">Your wishlist is empty</h2>
            <p className="text-dark/50 mb-6">Save items you love for later.</p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 bg-maroon-900 text-white rounded-full font-premium text-sm hover:bg-maroon-800 transition-colors"
            >
              Explore Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden border border-maroon-100/50 shadow-card group"
              >
                <Link to={`/product/${product.id}`} className="block relative aspect-[4/3] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </Link>
                <div className="p-4">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-heading text-base text-dark group-hover:text-maroon-900 transition-colors line-clamp-1">{product.name}</h3>
                  </Link>
                  <p className="font-heading text-lg font-bold text-maroon-900 mt-2">₹{product.price.toLocaleString()}</p>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => addToCart(product, 1)}
                      className="flex-1 py-2.5 bg-maroon-900 text-white rounded-lg text-sm font-medium hover:bg-maroon-800 transition-colors flex items-center justify-center gap-2"
                    >
                      <ShoppingBag className="w-4 h-4" /> Add to Cart
                    </button>
                    <button
                      onClick={() => removeFromWishlist(product.id)}
                      className="w-10 h-10 flex items-center justify-center border border-maroon-200 rounded-lg hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
