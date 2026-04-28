import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowLeft, Share2, Bookmark, Tag } from "lucide-react";
import { blogPosts } from "@/data/blog";
import { FadeUp, TextReveal } from "@/components/animations";

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", ...Array.from(new Set(blogPosts.map((p) => p.category)))];

  const filtered = activeCategory === "All"
    ? blogPosts
    : blogPosts.filter((p) => p.category === activeCategory);

  return (
    <div className="pt-20 min-h-screen bg-cream">
      <section className="bg-white border-b border-maroon-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <span className="text-maroon-900 font-premium text-sm uppercase tracking-[0.2em] mb-3 block">Journal</span>
          </FadeUp>
          <TextReveal text="Design Insights & Tips" tag="h1" className="font-heading text-4xl lg:text-5xl text-dark mb-4" />
          <FadeUp delay={0.2}>
            <p className="text-dark/60 max-w-xl">
              Expert advice, trend reports, and inspiration for creating your dream home.
            </p>
          </FadeUp>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-maroon-900 text-white"
                  : "bg-white text-dark/70 border border-maroon-200 hover:border-maroon-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group bg-white rounded-2xl overflow-hidden border border-maroon-100/50 shadow-card hover:shadow-card-hover transition-all duration-500"
            >
              <Link to={`/blog/${post.id}`} className="block relative aspect-[16/10] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-maroon-900">
                  {post.category}
                </div>
              </Link>
              <div className="p-6">
                <div className="flex items-center gap-4 text-xs text-dark/50 mb-3">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                </div>
                <Link to={`/blog/${post.id}`}>
                  <h3 className="font-heading text-lg text-dark group-hover:text-maroon-900 transition-colors line-clamp-2 mb-3">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-sm text-dark/50 line-clamp-2 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-maroon-900">{post.author}</span>
                  <Link to={`/blog/${post.id}`} className="text-sm text-maroon-900 font-medium flex items-center gap-1 hover:gap-2 transition-all">
                    Read More <ArrowLeft className="w-3 h-3 rotate-180" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}

export function BlogDetail() {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="pt-32 text-center">
        <h2 className="font-heading text-2xl text-dark">Article not found</h2>
        <Link to="/blog" className="text-maroon-900 mt-4 inline-block">Back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-cream">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <FadeUp>
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-dark/50 hover:text-maroon-900 transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
        </FadeUp>

        <FadeUp>
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 bg-maroon-100 text-maroon-900 rounded-full text-xs font-medium">{post.category}</span>
            <span className="flex items-center gap-1 text-sm text-dark/50"><Calendar className="w-3 h-3" /> {post.date}</span>
            <span className="flex items-center gap-1 text-sm text-dark/50"><Clock className="w-3 h-3" /> {post.readTime}</span>
          </div>
        </FadeUp>

        <TextReveal text={post.title} tag="h1" className="font-heading text-3xl lg:text-5xl text-dark mb-8" />

        <FadeUp delay={0.2}>
          <div className="relative aspect-video rounded-2xl overflow-hidden mb-10">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>
        </FadeUp>

        <FadeUp delay={0.3}>
          <div className="flex items-center justify-between mb-8 pb-8 border-b border-maroon-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-maroon-100 rounded-full flex items-center justify-center">
                <span className="font-heading text-sm text-maroon-900">{post.author.split(" ").map(n => n[0]).join("")}</span>
              </div>
              <div>
                <p className="font-medium text-dark text-sm">{post.author}</p>
                <p className="text-xs text-dark/50">Furniture Expert</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-maroon-50 rounded-full transition-colors"><Share2 className="w-4 h-4 text-dark/50" /></button>
              <button className="p-2 hover:bg-maroon-50 rounded-full transition-colors"><Bookmark className="w-4 h-4 text-dark/50" /></button>
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={0.4}>
          <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-dark prose-p:text-dark/70 prose-strong:text-maroon-900 prose-a:text-maroon-900">
            {post.content.split('\n').map((paragraph, i) => {
              if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                return <h3 key={i} className="font-heading text-2xl text-dark mt-8 mb-4">{paragraph.replace(/\*\*/g, '')}</h3>;
              }
              if (paragraph.startsWith('- ')) {
                return <li key={i} className="text-dark/70 ml-4">{paragraph.replace('- ', '')}</li>;
              }
              if (paragraph.trim() === '') return null;
              return <p key={i} className="mb-4 leading-relaxed">{paragraph}</p>;
            })}
          </div>
        </FadeUp>

        <FadeUp delay={0.5}>
          <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-maroon-100">
            {post.tags.map((tag) => (
              <span key={tag} className="flex items-center gap-1 px-3 py-1 bg-maroon-50 text-maroon-900 rounded-full text-xs">
                <Tag className="w-3 h-3" /> {tag}
              </span>
            ))}
          </div>
        </FadeUp>
      </article>
    </div>
  );
}
