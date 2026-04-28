import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Star, Eye } from "lucide-react";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      className="group relative"
    >
      <div className="relative bg-white rounded-2xl overflow-hidden border border-maroon-100/50 shadow-card hover:shadow-card-hover transition-all duration-500 card-lift">
        {/* Image */}
        <Link to={`/product/${product.id}`} className="block relative aspect-[4/3] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-maroon-900/0 group-hover:bg-maroon-900/10 transition-colors duration-500" />
          
          {/* Quick Actions */}
          <div className="absolute inset-x-4 bottom-4 flex gap-2 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            <button
              onClick={(e) => {
                e.preventDefault();
                addToCart(product, 1);
              }}
              className="flex-1 py-2.5 bg-white text-maroon-900 rounded-lg font-premium text-sm font-medium shadow-lg hover:bg-maroon-900 hover:text-white transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              Add to Cart
            </button>
            <Link
              to={`/product/${product.id}`}
              onClick={(e) => e.stopPropagation()}
              className="w-10 h-10 bg-white text-maroon-900 rounded-lg shadow-lg hover:bg-maroon-900 hover:text-white transition-colors flex items-center justify-center"
            >
              <Eye className="w-4 h-4" />
            </Link>
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.badge && (
              <span className="px-3 py-1 bg-gold text-dark text-xs font-semibold rounded-full">
                {product.badge}
              </span>
            )}
            {product.isNew && (
              <span className="px-3 py-1 bg-maroon-900 text-white text-xs font-semibold rounded-full">
                New
              </span>
            )}
          </div>

          {/* Wishlist */}
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product);
            }}
            className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
          >
            <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? "fill-maroon-900 text-maroon-900" : "text-dark/60"}`} />
          </button>
        </Link>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-center gap-1 mb-1.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? "fill-gold text-gold" : "text-maroon-200"}`}
              />
            ))}
            <span className="text-xs text-dark/50 ml-1">({product.reviews})</span>
          </div>

          <Link to={`/product/${product.id}`}>
            <h3 className="font-heading text-base text-dark group-hover:text-maroon-900 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-dark/50 mt-0.5">{product.material}</p>

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-baseline gap-2">
              <span className="font-heading text-lg font-bold text-maroon-900">
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-dark/40 line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            <span className={`text-xs px-2 py-1 rounded-full ${product.stock < 5 ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"}`}>
              {product.stock < 5 ? `Only ${product.stock} left` : "In Stock"}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
