# Design Document

## Overview

The Events Section is a comprehensive feature that enables users to discover, browse, and engage with technology-focused events. The system consists of three main pages (events listing, event detail, and event submission) along with supporting components for registration, sharing, and newsletter integration. The design maintains strict consistency with the existing application's UI theme, utilizing the navy blue (#1e3a8a) color scheme, PT Sans font family, and established component patterns.

The architecture follows a component-based approach using Next.js 14+ with React Server Components where appropriate, and Client Components for interactive features. The design emphasizes performance, accessibility, and responsive design across all device sizes.

## Architecture

### High-Level Structure

```
src/app/
├── event/
│   ├── page.tsx                    # Events listing page (main events page)
│   └── [slug]/
│       └── page.tsx                # Event detail page (dynamic route)
│
components/
├── events/
│   ├── event-card.tsx              # Reusable event card component
│   ├── event-hero.tsx              # Hero section for events page
│   ├── featured-event-card.tsx     # Large featured event display
│   ├── event-registration-form.tsx # Registration modal
│   ├── event-submission-form.tsx   # Event submission modal
│   ├── share-modal.tsx             # Social sharing modal
│   ├── event-newsletter.tsx        # Newsletter subscription section
│   └── event-filters.tsx           # Category filter component
│
lib/
├── events-data.ts                  # Event data structure and mock data
└── events-utils.ts                 # Utility functions for events
```

### Technology Stack

- **Framework**: Next.js 14+ with App Router
- **UI Library**: React 18+
- **Styling**: Tailwind CSS with custom CSS variables
- **Icons**: Lucide React
- **Animations**: GSAP (consistent with existing components)
- **Type Safety**: TypeScript
- **State Management**: React hooks (useState, useEffect)
- **Forms**: Controlled components with validation

## Components and Interfaces

### Data Models

```typescript
// Event Type
type EventType = 'In-Person' | 'Virtual' | 'Hybrid Event' | 'Workshop' | 'Networking';

// Event Category
type EventCategory = 'AI & ML' | 'CXTeq' | 'HRTeq' | 'FinTeq' | 'MarTeq' | 'Tech Summit' | 'Networking';

// Event Status
type EventStatus = 'upcoming' | 'past';

// Base Event Interface
interface Event {
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

// Speaker Interface
interface Speaker {
  name: string;
  role: string;
  image: string | null;
}

// Past Event Extension
interface PastEvent extends Event {
  type: 'past';
  summary: string;
  keyTakeaways: string[];
  highlights: string[];
  testimonials?: Testimonial[];
  photos?: Photo[];
  videoRecap?: string;
}

// Testimonial Interface
interface Testimonial {
  name: string;
  role: string;
  quote: string;
}

// Photo Interface
interface Photo {
  caption: string;
  description: string;
}

// Registration Data
interface RegistrationData {
  name: string;
  email: string;
  company: string;
  role: string;
  eventSlug: string;
}

// Event Submission Data
interface EventSubmissionData {
  title: string;
  description: string;
  date: string;
  location: string;
  category: EventCategory;
  eventType: EventType;
  organizerName: string;
  organizerEmail: string;
  website?: string;
}
```

### Component Specifications

#### 1. Events Listing Page (`src/app/event/page.tsx`)

**Purpose**: Main landing page for events featuring hero section, featured event, upcoming events grid, past events section, and newsletter signup.

**Key Features**:
- Hero section with gradient background and CTA buttons
- Featured event card with prominent display
- Grid of upcoming event cards (3 columns on desktop)
- Past events section with completion badges
- Newsletter subscription integration
- Category filtering
- Responsive layout

**Props**: None (page component)

**State**:
- `showSubmissionForm`: boolean - controls event submission modal
- `selectedCategory`: string | null - active category filter

#### 2. Event Detail Page (`src/app/event/[slug]/page.tsx`)

**Purpose**: Displays comprehensive information about a specific event with conditional rendering based on event status (upcoming vs past).

**Key Features**:
- Dynamic route based on event slug
- Hero section with event metadata
- Conditional content (registration for upcoming, recap for past)
- Share functionality
- Back navigation to events listing
- SEO meta tags with Open Graph support

**Props**: 
- `params.slug`: string - event identifier from URL

**State**:
- `showRegistrationForm`: boolean - controls registration modal
- `showShareModal`: boolean - controls share modal

#### 3. Event Card Component (`components/events/event-card.tsx`)

**Purpose**: Reusable card component for displaying event summary information.

**Props**:
```typescript
interface EventCardProps {
  event: Event;
  featured?: boolean;
}
```

**Features**:
- Displays event image/icon placeholder
- Shows event type badge
- Displays category badge
- Shows date, location, and metadata
- Hover effects with scale and shadow transitions
- Gradient accent bar on hover
- Responsive sizing

