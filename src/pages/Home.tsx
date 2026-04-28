import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Truck, RotateCcw, CreditCard, Award, Headphones, Star, Instagram, ChevronRight, Check } from "lucide-react";
import { products, categories } from "@/data/products";
import { reviews } from "@/data/reviews";
import { ProductCard } from "@/components/ProductCard";
import { ShineButton } from "@/components/ShineButton";
import { FadeUp, TextReveal, StaggerContainer, StaggerItem } from "@/components/animations";
import gsap from "gsap";

/* ───────── Hero Section ───────── */
function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });
      tl.from(titleRef.current, { y: 100, opacity: 0, duration: 1.2, ease: "power4.out" })
        .from(subtitleRef.current, { y: 40, opacity: 0, duration: 0.8 }, "-=0.6")
        .from(imageRef.current, { scale: 0.8, opacity: 0, duration: 1.4, ease: "power3.out" }, "-=0.7")
        .from(ctaRef.current, { y: 30, opacity: 0, duration: 0.7 }, "-=0.5");

      gsap.to(imageRef.current, {
        y: -15,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Floating particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 6 + 2,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 4,
  }));

  return (
    <section ref={heroRef} className="relative min-h-screen overflow-hidden bg-cream">
      {/* Animated Gradient Background */}
      <motion.div
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-gradient-to-br from-maroon-900 via-maroon-800 to-maroon-950 bg-[length:300%_300%]"
      />

      {/* Floating Particles */}
      <div ref={particlesRef} className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-white/10"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
            }}
            animate={{
              y: [0, -150],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Rotating Rings */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 right-20 w-72 h-72 border border-white/10 rounded-full hidden lg:block"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
        className="absolute top-28 right-28 w-56 h-56 border border-white/5 rounded-full hidden lg:block"
      />

      {/* Content */}
      <motion.div style={{ y, opacity }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen grid lg:grid-cols-2 gap-12 items-center pt-32 pb-20">
        {/* Left Text */}
        <div className="text-center lg:text-left">
          <motion.p
            ref={subtitleRef}
            animate={{ letterSpacing: ["2px", "6px", "2px"] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="text-white/80 uppercase text-xs sm:text-sm tracking-[4px] mb-6 font-premium"
          >
            Premium Furniture Collection
          </motion.p>

          <h1 ref={titleRef} className="font-heading text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.1] mb-6">
            Luxury
            <br />
            <span className="text-gold">Sofa</span>
            <br />
            For Modern Living
          </h1>

          <p ref={subtitleRef} className="text-white/70 text-base sm:text-lg max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed">
            Discover handcrafted premium sofas designed for elegance, comfort, and timeless interiors. Every piece tells a story.
          </p>

          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <ShineButton to="/shop" variant="gold">
              Shop Now
            </ShineButton>
            <ShineButton to="/categories" variant="outline" icon={false}>
              Explore Collection
            </ShineButton>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-12 justify-center lg:justify-start">
            {[
              { value: "10K+", label: "Happy Customers" },
              { value: "500+", label: "Designs" },
              { value: "15+", label: "Years Experience" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + i * 0.2, duration: 0.6 }}
                className="text-center"
              >
                <div className="font-heading text-2xl sm:text-3xl text-gold font-bold">{stat.value}</div>
                <div className="text-white/50 text-xs mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Image */}
        <div ref={imageRef} className="relative perspective-1000">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="/images/hero-sofa.jpg"
              alt="Luxury Sofa"
              className="w-full h-[400px] sm:h-[500px] lg:h-[600px] object-cover"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-maroon-900/30 to-transparent" />
          </div>

          {/* Floating Badge */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-6 -left-6 glass px-6 py-4 rounded-2xl"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center">
                <span className="text-dark font-bold text-lg">25%</span>
              </div>
              <div>
                <p className="text-white font-semibold">OFF</p>
                <p className="text-white/60 text-sm">Limited Offer</p>
              </div>
            </div>
          </motion.div>

          {/* Rating Badge */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-4 -right-4 glass px-4 py-3 rounded-xl"
          >
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 fill-gold text-gold" />
              <span className="text-white font-bold">4.9</span>
            </div>
            <p className="text-white/60 text-xs mt-0.5">2,000+ Reviews</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-5 h-8 border-2 border-white/30 rounded-full flex justify-center pt-1.5">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1 h-2 bg-white/60 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}

/* ───────── Features Strip ───────── */
function FeaturesStrip() {
  const features = [
    { icon: Truck, title: "Free Delivery", desc: "Across India" },
    { icon: RotateCcw, title: "Easy Return", desc: "30 Days Policy" },
    { icon: CreditCard, title: "EMI Available", desc: "0% Interest" },
    { icon: Award, title: "Premium Quality", desc: "5 Year Warranty" },
    { icon: Headphones, title: "24x7 Support", desc: "Always Here" },
  ];

  return (
    <section className="bg-white border-y border-maroon-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 divide-x divide-maroon-100">
          {features.map((feature, i) => (
            <FadeUp key={i} delay={i * 0.1} className="flex items-center gap-4 py-8 px-6 group">
              <div className="w-12 h-12 bg-maroon-50 rounded-xl flex items-center justify-center group-hover:bg-maroon-900 transition-colors duration-300">
                <feature.icon className="w-5 h-5 text-maroon-900 group-hover:text-white transition-colors" />
              </div>
              <div>
                <h4 className="font-semibold text-dark text-sm">{feature.title}</h4>
                <p className="text-xs text-dark/50">{feature.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── Best Sellers ───────── */
function BestSellers() {
  const bestsellers = products.filter((p) => p.isBestseller).slice(0, 4);

  return (
    <section className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <FadeUp>
              <span className="text-maroon-900 font-premium text-sm uppercase tracking-[0.2em] mb-3 block">Curated For You</span>
            </FadeUp>
            <TextReveal text="Best Sellers" tag="h2" className="font-heading text-4xl lg:text-5xl text-dark" />
          </div>
          <Link to="/shop?sort=bestseller" className="hidden sm:flex items-center gap-2 text-maroon-900 font-premium text-sm hover:gap-3 transition-all">
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestsellers.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────── Categories Preview ───────── */
function CategoriesPreview() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <FadeUp>
            <span className="text-maroon-900 font-premium text-sm uppercase tracking-[0.2em] mb-3 block">Browse By Style</span>
          </FadeUp>
          <TextReveal text="Shop By Category" tag="h2" className="font-heading text-4xl lg:text-5xl text-dark" />
        </div>

        <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6">
          {categories.slice(0, 6).map((cat: any) => (
            <StaggerItem key={cat.id}>
              <Link
                to={`/shop?category=${encodeURIComponent(cat.name)}`}
                className="group relative block overflow-hidden rounded-2xl aspect-[4/3]"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-maroon-900/80 via-maroon-900/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-heading text-xl text-white mb-1">{cat.name}</h3>
                  <p className="text-white/70 text-sm">{cat.count} Products</p>
                </div>
                <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                  <ChevronRight className="w-5 h-5 text-white" />
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

/* ───────── Why Choose Us ───────── */
function WhyChooseUs() {
  const reasons = [
    { title: "Handcrafted Quality", desc: "Each piece is meticulously crafted by skilled artisans with decades of experience." },
    { title: "Premium Materials", desc: "We source only the finest woods, fabrics, and leathers from certified suppliers." },
    { title: "Custom Designs", desc: "Tailor dimensions, colors, and materials to match your unique vision." },
    { title: "5-Year Warranty", desc: "Every product comes with our comprehensive warranty for peace of mind." },
  ];

  return (
    <section className="py-24 bg-maroon-950 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-maroon-800/30 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <FadeUp>
              <span className="text-gold font-premium text-sm uppercase tracking-[0.2em] mb-3 block">Why Woodnest</span>
            </FadeUp>
            <TextReveal text="Crafted For Those Who Appreciate Excellence" tag="h2" className="font-heading text-4xl lg:text-5xl text-white mb-6" delay={0.2} />
            <FadeUp delay={0.4}>
              <p className="text-white/60 text-lg leading-relaxed mb-10">
                We don't just sell furniture. We create pieces that become part of your family's story, heirlooms that pass through generations.
              </p>
            </FadeUp>

            <StaggerContainer className="space-y-6" staggerDelay={0.15} delayStart={0.5}>
              {reasons.map((reason, i) => (
                <StaggerItem key={i}>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center shrink-0">
                      <Check className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <h4 className="font-heading text-lg text-white mb-1">{reason.title}</h4>
                      <p className="text-white/50 text-sm leading-relaxed">{reason.desc}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          <FadeUp delay={0.3} className="relative">
            <div className="relative rounded-3xl overflow-hidden">
              <img
                src="/images/factory-craft.jpg"
                alt="Craftsmanship"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-maroon-900/40 to-transparent" />
            </div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-8 -left-8 bg-cream p-6 rounded-2xl shadow-xl max-w-xs"
            >
              <div className="font-heading text-4xl text-maroon-900 font-bold mb-1">15+</div>
              <p className="text-dark/60 text-sm">Years of crafting premium furniture for Indian homes</p>
            </motion.div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ───────── Reviews ───────── */
function ReviewsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <FadeUp>
            <span className="text-maroon-900 font-premium text-sm uppercase tracking-[0.2em] mb-3 block">Testimonials</span>
          </FadeUp>
          <TextReveal text="What Our Customers Say" tag="h2" className="font-heading text-4xl lg:text-5xl text-dark" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Featured Review */}
          <FadeUp>
            <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-card border border-maroon-100/50">
              <div className="flex items-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                ))}
              </div>
              <p className="font-heading text-xl lg:text-2xl text-dark leading-relaxed mb-8">
                "{reviews[activeIndex].text}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-maroon-100 rounded-full flex items-center justify-center">
                  <span className="font-heading text-lg text-maroon-900">{reviews[activeIndex].avatar}</span>
                </div>
                <div>
                  <h4 className="font-semibold text-dark">{reviews[activeIndex].name}</h4>
                  <p className="text-sm text-dark/50">Verified Buyer · {reviews[activeIndex].product}</p>
                </div>
              </div>
            </div>
          </FadeUp>

          {/* Review Selector */}
          <div className="space-y-4">
            {reviews.slice(0, 4).map((review, i) => (
              <motion.button
                key={review.id}
                onClick={() => setActiveIndex(i)}
                whileHover={{ x: 8 }}
                className={`w-full text-left p-5 rounded-xl transition-all duration-300 border ${
                  i === activeIndex
                    ? "bg-white border-maroon-200 shadow-card"
                    : "bg-transparent border-transparent hover:bg-white/50"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold ${
                    i === activeIndex ? "bg-maroon-900 text-white" : "bg-maroon-100 text-maroon-900"
                  }`}>
                    {review.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-dark text-sm truncate">{review.name}</h4>
                    <div className="flex items-center gap-1 mt-0.5">
                      {[...Array(5)].map((_, s) => (
                        <Star key={s} className={`w-3 h-3 ${s < review.rating ? "fill-gold text-gold" : "text-maroon-200"}`} />
                      ))}
                      <span className="text-xs text-dark/40 ml-1">{review.product}</span>
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────── Instagram Gallery ───────── */
function InstagramGallery() {
  const images = [
    "/images/hero-sofa.jpg",
    "/images/blog-interior.jpg",
    "/images/dining-set.jpg",
    "/images/bed-luxury.jpg",
    "/images/center-table.jpg",
    "/images/factory-craft.jpg",
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <FadeUp>
            <span className="text-maroon-900 font-premium text-sm uppercase tracking-[0.2em] mb-3 block">@woodnest.in</span>
          </FadeUp>
          <TextReveal text="Follow Our Journey" tag="h2" className="font-heading text-4xl lg:text-5xl text-dark" />
        </div>

        <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {images.map((img, i) => (
            <StaggerItem key={i}>
              <motion.div
                whileHover={{ scale: 1.05, zIndex: 10 }}
                className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer"
              >
                <img src={img} alt={`Instagram ${i + 1}`} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-maroon-900/0 group-hover:bg-maroon-900/50 transition-colors duration-300 flex items-center justify-center">
                  <Instagram className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

/* ───────── Newsletter ───────── */
function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section className="py-24 bg-maroon-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "30px 30px"
        }} />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <FadeUp>
          <span className="text-gold font-premium text-sm uppercase tracking-[0.2em] mb-4 block">Newsletter</span>
          <h2 className="font-heading text-4xl lg:text-5xl text-white mb-4">
            Stay in the Loop
          </h2>
          <p className="text-white/60 mb-10 max-w-lg mx-auto">
            Subscribe for exclusive deals, new arrivals, and interior design inspiration delivered to your inbox.
          </p>
        </FadeUp>

        {subscribed ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8"
          >
            <Check className="w-12 h-12 text-gold mx-auto mb-4" />
            <h3 className="font-heading text-2xl text-white mb-2">Welcome Aboard!</h3>
            <p className="text-white/60">You're now part of the Woodnest family.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-6 py-4 bg-white/10 border border-white/20 rounded-full text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-gold/50 backdrop-blur-sm"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-gold text-dark rounded-full font-premium font-semibold hover:bg-gold-light transition-colors btn-shine whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

/* ───────── Home Page ───────── */
export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturesStrip />
      <BestSellers />
      <CategoriesPreview />
      <WhyChooseUs />
      <ReviewsSection />
      <InstagramGallery />
      <Newsletter />
    </div>
  );
}
