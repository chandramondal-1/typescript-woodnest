import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sofa, Bed, UtensilsCrossed, Table } from "lucide-react";
import { categories } from "@/data/products";
import { FadeUp, TextReveal, StaggerContainer, StaggerItem } from "@/components/animations";

const iconMap: Record<string, any> = {
  "L Shape Sofa": Sofa,
  "Recliner Sofa": Sofa,
  "Wooden Sofa": Sofa,
  "Luxury Sofa": Sofa,
  "Small Sofa": Sofa,
  "Office Sofa": Sofa,
  "Beds": Bed,
  "Dining Set": UtensilsCrossed,
  "Center Table": Table,
};

export default function Categories() {
  return (
    <div className="pt-20 min-h-screen bg-cream">
      <section className="bg-white border-b border-maroon-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <span className="text-maroon-900 font-premium text-sm uppercase tracking-[0.2em] mb-3 block">Browse</span>
          </FadeUp>
          <TextReveal text="Shop by Category" tag="h1" className="font-heading text-4xl lg:text-5xl text-dark mb-4" />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat) => {
            const Icon = iconMap[cat.name] || Sofa;
            return (
              <StaggerItem key={cat.id}>
                <Link to={`/shop?category=${encodeURIComponent(cat.name)}`}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="group relative bg-white rounded-2xl overflow-hidden border border-maroon-100/50 shadow-card hover:shadow-card-hover transition-all duration-500"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-maroon-900/70 via-maroon-900/20 to-transparent" />
                      <div className="absolute top-4 left-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-heading text-xl text-dark group-hover:text-maroon-900 transition-colors">{cat.name}</h3>
                          <p className="text-sm text-dark/50 mt-1">{cat.count} Products</p>
                        </div>
                        <div className="w-10 h-10 bg-maroon-50 rounded-full flex items-center justify-center group-hover:bg-maroon-900 transition-colors">
                          <ArrowRight className="w-4 h-4 text-maroon-900 group-hover:text-white transition-colors" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </div>
  );
}