#### 4. Event Registration Form (`components/events/event-registration-form.tsx`)

**Purpose**: Modal form for users to register for upcoming events.

**Props**:
```typescript
interface EventRegistrationFormProps {
  eventTitle: string;
  eventSlug: string;
  onClose: () => void;
}
```

**Features**:
- Modal overlay with backdrop blur
- Form fields: name, email, company, role
- Real-time validation
- Loading states
- Success/error feedback
- Keyboard navigation (ESC to close)
- Focus trap

#### 5. Event Submission Form (`components/events/event-submission-form.tsx`)

**Purpose**: Modal form for event organizers to submit events for listing.

**Props**:
```typescript
interface EventSubmissionFormProps {
  onClose: () => void;
}
```

**Features**:
- Modal overlay with backdrop blur
- Form fields: title, description, date, location, category, event type, organizer info
- Date picker integration
- Category and type dropdowns
- Real-time validation
- Loading states
- Success/error feedback

#### 6. Share Modal (`components/events/share-modal.tsx`)

**Purpose**: Modal for sharing event information on social media platforms.

**Props**:
```typescript
interface ShareModalProps {
  eventTitle: string;
  eventDescription: string;
  eventUrl: string;
  onClose: () => void;
}
```

**Features**:
- Social media buttons (Twitter, LinkedIn, Facebook, Email)
- Copy link functionality with clipboard API
- Pre-populated sharing text
- Visual feedback on copy
- Responsive layout

### Styling and Theme Integration

#### Color Scheme

```css
/* Primary Colors */
--primary: #1e3a8a;           /* Navy blue - main brand color */
--primary-hover: #1e40af;     /* Hover state */
--accent: #1e40af;            /* Accent color */
--accent-2: #2563eb;          /* Secondary accent */

/* Backgrounds */
--background: #F0F8FF;        /* Page background */
--surface: #ffffff;           /* Card surfaces */
--surface-2: rgba(248, 250, 252, 0.90);

/* Text */
--foreground: #000000;        /* Primary text */
--muted-foreground: rgba(0, 0, 0, 0.70); /* Secondary text */

/* UI Elements */
--border: rgba(0, 0, 0, 0.10);
--ring: rgba(30, 58, 138, 0.25);
```

#### Typography

```css
/* Font Family */
font-family: 'PT Sans', system-ui, -apple-system, sans-serif;

/* Headings */
h1: text-4xl sm:text-5xl md:text-6xl font-bold
h2: text-3xl sm:text-4xl font-bold
h3: text-xl sm:text-2xl font-bold

/* Body */
p: text-base sm:text-lg
small: text-sm
```

#### Component Patterns

**Cards**:
- Border radius: `rounded-2xl` (1rem) or `rounded-3xl` (1.5rem)
- Border: `border border-[color:var(--border)]`
- Background: `bg-white` or `bg-white/80`
- Shadow: `shadow-lg hover:shadow-2xl`
- Transition: `transition-all duration-300`

**Buttons**:
- Primary: `bg-[#1e3a8a] text-white hover:bg-[#1e40af]`
- Border radius: `rounded-xl` or `rounded-full`
- Padding: `px-6 py-3`
- Font: `font-semibold`

**Badges**:
- Border radius: `rounded-full`
- Padding: `px-3 py-1.5`
- Font: `text-xs font-bold`
- Background: Category-specific colors with opacity

**Animations**:
- Hover scale: `hover:scale-105` or `hover:-translate-y-1`
- Transition: `transition-all duration-300`
- GSAP for scroll animations (consistent with existing components)

## Data Models

### Event Data Storage

For the initial implementation, events will be stored in a TypeScript file (`lib/events-data.ts`) as a structured object. This allows for quick development and easy modification. Future iterations can migrate to a database or CMS.

