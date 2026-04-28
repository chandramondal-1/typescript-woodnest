import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag, Heart, Search, User } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Shop", path: "/shop" },
  { name: "Categories", path: "/categories" },
  { name: "Blog", path: "/blog" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { totalItems, setIsCartOpen } = useCart();
  const { items: wishlistItems } = useWishlist();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [location]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const isHome = location.pathname === "/";

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || !isHome
            ? "bg-cream/90 backdrop-blur-xl shadow-sm border-b border-maroon-100"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <motion.div
                whileHover={{ rotate: 5 }}
                className="w-10 h-10 bg-maroon-900 rounded-lg flex items-center justify-center"
              >
                <span className="text-white font-heading font-bold text-xl">W</span>
              </motion.div>
              <div className="flex flex-col">
                <span className={`font-heading font-bold text-xl leading-none transition-colors ${scrolled || !isHome ? "text-maroon-900" : "text-white"}`}>
                  Woodnest
                </span>
                <span className={`text-[10px] uppercase tracking-[0.2em] font-premium transition-colors ${scrolled || !isHome ? "text-maroon-700" : "text-white/80"}`}>
                  Premium Furniture
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative font-premium text-sm uppercase tracking-wider transition-colors group ${
                    location.pathname === link.path
                      ? scrolled || !isHome ? "text-maroon-900" : "text-white"
                      : scrolled || !isHome ? "text-dark/70 hover:text-maroon-900" : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-gold transition-all duration-300 ${location.pathname === link.path ? "w-full" : "w-0 group-hover:w-full"}`} />
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className={`p-2 rounded-full transition-colors ${scrolled || !isHome ? "text-dark hover:bg-maroon-50" : "text-white hover:bg-white/10"}`}
              >
                <Search className="w-5 h-5" />
              </button>

              <Link
                to="/wishlist"
                className={`hidden sm:flex p-2 rounded-full transition-colors relative ${scrolled || !isHome ? "text-dark hover:bg-maroon-50" : "text-white hover:bg-white/10"}`}
              >
                <Heart className="w-5 h-5" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-maroon-900 text-white text-xs rounded-full flex items-center justify-center font-medium">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setIsCartOpen(true)}
                className={`hidden sm:flex p-2 rounded-full transition-colors relative ${scrolled || !isHome ? "text-dark hover:bg-maroon-50" : "text-white hover:bg-white/10"}`}
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold text-dark text-xs rounded-full flex items-center justify-center font-medium">
                    {totalItems}
                  </span>
                )}
              </button>

              <Link
                to="/account"
                className={`hidden sm:flex p-2 rounded-full transition-colors ${scrolled || !isHome ? "text-dark hover:bg-maroon-50" : "text-white hover:bg-white/10"}`}
              >
                <User className="w-5 h-5" />
              </Link>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`lg:hidden p-2 rounded-full transition-colors ${scrolled || !isHome ? "text-dark hover:bg-maroon-50" : "text-white hover:bg-white/10"}`}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-maroon-100 bg-cream/95 backdrop-blur-xl overflow-hidden"
            >
              <form onSubmit={handleSearch} className="max-w-7xl mx-auto px-4 py-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-maroon-400" />
                  <input
                    type="text"
                    placeholder="Search for sofas, beds, dining sets..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white border border-maroon-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-maroon-900/20 font-body text-dark placeholder:text-maroon-300"
                    autoFocus
                  />
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-cream lg:hidden"
          >
            <div className="flex flex-col h-full pt-24 px-6 pb-8">
              <div className="flex-1 flex flex-col gap-2">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block py-4 text-2xl font-heading border-b border-maroon-100 ${
                        location.pathname === link.path ? "text-maroon-900" : "text-dark"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="flex gap-4 pt-6 border-t border-maroon-100">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsCartOpen(true);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-maroon-900 text-white rounded-xl font-premium"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Cart ({totalItems})
                </button>
                <Link
                  to="/wishlist"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 border border-maroon-900 text-maroon-900 rounded-xl font-premium"
                >
                  <Heart className="w-5 h-5" />
                  Wishlist ({wishlistItems.length})
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
