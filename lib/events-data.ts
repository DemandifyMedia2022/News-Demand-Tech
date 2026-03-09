// Event Types and Interfaces

export type EventType = 'In-Person' | 'Virtual' | 'Hybrid Event' | 'Workshop' | 'Networking';
export type EventCategory = 'AI & ML' | 'CXTeq' | 'HRTeq' | 'FinTeq' | 'MarTeq' | 'Tech Summit' | 'Networking';
export type EventStatus = 'upcoming' | 'past';

export interface Speaker {
  name: string;
  role: string;
  image: string | null;
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
}

export interface Photo {
  caption: string;
  description: string;
}

export interface BaseEvent {
  slug: string;
  type: EventStatus;
  title: string;
  date: string;
  location: string;
  venue: string;
  attendees: string;
  duration: string;
  eventType: EventType;
  category: EventCategory;
  organizer: string;
  website?: string;
  description: string;
  longDescription: string;
  whyAttend: string[];
  topics: string[];
  speakers: Speaker[];
}

export interface UpcomingEvent extends BaseEvent {
  type: 'upcoming';
}

export interface PastEvent extends BaseEvent {
  type: 'past';
  summary: string;
  keyTakeaways: string[];
  highlights: string[];
  testimonials?: Testimonial[];
  photos?: Photo[];
  videoRecap?: string;
}

export type Event = UpcomingEvent | PastEvent;

