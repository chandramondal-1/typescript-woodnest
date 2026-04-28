import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Link } from "react-router-dom";

export function CartDrawer() {
  const { items, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, totalPrice } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-cream shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-maroon-100">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-maroon-900" />
                <h2 className="font-heading text-xl text-dark">Your Cart</h2>
                <span className="px-2 py-1 bg-maroon-100 text-maroon-900 text-xs rounded-full font-medium">
                  {items.length} items
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-maroon-50 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-dark" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-16 h-16 text-maroon-200 mb-4" />
                  <h3 className="font-heading text-lg text-dark mb-2">Your cart is empty</h3>
                  <p className="text-sm text-dark/60 mb-6">Looks like you haven't added anything yet.</p>
                  <Link
                    to="/shop"
                    onClick={() => setIsCartOpen(false)}
                    className="px-6 py-3 bg-maroon-900 text-white rounded-full font-premium text-sm hover:bg-maroon-800 transition-colors"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="flex gap-4 p-4 bg-white rounded-xl border border-maroon-100"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-dark text-sm truncate">{item.product.name}</h4>
                        <p className="text-xs text-dark/50 mt-0.5">{item.selectedColor || item.product.colors[0]}</p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center rounded-full border border-maroon-200 hover:bg-maroon-50 transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center font-medium text-sm">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center rounded-full border border-maroon-200 hover:bg-maroon-50 transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="font-semibold text-maroon-900 text-sm">
                            ₹{(item.product.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="self-start p-1.5 hover:bg-red-50 text-dark/40 hover:text-red-500 rounded-full transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-maroon-100 bg-white">
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-dark/60">Subtotal</span>
                    <span className="font-medium">₹{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-dark/60">Delivery</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-dark/60">GST (18%)</span>
                    <span className="font-medium">₹{Math.round(totalPrice * 0.18).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-heading text-lg pt-2 border-t border-maroon-100">
                    <span>Total</span>
                    <span className="text-maroon-900">₹{Math.round(totalPrice * 1.18).toLocaleString()}</span>
                  </div>
                </div>
                <Link
                  to="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-4 bg-maroon-900 text-white rounded-xl font-premium font-semibold flex items-center justify-center gap-2 hover:bg-maroon-800 transition-colors btn-shine"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-full mt-3 py-3 border border-maroon-200 text-dark rounded-xl font-premium text-sm hover:bg-maroon-50 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
