export interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  text: string;
  product: string;
  verified: boolean;
}

export const reviews: Review[] = [
  {
    id: "1",
    name: "Ananya Desai",
    avatar: "AD",
    rating: 5,
    date: "April 20, 2026",
    text: "The Caffino L Shape sofa completely transformed our living room. The quality is exceptional—every detail from the stitching to the cushioning speaks luxury. Delivery was seamless and the team even helped with placement.",
    product: "Caffino L Shape",
    verified: true,
  },
  {
    id: "2",
    name: "Rohan Khanna",
    avatar: "RK",
    rating: 5,
    date: "April 18, 2026",
    text: "We purchased the SS Mahal L Shape for our new home and it exceeded all expectations. The deep maroon color is stunning in person. After 3 months of daily use, it still looks brand new. Worth every rupee!",
    product: "SS Mahal L Shape",
    verified: true,
  },
  {
    id: "3",
    name: "Meera Patel",
    avatar: "MP",
    rating: 4,
    date: "April 15, 2026",
    text: "Beautiful craftsmanship on our wooden sofa set. The Sheesham wood frame is solid and the upholstery quality is top-notch. Only wish the cushions were slightly firmer, but that's personal preference.",
    product: "Bolton 3+1+1",
    verified: true,
  },
  {
    id: "4",
    name: "Vikram Sinha",
    avatar: "VS",
    rating: 5,
    date: "April 12, 2026",
    text: "The EMI option made it possible for us to get our dream sofa. The SS Audi L Shape is a conversation starter—every guest asks where we bought it. Customer service was responsive and professional throughout.",
    product: "SS Audi L Shape",
    verified: true,
  },
  {
    id: "5",
    name: "Priya Nair",
    avatar: "PN",
    rating: 5,
    date: "April 10, 2026",
    text: "From ordering to delivery, the experience was premium. The sofa cum bed is ingenious—perfect for our 2BHK when parents visit. The transformation mechanism is smooth and the mattress is surprisingly comfortable.",
    product: "El Top Sofa Cum Bed",
    verified: true,
  },
  {
    id: "6",
    name: "Aditya Sharma",
    avatar: "AS",
    rating: 4,
    date: "April 8, 2026",
    text: "Great value for money with the Mareena L Shape. Was skeptical about the lower price point but the build quality impressed me. Recommended for first-time homebuyers looking for style on a budget.",
    product: "Mareena L Shape",
    verified: true,
  },
  {
    id: "7",
    name: "Sanya Gupta",
    avatar: "SG",
    rating: 5,
    date: "April 5, 2026",
    text: "The recliner is my husband's favorite spot in the house! The massage function and USB port are game-changers. Assembly was done by the team in 20 minutes. Five stars for both product and service.",
    product: "Premium Recliner",
    verified: true,
  },
  {
    id: "8",
    name: "Karan Malhotra",
    avatar: "KM",
    rating: 5,
    date: "April 2, 2026",
    text: "Bought the complete living room set—sofa, center table, and dining set. The cohesive design language across pieces shows thoughtful curation. Our home finally looks like the Pinterest boards we saved!",
    product: "Signature 3+2+2",
    verified: true,
  },
];