```typescript
// lib/events-data.ts
export const eventsData: Record<string, Event | PastEvent> = {
  "global-b2b-tech-summit-2025": {
    type: "upcoming",
    title: "Global B2B Tech Summit 2025",
    // ... full event data
  },
  "ai-innovation-summit": {
    type: "upcoming",
    // ... event data
  },
  // ... more events
};

// Helper functions
export function getUpcomingEvents(): Event[] {
  return Object.values(eventsData).filter(e => e.type === 'upcoming');
}

export function getPastEvents(): PastEvent[] {
  return Object.values(eventsData).filter(e => e.type === 'past') as PastEvent[];
}

export function getEventBySlug(slug: string): Event | PastEvent | null {
  return eventsData[slug] || null;
}

export function getFeaturedEvent(): Event | null {
  // Return first upcoming event or manually designated featured event
  const upcoming = getUpcomingEvents();
  return upcoming[0] || null;
}

export function getEventsByCategory(category: EventCategory): Event[] {
  return Object.values(eventsData).filter(e => e.category === category);
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Event card completeness
*For any* event card rendered, the card should contain all required fields: title, date, location, event type, category, and description.
**Validates: Requirements 1.3**

### Property 2: Event detail metadata completeness
*For any* event detail page, the page should display all required metadata fields: date, location, duration, attendees count, and event type.
**Validates: Requirements 2.3**

### Property 3: Upcoming event registration availability
*For any* event with status "upcoming", the event detail page should display both registration and share buttons.
**Validates: Requirements 2.4**

### Property 4: Past event recap content
*For any* event with status "past", the event detail page should display summary, highlights, key takeaways, and statistics sections.
**Validates: Requirements 2.5, 7.4**

### Property 5: Valid registration processing
*For any* valid registration data (non-empty name, valid email format, non-empty company and role), the system should successfully process the registration without errors.
**Validates: Requirements 3.3**

### Property 6: Registration error handling
*For any* registration attempt that fails validation or processing, the system should display an appropriate error message.
**Validates: Requirements 3.5**

### Property 7: Valid event submission processing
*For any* valid event submission data (all required fields present and properly formatted), the system should successfully process the submission without errors.
**Validates: Requirements 4.3**

### Property 8: Submission error handling
*For any* event submission that fails validation or processing, the system should display an appropriate error message.
**Validates: Requirements 4.5**

### Property 9: Social sharing URL generation
*For any* social platform option (Twitter, LinkedIn, Facebook, Email), clicking should generate the correct sharing URL with pre-populated event information.
**Validates: Requirements 5.3**

### Property 10: Newsletter integration
*For any* valid email address submitted to the newsletter subscription, the system should integrate with the existing newsletter API endpoint.
**Validates: Requirements 6.2**

### Property 11: Newsletter error handling
*For any* newsletter subscription that fails, the system should display an error message.
**Validates: Requirements 6.5**

### Property 12: Past event completion badges
*For any* past event card displayed, the card should include a "Completed" or "Event Completed" badge.
**Validates: Requirements 7.2**

### Property 13: Gallery conditional rendering
*For any* past event where photos array exists and has length > 0, the event detail page should display an event gallery section.
**Validates: Requirements 7.5**

### Property 14: Font family consistency
*For any* event component rendered, the component should use the PT Sans font family.
**Validates: Requirements 8.1**

### Property 15: Color theme consistency
*For any* event component that applies the primary color, it should use #1e3a8a or var(--primary).
**Validates: Requirements 8.2**

### Property 16: Responsive design
*For any* event component, when rendered at mobile viewport widths (< 768px), the component should adapt its layout appropriately (single column, adjusted spacing).
**Validates: Requirements 8.5**

### Property 17: Featured event content completeness
*For any* featured event displayed, it should show all key event details (title, date, location, description) and a prominent call-to-action button.
**Validates: Requirements 9.3**

### Property 18: Category indicator presence
*For any* event card displayed, the card should show a category indicator badge.
**Validates: Requirements 10.2**

### Property 19: Category filtering
*For any* category selection, the filtered event list should contain only events matching that category.
**Validates: Requirements 10.3**

## Error Handling

### Form Validation Errors

**Registration Form**:
- Empty name: "Name is required"
- Invalid email: "Please enter a valid email address"
- Empty company: "Company is required"
- Empty role: "Role is required"

**Event Submission Form**:
- Empty title: "Event title is required"
- Empty description: "Event description is required"
- Invalid date: "Please select a valid date"
- Empty location: "Location is required"
- No category selected: "Please select a category"
- Empty organizer name: "Organizer name is required"
- Invalid organizer email: "Please enter a valid email address"

### API Errors

**Registration API** (`/api/events/register`):
- 400: "Invalid registration data"
- 409: "You are already registered for this event"
- 500: "Registration failed. Please try again later"

**Event Submission API** (`/api/events/submit`):
- 400: "Invalid event data"
- 500: "Submission failed. Please try again later"

**Newsletter API** (existing `/api/subscribe`):
- 400: "Invalid email address"
- 409: "This email is already subscribed"
- 500: "Subscription failed. Please try again later"

### Navigation Errors

**Event Not Found**:
- When accessing `/event/[slug]` with invalid slug, use Next.js `notFound()` to show 404 page
- Display user-friendly message: "Event not found"
- Provide link back to events listing

### User Feedback

**Success States**:
- Registration success: Green checkmark icon + "Successfully registered! Check your email for confirmation"
- Submission success: Green checkmark icon + "Event submitted successfully! We'll review it shortly"
- Newsletter success: Green checkmark icon + "Subscribed! You'll receive event updates"
- Copy link success: "Link copied to clipboard!"

**Loading States**:
- Button text changes: "Register Now" → "Registering..."
- Disable form inputs during submission
- Show loading spinner on buttons

**Error States**:
- Display error messages in red text below form fields
- Keep form data intact (don't clear on error)
- Focus on first error field

## Testing Strategy

### Unit Testing

**Component Tests**:
- EventCard: Renders all required fields, applies correct styling, handles click events
- EventRegistrationForm: Validates form inputs, handles submission, displays errors
- EventSubmissionForm: Validates form inputs, handles submission, displays errors
- ShareModal: Generates correct sharing URLs, copies to clipboard, handles close
- EventFilters: Filters events by category, shows active state, clears filters

**Utility Function Tests**:
- `getUpcomingEvents()`: Returns only upcoming events
- `getPastEvents()`: Returns only past events
- `getEventBySlug()`: Returns correct event or null
- `getFeaturedEvent()`: Returns first upcoming event
- `getEventsByCategory()`: Returns events matching category

### Property-Based Testing

The property-based tests will use **fast-check** library for TypeScript/JavaScript. Each test should run a minimum of 100 iterations.

**Test Configuration**:
```typescript
import fc from 'fast-check';

