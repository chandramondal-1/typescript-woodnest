export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: "best-sofa-small-home",
    title: "Best Sofa for Small Home: Maximize Space Without Compromising Style",
    excerpt: "Discover the perfect sofas designed specifically for compact living spaces. From L-shapes to loveseats, find your ideal fit.",
    content: `Living in a small home doesn't mean you have to compromise on style or comfort. The key is choosing furniture that serves multiple purposes while maintaining a sense of openness.

**1. Measure Your Space First**
Before falling in love with any sofa, measure your room carefully. Leave at least 18 inches of walking space around your furniture.

**2. Choose the Right Configuration**
L-shaped sofas can actually make a room feel larger by defining seating areas. Consider a 2-seater or compact 3-seater for apartments under 800 sq ft.

**3. Light Colors Open Up Spaces**
Opt for beige, cream, or light grey upholstery to reflect light and create an airy feel.

**4. Leggy Designs**
Sofas with visible legs create a sense of openness compared to boxy designs that sit flush to the floor.

**5. Multi-Functional Options**
Sofa cum beds are perfect for homes that double as guest spaces. Our El Top collection offers premium comfort in both configurations.`,
    image: "/images/blog-interior.jpg",
    author: "Priya Sharma",
    date: "April 15, 2026",
    readTime: "5 min read",
    category: "Buying Guide",
    tags: ["small spaces", "apartment living", "sofa guide"]
  },
  {
    id: "sofa-color-guide",
    title: "Sofa Color Guide 2026: Trends That Will Transform Your Living Room",
    excerpt: "From timeless neutrals to bold statements, learn how to choose the perfect sofa color for your interior design scheme.",
    content: `Color is the soul of your living room. The right sofa color can elevate your entire home aesthetic.

**2026 Trending Colors:**

**Deep Maroon & Burgundy**
Rich, wine-inspired tones are making a massive comeback. They add warmth and sophistication to any space.

**Sage & Olive Green**
Nature-inspired hues bring calm and tranquility to urban homes.

**Warm Beige & Cream**
Timeless classics that never go out of style. Perfect for minimalist and Scandinavian interiors.

**Navy & Midnight Blue**
Dramatic yet versatile, these colors pair beautifully with gold accents and light walls.

**Color Psychology Tips:**
- Warm colors (red, orange, yellow) create cozy, inviting spaces
- Cool colors (blue, green, purple) promote relaxation and calm
- Neutrals provide flexibility for seasonal decor changes`,
    image: "/images/hero-sofa.jpg",
    author: "Arjun Mehta",
    date: "April 10, 2026",
    readTime: "4 min read",
    category: "Design Tips",
    tags: ["color trends", "interior design", "2026 trends"]
  },
  {
    id: "luxury-interior-tips",
    title: "Luxury Interior Tips: Creating a Premium Home on Any Budget",
    excerpt: "Learn the secrets interior designers use to create luxurious spaces without breaking the bank.",
    content: `Luxury isn't about price tags—it's about thoughtful curation and attention to detail.

**The 80/20 Rule of Luxury Design**
Invest 80% of your budget in quality foundational pieces (sofa, bed, dining table) and 20% in accessories and decor.

**Texture Layering**
Combine different textures: velvet cushions on leather sofas, silk throws on cotton upholstery, marble with wood.

**Lighting is Everything**
Layer your lighting: ambient (overhead), task (reading lamps), and accent (wall sconces). Warm light (2700K-3000K) creates the most luxurious atmosphere.

**The Power of Negative Space**
Don't overcrowd your rooms. Luxury breathing room between pieces signals confidence and refinement.

**Statement Pieces**
Choose one showstopper per room. A bold L-shape sofa, an oversized artwork, or a sculptural center table.

**Quality Over Quantity**
One genuine leather sofa beats three synthetic ones. Quality materials age beautifully and tell a story.`,
    image: "/images/blog-interior.jpg",
    author: "Neha Gupta",
    date: "April 5, 2026",
    readTime: "6 min read",
    category: "Interior Design",
    tags: ["luxury", "budget tips", "home decor"]
  },
  {
    id: "how-to-clean-sofa",
    title: "How to Clean Your Sofa: Expert Maintenance Guide",
    excerpt: "Extend the life of your premium sofa with our comprehensive cleaning and maintenance tips from furniture care experts.",
    content: `Regular maintenance keeps your sofa looking new for years. Here's our expert guide:

**Weekly Care**
- Vacuum all surfaces using an upholstery attachment
- Fluff and rotate cushions to maintain shape
- Wipe down wooden or metal legs

**Monthly Deep Clean**
- Check manufacturer tags for cleaning codes
- Spot-clean stains immediately with appropriate solutions
- Use a fabric freshener for odor control

**Fabric-Specific Tips:**

**Leather:**
- Dust weekly with a microfiber cloth
- Condition every 6-12 months
- Avoid direct sunlight to prevent cracking

**Velvet:**
- Brush gently in the direction of the nap
- Use a handheld steamer for wrinkles
- Never iron directly

**Fabric/Upholstery:**
- Use a mild detergent solution for stains
- Test cleaning products on hidden areas first
- Consider professional cleaning annually

**Protection Tips:**
- Use arm covers in high-traffic areas
- Apply fabric protector spray annually
- Keep pets' nails trimmed`,
    image: "/images/factory-craft.jpg",
    author: "Ravi Kumar",
    date: "March 28, 2026",
    readTime: "7 min read",
    category: "Maintenance",
    tags: ["cleaning", "sofa care", "maintenance"]
  },
  {
    id: "sofa-buying-guide-2026",
    title: "Sofa Buying Guide 2026: Everything You Need to Know",
    excerpt: "The ultimate checklist for buying a sofa in 2026. From frame construction to fabric selection, make an informed choice.",
    content: `Buying a sofa is a significant investment. Use this comprehensive guide to choose wisely.

**Frame Construction**
- Solid hardwood frames (sheesham, teak, oak) last decades
- Avoid particle board or MDF frames
- Check corner blocks and joinery quality

**Suspension Systems**
- 8-way hand-tied: Gold standard, most durable
- Sinuous springs: Good balance of comfort and cost
- Webbing: Budget option, less durable

**Cushion Fillings**
- High-density foam (40+ density): Best for everyday use
- Memory foam: Excellent pressure relief
- Down/feather: Luxurious softness, requires fluffing
- Hybrid: Best of all worlds

**Fabric Durability**
Check the Martindale rub count:
- 15,000-25,000: Light domestic use
- 25,000-35,000: General domestic use
- 35,000+: Heavy commercial use

**Size Guidelines**
- Allow 7 feet for a 3-seater
- 18 inches clearance on all sides
- Measure doorways and staircases for delivery

**Warranty Considerations**
- Frame: Minimum 10 years
- Springs: 5-10 years
- Cushions: 2-5 years`,
    image: "/images/hero-sofa.jpg",
    author: "Priya Sharma",
    date: "March 20, 2026",
    readTime: "8 min read",
    category: "Buying Guide",
    tags: ["buying guide", "2026", "sofa tips"]
  },
  {
    id: "trending-sofa-design-india",
    title: "Trending Sofa Designs in India: What's Hot in 2026",
    excerpt: "From curved silhouettes to modular sections, explore the sofa designs dominating Indian homes this year.",
    content: `Indian furniture design is evolving rapidly. Here are the top trends reshaping living rooms across the country:

**Curved & Organic Shapes**
Moving away from rigid rectangles, curved sofas are bringing softness and flow to modern Indian homes.

**Modular Flexibility**
Modular sofas that can be reconfigured for festivals, family gatherings, or intimate evenings are gaining massive popularity.

**Deep Maroon & Jewel Tones**
Reflecting India's love for rich colors, deep maroon, emerald green, and sapphire blue sofas are trending.

**Mixed Materials**
Combining wood, metal, and upholstery in single pieces creates visual interest and celebrates Indian craftsmanship.

**Low-Profile Designs**
Japanese-inspired low sofas are perfect for Indian floor-seating traditions while maintaining modern aesthetics.

**Smart Sofas**
USB ports, wireless charging pads, and built-in speakers are becoming standard in premium ranges.

**Sustainable Choices**
Eco-friendly fabrics and responsibly sourced wood are increasingly important to conscious Indian consumers.`,
    image: "/images/blog-interior.jpg",
    author: "Arjun Mehta",
    date: "March 15, 2026",
    readTime: "5 min read",
    category: "Trends",
    tags: ["india", "trends", "2026 design"]
  },
];
