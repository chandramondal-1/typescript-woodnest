export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Rajesh Verma",
    role: "Founder & CEO",
    image: "/images/team-founder.jpg",
    bio: "With over 20 years in furniture manufacturing, Rajesh founded Woodnest with a vision to bring luxury furniture to every Indian home. His passion for craftsmanship drives our commitment to quality.",
  },
  {
    id: "2",
    name: "Anika Sharma",
    role: "Head of Design",
    image: "/images/team-designer.jpg",
    bio: "Anika leads our design team with an eye for global trends and Indian aesthetics. Her designs have won multiple international furniture design awards.",
  },
  {
    id: "3",
    name: "Vikram Patel",
    role: "Production Director",
    image: "/images/team-founder.jpg",
    bio: "Vikram oversees our manufacturing units across India, ensuring every piece meets our stringent quality standards. He brings 15 years of operational excellence.",
  },
  {
    id: "4",
    name: "Meera Krishnan",
    role: "Customer Experience Lead",
    image: "/images/team-designer.jpg",
    bio: "Meera ensures every Woodnest customer receives white-glove service. She has revolutionized our delivery and after-sales support systems.",
  },
];
