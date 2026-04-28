import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter, Youtube, ArrowUp } from "lucide-react";
import { FadeUp } from "./animations";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-maroon-950 text-white/80 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "40px 40px"
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* CTA Banner */}
        <FadeUp>
          <div className="py-16 border-b border-white/10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div>
                <h3 className="font-heading text-3xl lg:text-4xl text-white mb-2">
                  Ready to Transform Your Home?
                </h3>
                <p className="text-white/60 max-w-lg">
                  Browse our premium collection and find furniture that speaks to your style. Free delivery across India.
                </p>
              </div>
              <Link
                to="/shop"
                className="px-8 py-4 bg-gold text-dark rounded-full font-premium font-semibold hover:bg-gold-light transition-colors btn-shine whitespace-nowrap"
              >
                Explore Collection
              </Link>
            </div>
          </div>
        </FadeUp>

        {/* Main Footer Grid */}
        <div className="py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-maroon-900 font-heading font-bold text-xl">W</span>
              </div>
              <div>
                <span className="font-heading font-bold text-xl text-white block leading-none">Woodnest</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/60">Premium Furniture</span>
              </div>
            </div>
            <p className="text-sm text-white/60 mb-6 leading-relaxed">
              Crafting luxury furniture for modern Indian homes since 2010. Every piece tells a story of craftsmanship and elegance.
            </p>
            <div className="flex gap-3">
              {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -3, scale: 1.1 }}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-gold hover:text-dark transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {["Home", "About Us", "Shop", "Categories", "Blog", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    to={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`}
                    className="text-sm text-white/60 hover:text-gold transition-colors underline-slide"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-heading text-lg text-white mb-6">Categories</h4>
            <ul className="space-y-3">
              {["L Shape Sofa", "Recliner Sofa", "Wooden Sofa", "Dining Set", "Center Table", "Beds"].map((item) => (
                <li key={item}>
                  <Link
                    to={`/shop?category=${encodeURIComponent(item)}`}
                    className="text-sm text-white/60 hover:text-gold transition-colors underline-slide"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg text-white mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <span className="text-sm text-white/60">
                  123 Furniture Lane, Industrial Area,<br />Mumbai, Maharashtra 400001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gold shrink-0" />
                <span className="text-sm text-white/60">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gold shrink-0" />
                <span className="text-sm text-white/60">hello@woodnest.in</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40">
            © 2026 Woodnest Furniture. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-white/40">
            <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="#" className="hover:text-white transition-colors">Shipping Info</Link>
          </div>
        </div>
      </div>

      {/* Scroll to Top */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 w-12 h-12 bg-maroon-900 text-white rounded-full shadow-luxury flex items-center justify-center z-40 hover:bg-maroon-800 transition-colors"
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    </footer>
  );
}