// Event Data
export const eventsData: Record<string, Event> = {
  "global-b2b-tech-summit-2025": {
    type: "upcoming",
    slug: "global-b2b-tech-summit-2025",
    title: "Global B2B Tech Summit 2025",
    date: "March 15-17, 2025",
    location: "San Francisco, CA",
    venue: "Moscone Center",
    attendees: "5,000+ Expected",
    duration: "3 Days",
    eventType: "Hybrid Event",
    category: "Tech Summit",
    organizer: "TechEvents Global",
    website: "https://example.com/tech-summit",
    description: "Join 5,000+ tech leaders, innovators, and decision-makers for three days of insights, networking, and hands-on workshops covering AI, CX, HR Tech, and the future of B2B.",
    longDescription: "The Global B2B Tech Summit is the premier event for technology leaders and innovators. This year's summit brings together the brightest minds in B2B technology to explore cutting-edge solutions, share insights, and forge meaningful connections that drive business forward.",
    whyAttend: [
      "Connect with 5,000+ industry leaders and decision-makers",
      "Discover the latest B2B technology trends and innovations",
      "Learn from 50+ expert speakers and thought leaders",
      "Explore solutions from 200+ exhibitors and sponsors",
      "Gain actionable insights to transform your business"
    ],
    topics: [
      "Artificial Intelligence & Machine Learning",
      "Customer Experience Technology",
      "HR Tech & Future of Work",
      "Digital Transformation",
      "Data Analytics & Business Intelligence",
      "Cloud Computing & Infrastructure"
    ],
    speakers: [
      { name: "Sarah Johnson", role: "CEO, TechCorp", image: null },
      { name: "Michael Chen", role: "CTO, InnovateLabs", image: null },
      { name: "Emily Rodriguez", role: "VP Product, DataSystems", image: null }
    ]
  },
  "ai-innovation-summit": {
    type: "upcoming",
    slug: "ai-innovation-summit",
    title: "AI Innovation Summit",
    date: "February 20, 2025",
    location: "New York, NY",
    venue: "Javits Center",
    attendees: "1,500+ Expected",
    duration: "1 Day",
    eventType: "In-Person",
    category: "AI & ML",
    organizer: "AI Leaders Forum",
    website: "https://example.com/ai-summit",
    description: "Explore cutting-edge AI applications and machine learning breakthroughs with industry pioneers.",
    longDescription: "The AI Innovation Summit brings together AI researchers, practitioners, and business leaders to explore the latest developments in artificial intelligence and machine learning.",
    whyAttend: [
      "Learn from 20+ AI experts and thought leaders",
      "See live demonstrations of cutting-edge AI solutions",
      "Network with AI practitioners and innovators",
      "Discover practical AI implementation strategies"
    ],
    topics: [
      "Generative AI & Large Language Models",
      "Machine Learning Operations (MLOps)",
      "AI Ethics & Responsible AI",
      "Computer Vision Applications",
      "Natural Language Processing"
    ],
    speakers: [
      { name: "Dr. James Wilson", role: "AI Research Lead, MIT", image: null },
      { name: "Lisa Park", role: "Head of ML, Google", image: null }
    ]
  },
  "cx-masterclass": {
    type: "upcoming",
    slug: "cx-masterclass",
    title: "Customer Experience Masterclass",
    date: "March 5, 2025",
    location: "Chicago, IL",
    venue: "McCormick Place",
    attendees: "500+ Expected",
    duration: "1 Day",
    eventType: "Workshop",
    category: "CXTeq",
    organizer: "CX Excellence Institute",
    website: "https://example.com/cx-masterclass",
    description: "Hands-on workshop on building exceptional customer experiences using modern CX platforms.",
    longDescription: "Learn from CX experts how to design, implement, and optimize customer experience strategies that drive loyalty and growth.",
    whyAttend: [
      "Master customer experience best practices",
      "Learn from successful CX case studies",
      "Get hands-on with leading CX platforms",
      "Network with CX professionals and leaders"
    ],
    topics: [
      "Customer Journey Mapping",
      "CX Metrics & Analytics",
      "Omnichannel Experience Design",
      "Voice of Customer Programs",
      "CX Technology Stack"
    ],
    speakers: [
      { name: "Amanda Foster", role: "CX Director, Salesforce", image: null },
      { name: "Robert Kim", role: "VP Customer Success, HubSpot", image: null }
    ]
  },
  "global-b2b-tech-summit-2024": {
    type: "past",
    slug: "global-b2b-tech-summit-2024",
    title: "Global B2B Tech Summit 2024",
    date: "November 15-17, 2024",
    location: "San Francisco, CA",
    venue: "Moscone Center",
    attendees: "4,500+ Attended",
    duration: "3 Days",
    eventType: "Hybrid Event",
    category: "Tech Summit",
    organizer: "TechEvents Global",
    description: "Over 4,500 attendees joined us for three days of innovation, networking, and insights into the future of B2B technology.",
    longDescription: "The 2024 Global B2B Tech Summit was our most successful event yet, bringing together industry leaders from around the world.",
    summary: "The 2024 Global B2B Tech Summit was our most successful event yet, bringing together industry leaders from around the world. Attendees experienced groundbreaking keynotes, participated in hands-on workshops, and made valuable connections that will shape the future of B2B technology.",
    keyTakeaways: [
      "AI adoption in B2B is accelerating faster than predicted",
      "Customer experience remains the top priority for tech leaders",
      "Remote work technologies continue to evolve and improve",
      "Data privacy and security are critical concerns",
      "Sustainability in tech is becoming a competitive advantage"
    ],
    highlights: [
      "45 Industry speakers shared their insights",
      "90+ Sessions covering all aspects of B2B tech",
      "4,500+ Attendees from 50+ countries",
      "180 Exhibitors showcasing innovations",
      "95% Attendee satisfaction rating"
    ],
    testimonials: [
      { name: "John Smith", role: "CTO, Enterprise Solutions", quote: "The best tech conference I've attended. The insights and connections I made were invaluable." },
      { name: "Maria Garcia", role: "VP Innovation, TechStart", quote: "Outstanding content and networking opportunities. Already looking forward to next year!" }
    ],
    photos: [
      { caption: "Opening Keynote", description: "CEO Sarah Johnson kicks off the summit" },
      { caption: "Workshop Sessions", description: "Hands-on learning with industry experts" },
      { caption: "Networking Event", description: "Attendees connect at the evening reception" }
    ],
    whyAttend: [],
    topics: [],
    speakers: []
  },
  "ai-automation-workshop-2024": {
    type: "past",
    slug: "ai-automation-workshop-2024",
    title: "AI & Automation Workshop",
    date: "October 8, 2024",
    location: "New York, NY",
    venue: "Tech Hub NYC",
    attendees: "250+ Attended",
    duration: "1 Day",
    eventType: "Workshop",
    category: "AI & ML",
    organizer: "AI Leaders Forum",
    description: "A hands-on workshop exploring practical AI implementations and automation strategies for modern businesses.",
    longDescription: "This intensive workshop provided participants with practical skills and knowledge to implement AI and automation in their organizations.",
    summary: "This intensive workshop provided participants with practical skills and knowledge to implement AI and automation in their organizations. Through hands-on exercises and real-world case studies, attendees learned how to leverage AI for business transformation.",
    keyTakeaways: [
      "AI implementation requires clear business objectives",
      "Start small and scale gradually with AI projects",
      "Data quality is crucial for AI success",
      "Change management is as important as technology",
      "ROI from AI can be measured and demonstrated"
    ],
    highlights: [
      "8 Hours of intensive hands-on training",
      "Real-world case studies from Fortune 500 companies",
      "Practical AI tools and frameworks",
      "Networking with AI practitioners",
      "Take-home implementation guide"
    ],
    testimonials: [
      { name: "David Lee", role: "Director of Innovation", quote: "Extremely practical and immediately applicable. I left with a clear roadmap for our AI initiatives." }
    ],
    whyAttend: [],
    topics: [],
    speakers: []
  }
};

// Utility Functions
export function getUpcomingEvents(): UpcomingEvent[] {
  return Object.values(eventsData).filter(e => e.type === 'upcoming') as UpcomingEvent[];
}

export function getPastEvents(): PastEvent[] {
  return Object.values(eventsData).filter(e => e.type === 'past') as PastEvent[];
}

export function getEventBySlug(slug: string): Event | null {
  return eventsData[slug] || null;
}

export function getFeaturedEvent(): UpcomingEvent | null {
  const upcoming = getUpcomingEvents();
  return upcoming[0] || null;
}

export function getEventsByCategory(category: EventCategory): Event[] {
  return Object.values(eventsData).filter(e => e.category === category);
}

export function getAllEvents(): Event[] {
  return Object.values(eventsData);
}