// Run each property test with 100 iterations
const testConfig = { numRuns: 100 };
```

**Property Test Examples**:

1. **Event Card Completeness** (Property 1):
```typescript
// Generate random events and verify all required fields are rendered
fc.assert(
  fc.property(eventArbitrary, (event) => {
    const rendered = render(<EventCard event={event} />);
    return (
      rendered.getByText(event.title) &&
      rendered.getByText(event.date) &&
      rendered.getByText(event.location) &&
      rendered.getByText(event.eventType) &&
      rendered.getByText(event.category) &&
      rendered.getByText(event.description)
    );
  }),
  testConfig
);
```

2. **Category Filtering** (Property 19):
```typescript
// For any category, filtered results should only contain that category
fc.assert(
  fc.property(categoryArbitrary, (category) => {
    const filtered = getEventsByCategory(category);
    return filtered.every(event => event.category === category);
  }),
  testConfig
);
```

**Test Generators (Arbitraries)**:
```typescript
// Event generator
const eventArbitrary = fc.record({
  slug: fc.string(),
  type: fc.constantFrom('upcoming', 'past'),
  title: fc.string({ minLength: 1 }),
  date: fc.date().map(d => d.toLocaleDateString()),
  location: fc.string({ minLength: 1 }),
  // ... other fields
});

// Category generator
const categoryArbitrary = fc.constantFrom(
  'AI & ML', 'CXTeq', 'HRTeq', 'FinTeq', 'MarTeq', 'Tech Summit', 'Networking'
);

// Registration data generator
const registrationDataArbitrary = fc.record({
  name: fc.string({ minLength: 1 }),
  email: fc.emailAddress(),
  company: fc.string({ minLength: 1 }),
  role: fc.string({ minLength: 1 }),
  eventSlug: fc.string()
});
```

### Integration Testing

**Page Tests**:
- Events listing page loads and displays events
- Event detail page loads with correct data
- Navigation between pages works correctly
- Modals open and close properly
- Forms submit and handle responses

**API Integration Tests**:
- Registration API endpoint processes valid data
- Event submission API endpoint processes valid data
- Newsletter API integration works correctly
- Error responses are handled appropriately

### Accessibility Testing

- Keyboard navigation works for all interactive elements
- Focus management in modals (focus trap, return focus on close)
- ARIA labels on buttons and form fields
- Color contrast meets WCAG AA standards
- Screen reader compatibility

### Responsive Testing

- Test at breakpoints: 320px, 768px, 1024px, 1440px
- Verify grid layouts adapt correctly
- Check touch targets are adequate size (min 44x44px)
- Test modal behavior on mobile devices

### Performance Testing

- Measure page load times
- Check image optimization
- Verify smooth animations (60fps)
- Test with throttled network conditions

## Implementation Notes

### Phase 1: Core Structure
1. Create page routes and basic layout
2. Implement event data structure
3. Build EventCard component
4. Create events listing page with grid layout

### Phase 2: Detail Pages
1. Implement event detail page with dynamic routing
2. Add conditional rendering for upcoming vs past events
3. Implement back navigation

### Phase 3: Interactive Features
1. Build registration form modal
2. Build event submission form modal
3. Implement share modal
4. Add form validation

### Phase 4: Integration
1. Integrate newsletter subscription
2. Add category filtering
3. Implement featured event logic
4. Add animations with GSAP

### Phase 5: Polish
1. Add loading states
2. Implement error handling
3. Optimize responsive design
4. Add accessibility features
5. Performance optimization

### Future Enhancements
- Backend API integration for dynamic event management
- User authentication for event organizers
- Calendar integration (Add to Google Calendar, iCal)
- Event search functionality
- Advanced filtering (date range, location, event type)
- Event reminders via email
- Attendee networking features
- Virtual event streaming integration
