import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, X, ChevronDown, Grid3X3, LayoutList } from "lucide-react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { FadeUp, TextReveal } from "@/components/animations";

const allCategories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];
const allMaterials = Array.from(new Set(products.map((p) => p.material)));
const priceRanges = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under ₹30,000", min: 0, max: 30000 },
  { label: "₹30,000 - ₹60,000", min: 30000, max: 60000 },
  { label: "₹60,000 - ₹90,000", min: 60000, max: 90000 },
  { label: "Above ₹90,000", min: 90000, max: Infinity },
];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "All");
  const [selectedMaterial, setSelectedMaterial] = useState<string>("");
  const [selectedPriceRange, setSelectedPriceRange] = useState(0);
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  useEffect(() => {
    const search = searchParams.get("search");
    const category = searchParams.get("category");
    if (search) setSearchQuery(search);
    if (category) setSelectedCategory(category);
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (selectedMaterial) {
      result = result.filter((p) => p.material.includes(selectedMaterial));
    }

    const range = priceRanges[selectedPriceRange];
    result = result.filter((p) => p.price >= range.min && p.price <= range.max);

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
    }

    return result;
  }, [searchQuery, selectedCategory, selectedMaterial, selectedPriceRange, sortBy]);

  useEffect(() => {
    let count = 0;
    if (selectedCategory !== "All") count++;
    if (selectedMaterial) count++;
    if (selectedPriceRange !== 0) count++;
    setActiveFiltersCount(count);
  }, [selectedCategory, selectedMaterial, selectedPriceRange]);

  const clearFilters = () => {
    setSelectedCategory("All");
    setSelectedMaterial("");
    setSelectedPriceRange(0);
    setSearchQuery("");
    setSearchParams({});
  };

  return (
    <div className="pt-20 min-h-screen bg-cream">
      {/* Header */}
      <section className="bg-white border-b border-maroon-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <span className="text-maroon-900 font-premium text-sm uppercase tracking-[0.2em] mb-3 block">Collection</span>
          </FadeUp>
          <TextReveal text="Shop Premium Furniture" tag="h1" className="font-heading text-4xl lg:text-5xl text-dark mb-4" />
          <FadeUp delay={0.2}>
            <p className="text-dark/60 max-w-xl">
              Browse our curated collection of luxury sofas, beds, dining sets, and more.
            </p>
          </FadeUp>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search & Controls Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-maroon-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-maroon-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-maroon-900/20"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2">
                <X className="w-4 h-4 text-dark/40" />
              </button>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-colors ${
                showFilters || activeFiltersCount > 0
                  ? "bg-maroon-900 text-white border-maroon-900"
                  : "bg-white text-dark border-maroon-200 hover:border-maroon-400"
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="text-sm font-medium">Filters</span>
              {activeFiltersCount > 0 && (
                <span className="w-5 h-5 bg-gold text-dark text-xs rounded-full flex items-center justify-center font-bold">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none px-4 py-3 pr-10 bg-white border border-maroon-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-maroon-900/20 cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="newest">Newest</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark/40 pointer-events-none" />
            </div>

            <div className="hidden sm:flex bg-white border border-maroon-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-3 ${viewMode === "grid" ? "bg-maroon-50 text-maroon-900" : "text-dark/40 hover:text-dark"}`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-3 ${viewMode === "list" ? "bg-maroon-50 text-maroon-900" : "text-dark/40 hover:text-dark"}`}
              >
                <LayoutList className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-8"
            >
              <div className="bg-white rounded-2xl p-6 border border-maroon-100">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Categories */}
                  <div>
                    <h4 className="font-semibold text-dark mb-3 text-sm">Category</h4>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {allCategories.map((cat) => (
                        <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                          <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                            selectedCategory === cat ? "bg-maroon-900 border-maroon-900" : "border-maroon-300 group-hover:border-maroon-500"
                          }`}>
                            {selectedCategory === cat && <Check className="w-3 h-3 text-white" />}
                          </div>
                          <input
                            type="radio"
                            name="category"
                            checked={selectedCategory === cat}
                            onChange={() => setSelectedCategory(cat)}
                            className="hidden"
                          />
                          <span className="text-sm text-dark/70">{cat}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Materials */}
                  <div>
                    <h4 className="font-semibold text-dark mb-3 text-sm">Material</h4>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                          selectedMaterial === "" ? "bg-maroon-900 border-maroon-900" : "border-maroon-300 group-hover:border-maroon-500"
                        }`}>
                          {selectedMaterial === "" && <Check className="w-3 h-3 text-white" />}
                        </div>
                        <input
                          type="radio"
                          name="material"
                          checked={selectedMaterial === ""}
                          onChange={() => setSelectedMaterial("")}
                          className="hidden"
                        />
                        <span className="text-sm text-dark/70">All Materials</span>
                      </label>
                      {allMaterials.map((mat) => (
                        <label key={mat} className="flex items-center gap-2 cursor-pointer group">
                          <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                            selectedMaterial === mat ? "bg-maroon-900 border-maroon-900" : "border-maroon-300 group-hover:border-maroon-500"
                          }`}>
                            {selectedMaterial === mat && <Check className="w-3 h-3 text-white" />}
                          </div>
                          <input
                            type="radio"
                            name="material"
                            checked={selectedMaterial === mat}
                            onChange={() => setSelectedMaterial(mat)}
                            className="hidden"
                          />
                          <span className="text-sm text-dark/70">{mat}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <h4 className="font-semibold text-dark mb-3 text-sm">Price Range</h4>
                    <div className="space-y-2">
                      {priceRanges.map((range, i) => (
                        <label key={i} className="flex items-center gap-2 cursor-pointer group">
                          <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                            selectedPriceRange === i ? "bg-maroon-900 border-maroon-900" : "border-maroon-300 group-hover:border-maroon-500"
                          }`}>
                            {selectedPriceRange === i && <Check className="w-3 h-3 text-white" />}
                          </div>
                          <input
                            type="radio"
                            name="price"
                            checked={selectedPriceRange === i}
                            onChange={() => setSelectedPriceRange(i)}
                            className="hidden"
                          />
                          <span className="text-sm text-dark/70">{range.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Clear Filters */}
                  <div className="flex items-end">
                    <button
                      onClick={clearFilters}
                      className="w-full py-3 border border-maroon-200 text-maroon-900 rounded-xl text-sm font-medium hover:bg-maroon-50 transition-colors"
                    >
                      Clear All Filters
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-dark/60">
            Showing <span className="font-semibold text-dark">{filteredProducts.length}</span> products
          </p>
          {activeFiltersCount > 0 && (
            <button onClick={clearFilters} className="text-sm text-maroon-900 hover:underline">
              Clear filters
            </button>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className={`grid gap-6 ${
            viewMode === "grid"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "grid-cols-1"
          }`}>
            {filteredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Search className="w-16 h-16 text-maroon-200 mx-auto mb-4" />
            <h3 className="font-heading text-xl text-dark mb-2">No products found</h3>
            <p className="text-dark/50 mb-6">Try adjusting your filters or search query.</p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 bg-maroon-900 text-white rounded-full font-premium text-sm hover:bg-maroon-800 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Check({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}
