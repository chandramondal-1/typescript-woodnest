import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Gem, Shield, TreePine, Users, Eye, Target } from "lucide-react";
import { teamMembers } from "@/data/team";
import { FadeUp, TextReveal, StaggerContainer, StaggerItem } from "@/components/animations";

export default function About() {
  const values = [
    { icon: Gem, title: "Premium Quality", desc: "Only the finest materials make it into our workshop." },
    { icon: Shield, title: "5-Year Warranty", desc: "Every piece backed by our comprehensive guarantee." },
    { icon: TreePine, title: "Sustainable", desc: "Responsibly sourced wood and eco-friendly processes." },
    { icon: Users, title: "Customer First", desc: "Your satisfaction drives every decision we make." },
  ];

  const process = [
    { step: "01", title: "Design", desc: "Our designers sketch concepts blending global trends with Indian aesthetics." },
    { step: "02", title: "Material Selection", desc: "We hand-pick every wood grain, fabric swatch, and leather hide." },
    { step: "03", title: "Crafting", desc: "Master artisans shape, join, and finish each piece with precision." },
    { step: "04", title: "Quality Check", desc: "Rigorous inspection ensures perfection before packaging." },
  ];

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-24 bg-maroon-950 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="/images/factory-craft.jpg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-maroon-950/80" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <FadeUp>
            <span className="text-gold font-premium text-sm uppercase tracking-[0.2em] mb-4 block">Our Story</span>
          </FadeUp>
          <TextReveal text="Crafting Luxury Since 2010" tag="h1" className="font-heading text-5xl lg:text-7xl text-white mb-6" />
          <FadeUp delay={0.3}>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              From a small workshop in Mumbai to India's most trusted luxury furniture brand, our journey is built on passion, precision, and an unwavering commitment to quality.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeUp>
              <div className="relative">
                <img src="/images/factory-craft.jpg" alt="Craftsmanship" className="rounded-3xl shadow-xl w-full h-[500px] object-cover" />
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -bottom-6 -right-6 bg-maroon-900 text-white p-6 rounded-2xl shadow-xl"
                >
                  <div className="font-heading text-4xl font-bold">15+</div>
                  <div className="text-sm text-white/70">Years of Excellence</div>
                </motion.div>
              </div>
            </FadeUp>

            <div>
              <FadeUp>
                <span className="text-maroon-900 font-premium text-sm uppercase tracking-[0.2em] mb-3 block">Who We Are</span>
              </FadeUp>
              <TextReveal text="Where Craftsmanship Meets Modern Living" tag="h2" className="font-heading text-4xl text-dark mb-6" delay={0.1} />
              <FadeUp delay={0.2}>
                <p className="text-dark/60 leading-relaxed mb-6">
                  Woodnest was born from a simple belief: every home deserves furniture that inspires. What started as a father-son workshop in a Mumbai garage has grown into a nationwide brand serving over 10,000 happy families.
                </p>
                <p className="text-dark/60 leading-relaxed mb-8">
                  We combine traditional Indian woodworking techniques with contemporary design sensibilities. Each sofa, bed, and dining set is a testament to our craftsmen's dedication — many of whom have been with us since day one.
                </p>
              </FadeUp>
              <StaggerContainer className="grid grid-cols-2 gap-4" staggerDelay={0.1} delayStart={0.3}>
                {[
                  { value: "10K+", label: "Happy Customers" },
                  { value: "500+", label: "Unique Designs" },
                  { value: "50+", label: "Artisans" },
                  { value: "12", label: "States Served" },
                ].map((stat) => (
                  <StaggerItem key={stat.label}>
                    <div className="bg-white p-5 rounded-xl border border-maroon-100">
                      <div className="font-heading text-2xl text-maroon-900 font-bold">{stat.value}</div>
                      <div className="text-sm text-dark/50">{stat.label}</div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <FadeUp>
              <span className="text-maroon-900 font-premium text-sm uppercase tracking-[0.2em] mb-3 block">Our Promise</span>
            </FadeUp>
            <TextReveal text="Why Choose Woodnest" tag="h2" className="font-heading text-4xl lg:text-5xl text-dark" />
          </div>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((val, i) => (
              <StaggerItem key={i}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="bg-cream p-8 rounded-2xl border border-maroon-100/50 text-center group hover:shadow-card-hover transition-all duration-500"
                >
                  <div className="w-16 h-16 bg-maroon-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-maroon-900 transition-colors duration-300">
                    <val.icon className="w-7 h-7 text-maroon-900 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-heading text-xl text-dark mb-3">{val.title}</h3>
                  <p className="text-dark/50 text-sm leading-relaxed">{val.desc}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Manufacturing Process */}
      <section className="py-24 bg-maroon-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <FadeUp>
              <span className="text-gold font-premium text-sm uppercase tracking-[0.2em] mb-3 block">Behind The Scenes</span>
            </FadeUp>
            <TextReveal text="Our Manufacturing Process" tag="h2" className="font-heading text-4xl lg:text-5xl text-white" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, i) => (
              <FadeUp key={i} delay={i * 0.15}>
                <div className="relative">
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors duration-300">
                    <div className="font-heading text-5xl text-gold/30 font-bold mb-4">{step.step}</div>
                    <h3 className="font-heading text-xl text-white mb-3">{step.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                  {i < process.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px bg-white/20" />
                  )}
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <FadeUp>
              <div className="bg-white p-10 rounded-3xl border border-maroon-100/50 shadow-card">
                <Eye className="w-10 h-10 text-maroon-900 mb-6" />
                <h3 className="font-heading text-3xl text-dark mb-4">Our Vision</h3>
                <p className="text-dark/60 leading-relaxed">
                  To be the most loved furniture brand in India, known for transforming houses into homes through exceptional craftsmanship and thoughtful design. We envision a future where every Indian family has access to world-class furniture that reflects their aspirations.
                </p>
              </div>
            </FadeUp>
            <FadeUp delay={0.15}>
              <div className="bg-white p-10 rounded-3xl border border-maroon-100/50 shadow-card">
                <Target className="w-10 h-10 text-maroon-900 mb-6" />
                <h3 className="font-heading text-3xl text-dark mb-4">Our Mission</h3>
                <p className="text-dark/60 leading-relaxed">
                  We craft furniture that honors Indian traditions while embracing global modernity. By empowering local artisans, using sustainable materials, and maintaining uncompromising quality standards, we create pieces that families cherish for generations.
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <FadeUp>
              <span className="text-maroon-900 font-premium text-sm uppercase tracking-[0.2em] mb-3 block">The People</span>
            </FadeUp>
            <TextReveal text="Meet Our Team" tag="h2" className="font-heading text-4xl lg:text-5xl text-dark" />
          </div>

          <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <StaggerItem key={member.id}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="group"
                >
                  <div className="relative overflow-hidden rounded-2xl mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-maroon-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <h3 className="font-heading text-lg text-dark">{member.name}</h3>
                  <p className="text-maroon-900 text-sm font-medium mb-2">{member.role}</p>
                  <p className="text-dark/50 text-sm leading-relaxed">{member.bio}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-maroon-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeUp>
            <h2 className="font-heading text-4xl lg:text-5xl text-white mb-6">
              Experience the Woodnest Difference
            </h2>
            <p className="text-white/60 mb-10 max-w-xl mx-auto">
              Visit our showroom or explore our collection online. Your dream furniture is just a click away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold text-dark rounded-full font-premium font-semibold hover:bg-gold-light transition-colors btn-shine"
              >
                Shop Collection <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/30 text-white rounded-full font-premium hover:bg-white/10 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
