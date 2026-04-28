import { useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Truck, Shield, RotateCcw, Star, Minus, Plus, ShoppingBag, Zap, MapPin, Check, X, ChevronLeft, ChevronRight, CreditCard, BadgeCheck, HelpCircle } from "lucide-react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { FadeUp } from "@/components/animations";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [show360, setShow360] = useState(false);
  const [pincode, setPincode] = useState("");
  const [pincodeStatus, setPincodeStatus] = useState<"idle" | "checking" | "available" | "unavailable">("idle");
  const [emiMonths, setEmiMonths] = useState(6);
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isZooming, setIsZooming] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  if (!product) {
    return (
      <div className="pt-32 text-center">
        <h2 className="font-heading text-2xl text-dark">Product not found</h2>
        <Link to="/shop" className="text-maroon-900 mt-4 inline-block">Back to Shop</Link>
      </div>
    );
  }

  const similarProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handlePincodeCheck = () => {
    if (pincode.length !== 6) return;
    setPincodeStatus("checking");
    setTimeout(() => {
      setPincodeStatus(Math.random() > 0.3 ? "available" : "unavailable");
    }, 800);
  };

  const emiAmount = Math.round((product.price / emiMonths) * 1.12);
  const discount = couponApplied ? Math.round(product.price * 0.1) : 0;
  const finalPrice = product.price - discount;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  return (
    <div className="pt-20 min-h-screen bg-cream">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-maroon-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-dark/50">
            <Link to="/" className="hover:text-maroon-900 transition-colors">Home</Link>
            <ChevronLeft className="w-3 h-3 rotate-180" />
            <Link to="/shop" className="hover:text-maroon-900 transition-colors">Shop</Link>
            <ChevronLeft className="w-3 h-3 rotate-180" />
            <span className="text-dark">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <FadeUp>
            <div className="space-y-4">
              {/* Main Image */}
              <div
                ref={imageRef}
                className="relative bg-white rounded-2xl overflow-hidden border border-maroon-100/50 aspect-[4/3] cursor-crosshair"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsZooming(true)}
                onMouseLeave={() => setIsZooming(false)}
              >
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Zoom Lens */}
                {isZooming && (
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      backgroundImage: `url(${product.images[selectedImage]})`,
                      backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                      backgroundSize: "200%",
                      backgroundRepeat: "no-repeat",
                    }}
                  />
                )}

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.badge && (
                    <span className="px-3 py-1 bg-gold text-dark text-xs font-bold rounded-full">{product.badge}</span>
                  )}
                  {product.isNew && (
                    <span className="px-3 py-1 bg-maroon-900 text-white text-xs font-bold rounded-full">NEW</span>
                  )}
                </div>

                {/* 360 Button */}
                <button
                  onClick={() => setShow360(true)}
                  className="absolute bottom-4 right-4 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium shadow-lg hover:bg-white transition-colors flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" /> 360° View
                </button>

                {/* Image Arrows */}
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setSelectedImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === i ? "border-maroon-900 ring-2 ring-maroon-900/20" : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </FadeUp>

          {/* Product Info */}
          <FadeUp delay={0.2}>
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 bg-maroon-100 text-maroon-900 text-xs font-medium rounded-full">{product.category}</span>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-gold text-gold" : "text-maroon-200"}`} />
                  ))}
                  <span className="text-sm text-dark/50 ml-1">{product.rating} ({product.reviews} reviews)</span>
                </div>
              </div>

              <h1 className="font-heading text-3xl lg:text-4xl text-dark mb-4">{product.name}</h1>
              <p className="text-dark/60 leading-relaxed mb-6">{product.description}</p>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="font-heading text-3xl font-bold text-maroon-900">₹{finalPrice.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-lg text-dark/40 line-through">₹{product.originalPrice.toLocaleString()}</span>
                )}
                {discount > 0 && (
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">You save ₹{discount.toLocaleString()}</span>
                )}
              </div>

              {/* Stock Alert */}
              {product.stock < 5 && (
                <div className="flex items-center gap-2 text-red-600 text-sm mb-6 bg-red-50 p-3 rounded-xl">
                  <Zap className="w-4 h-4" />
                  Only {product.stock} left in stock — Order soon!
                </div>
              )}

              {/* Color Selection */}
              <div className="mb-6">
                <label className="text-sm font-medium text-dark mb-3 block">Color: <span className="text-dark/50">{product.colors[selectedColor]}</span></label>
                <div className="flex gap-3">
                  {product.colors.map((color, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedColor(i)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        selectedColor === i ? "border-maroon-900 ring-2 ring-maroon-900/20" : "border-maroon-200"
                      }`}
                      style={{
                        background: color.toLowerCase().includes("maroon") || color.toLowerCase().includes("red") || color.toLowerCase().includes("burgundy")
                          ? "#6E0D25"
                          : color.toLowerCase().includes("brown") || color.toLowerCase().includes("coffee") || color.toLowerCase().includes("walnut") || color.toLowerCase().includes("wood")
                          ? "#8B6914"
                          : color.toLowerCase().includes("black") || color.toLowerCase().includes("charcoal")
                          ? "#1E1E1E"
                          : color.toLowerCase().includes("beige") || color.toLowerCase().includes("cream") || color.toLowerCase().includes("white") || color.toLowerCase().includes("ivory")
                          ? "#FAF8F6"
                          : color.toLowerCase().includes("blue") || color.toLowerCase().includes("navy")
                          ? "#1e3a5f"
                          : color.toLowerCase().includes("green")
                          ? "#2d5016"
                          : "#D4AF37",
                      }}
                      title={color}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-6">
                <label className="text-sm font-medium text-dark mb-3 block">Size</label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedSize(i)}
                      className={`px-4 py-2 rounded-lg text-sm border transition-all ${
                        selectedSize === i
                          ? "bg-maroon-900 text-white border-maroon-900"
                          : "bg-white text-dark border-maroon-200 hover:border-maroon-400"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex items-center border border-maroon-200 rounded-xl bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 hover:bg-maroon-50 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-4 py-3 hover:bg-maroon-50 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => addToCart(product, quantity, product.colors[selectedColor], product.sizes[selectedSize])}
                  className="flex-1 py-4 bg-maroon-900 text-white rounded-xl font-premium font-semibold flex items-center justify-center gap-2 hover:bg-maroon-800 transition-colors btn-shine"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Add to Cart
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  className="flex-1 py-4 bg-gold text-dark rounded-xl font-premium font-semibold flex items-center justify-center gap-2 hover:bg-gold-light transition-colors"
                >
                  <Zap className="w-5 h-5" />
                  Buy Now
                </motion.button>

                <button
                  onClick={() => toggleWishlist(product)}
                  className={`px-5 py-4 rounded-xl border transition-colors ${
                    isInWishlist(product.id)
                      ? "bg-red-50 border-red-200 text-red-500"
                      : "bg-white border-maroon-200 text-dark hover:bg-maroon-50"
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? "fill-current" : ""}`} />
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                {[
                  { icon: Truck, label: "Free Delivery" },
                  { icon: Shield, label: "5 Year Warranty" },
                  { icon: RotateCcw, label: "30 Day Returns" },
                  { icon: BadgeCheck, label: "Genuine Product" },
                ].map((badge, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white p-3 rounded-xl border border-maroon-100/50">
                    <badge.icon className="w-4 h-4 text-maroon-900 shrink-0" />
                    <span className="text-xs text-dark/70">{badge.label}</span>
                  </div>
                ))}
              </div>

              {/* Pincode Check */}
              <div className="bg-white p-5 rounded-xl border border-maroon-100/50 mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-4 h-4 text-maroon-900" />
                  <span className="text-sm font-medium text-dark">Check Delivery Availability</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    className="flex-1 px-4 py-2.5 border border-maroon-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-maroon-900/20"
                  />
                  <button
                    onClick={handlePincodeCheck}
                    disabled={pincode.length !== 6 || pincodeStatus === "checking"}
                    className="px-5 py-2.5 bg-maroon-900 text-white rounded-lg text-sm font-medium hover:bg-maroon-800 transition-colors disabled:opacity-50"
                  >
                    {pincodeStatus === "checking" ? "Checking..." : "Check"}
                  </button>
                </div>
                {pincodeStatus === "available" && (
                  <p className="text-sm text-green-600 mt-2 flex items-center gap-1"><Check className="w-3 h-3" /> Delivery available! Estimated 3-5 days.</p>
                )}
                {pincodeStatus === "unavailable" && (
                  <p className="text-sm text-red-600 mt-2">Sorry, delivery not available to this pincode.</p>
                )}
              </div>

              {/* EMI Calculator */}
              <div className="bg-white p-5 rounded-xl border border-maroon-100/50 mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <CreditCard className="w-4 h-4 text-maroon-900" />
                  <span className="text-sm font-medium text-dark">EMI Options</span>
                </div>
                <div className="flex gap-2 mb-3">
                  {[3, 6, 9, 12].map((months) => (
                    <button
                      key={months}
                      onClick={() => setEmiMonths(months)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        emiMonths === months ? "bg-maroon-900 text-white" : "bg-maroon-50 text-maroon-900 hover:bg-maroon-100"
                      }`}
                    >
                      {months} Months
                    </button>
                  ))}
                </div>
                <p className="text-sm text-dark/60">
                  <span className="font-semibold text-maroon-900">₹{emiAmount.toLocaleString()}</span>/month at 12% interest
                </p>
              </div>

              {/* Coupon Code */}
              <div className="bg-white p-5 rounded-xl border border-maroon-100/50">
                <div className="flex items-center gap-2 mb-3">
                  <HelpCircle className="w-4 h-4 text-maroon-900" />
                  <span className="text-sm font-medium text-dark">Have a coupon?</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code (try: WOOD10)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    className="flex-1 px-4 py-2.5 border border-maroon-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-maroon-900/20"
                  />
                  <button
                    onClick={() => {
                      if (couponCode === "WOOD10") setCouponApplied(true);
                    }}
                    className="px-5 py-2.5 border border-maroon-900 text-maroon-900 rounded-lg text-sm font-medium hover:bg-maroon-50 transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {couponApplied && (
                  <p className="text-sm text-green-600 mt-2 flex items-center gap-1"><Check className="w-3 h-3" /> 10% discount applied!</p>
                )}
              </div>
            </div>
          </FadeUp>
        </div>
      </div>

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <section className="bg-white py-20 border-t border-maroon-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeUp>
              <h2 className="font-heading text-3xl text-dark mb-10">You May Also Like</h2>
            </FadeUp>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 360 View Modal */}
      <AnimatePresence>
        {show360 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShow360(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-8 max-w-2xl w-full relative"
            >
              <button
                onClick={() => setShow360(false)}
                className="absolute top-4 right-4 p-2 hover:bg-maroon-50 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="font-heading text-2xl text-dark mb-2 text-center">360° View</h3>
              <p className="text-center text-dark/50 text-sm mb-6">Drag to rotate the product</p>
              <div className="relative aspect-square bg-maroon-50 rounded-2xl overflow-hidden">
                <motion.img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain"
                  animate={{ rotateY: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  style={{ transformStyle: "preserve-3d" }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                />
              </div>
              <p className="text-center text-xs text-dark/40 mt-4">Interactive 360° preview</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
