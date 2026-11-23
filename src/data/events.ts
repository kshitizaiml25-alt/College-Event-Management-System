export interface Event {
  id: string;
  title: string;
  category: string;
  date: string;
  deadline: string;         // Registration deadline
  venue: string;
  image: string;
  description: string;
  detailedDescription: string;
  organizer: string;
  seats: number;            // Total capacity
  registered: number;       // Filled seats (static mock)
  formUrl: string;          // Direct Google Form registration link
  tags: string[];
}

// ─────────────────────────────────────────────────────────────
// Event Registration Google Form URLs:
// These are live, verified Google Form links.
// Organizers can replace these with their own custom Google Form anytime!
// ─────────────────────────────────────────────────────────────
export const events: Event[] = [
  {
    id: "1",
    title: "CodeStorm Hackathon",
    category: "Technical",
    date: "December 05, 2026",
    deadline: "November 30, 2026",
    venue: "Main Auditorium, Block A",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=900",
    description: "Build innovative solutions and showcase your coding skills.",
    detailedDescription: "CodeStorm is a 24-hour hackathon where teams of 2–4 students compete to build real-world solutions. Themes include Ed-Tech, Health, and Sustainability. Prizes worth ₹1,00,000. Mentors from top companies will guide you throughout.",
    organizer: "Computer Science Department",
    seats: 200,
    registered: 142,
    tags: ["Hackathon", "Coding", "Prize"],
    formUrl: "https://forms.gle/PYgY2chrFMb9uGPZ8",
  },
  {
    id: "2",
    title: "Campus Cultural Night",
    category: "Cultural",
    date: "December 12, 2026",
    deadline: "December 08, 2026",
    venue: "College Ground, Main Campus",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=900",
    description: "An exciting evening of music, dance and entertainment.",
    detailedDescription: "Campus Cultural Night is the most awaited annual celebration. Enjoy performances by student bands, dance groups, stand-up comedians, and invited artists. Open for all students, staff, and families. Food stalls available.",
    organizer: "Student Cultural Committee",
    seats: 500,
    registered: 387,
    tags: ["Music", "Dance", "Entertainment"],
    formUrl: "https://forms.gle/xfv9vQzfRfNCCVbG7",
  },
  {
    id: "3",
    title: "AI Innovation Workshop",
    category: "Workshop",
    date: "December 18, 2026",
    deadline: "December 14, 2026",
    venue: "Computer Science Block, Lab 3",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=900",
    description: "Explore practical AI applications and build intelligent projects.",
    detailedDescription: "A hands-on 1-day workshop covering Machine Learning fundamentals, LLM APIs, and building AI-powered mini-projects. Bring your laptop. Prior Python knowledge helpful but not mandatory. Certificate provided.",
    organizer: "AI & ML Club",
    seats: 60,
    registered: 54,
    tags: ["AI", "Machine Learning", "Hands-on"],
    formUrl: "https://forms.gle/MPnTJVWkFmRAkE9L6",
  },
  {
    id: "4",
    title: "Inter College Sports Meet",
    category: "Sports",
    date: "January 08, 2027",
    deadline: "December 28, 2026",
    venue: "Sports Complex, Ground Floor",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=900",
    description: "Compete and celebrate sportsmanship across colleges.",
    detailedDescription: "The Annual Inter-College Sports Meet features Cricket, Football, Basketball, Badminton, Chess and Athletics. Teams from 15+ colleges participate. Champions get trophies and medals. Register your team now.",
    organizer: "Sports & Athletics Committee",
    seats: 300,
    registered: 189,
    tags: ["Cricket", "Football", "Athletics"],
    formUrl: "https://forms.gle/YKSxTsJffi9Wow4a8",
  },
  {
    id: "5",
    title: "Startup Pitch Day",
    category: "Technical",
    date: "January 15, 2027",
    deadline: "January 10, 2027",
    venue: "Seminar Hall, Block B",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=900",
    description: "Present your ideas and meet mentors and investors.",
    detailedDescription: "Startup Pitch Day gives aspiring entrepreneurs a platform to present their ideas to a panel of investors, VCs, and successful founders. Top 3 ideas receive seed funding consideration and mentorship. Register as a team of 1–3.",
    organizer: "Entrepreneurship Cell",
    seats: 80,
    registered: 61,
    tags: ["Startup", "Pitch", "Funding"],
    formUrl: "https://forms.gle/PYgY2chrFMb9uGPZ8",
  },
  {
    id: "6",
    title: "Photography Exhibition",
    category: "Cultural",
    date: "January 22, 2027",
    deadline: "January 17, 2027",
    venue: "Art Gallery, Admin Block",
    image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=900",
    description: "Showcase your creative vision through photography.",
    detailedDescription: "Submit up to 3 original photographs on the theme 'Campus Life Unseen'. All entries will be displayed in the gallery. A jury of professional photographers will select winners. Open to all students. Physical prints required (A4 minimum).",
    organizer: "Photography & Arts Club",
    seats: 100,
    registered: 43,
    tags: ["Photography", "Art", "Exhibition"],
    formUrl: "https://forms.gle/xfv9vQzfRfNCCVbG7",
  },
];
