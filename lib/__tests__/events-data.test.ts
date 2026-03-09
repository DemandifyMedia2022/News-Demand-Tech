/**
 * Property-Based Tests for Event Data Utilities
 * Feature: events-section, Property 1: Event card completeness
 * Feature: events-section, Property 19: Category filtering
 */

import * as fc from 'fast-check';
import {
  getUpcomingEvents,
  getPastEvents,
  getEventBySlug,
  getFeaturedEvent,
  getEventsByCategory,
  getAllEvents,
  type Event,
  type EventCategory,
  type UpcomingEvent,
  type PastEvent
} from '../events-data';

describe('Event Data Utilities - Property Tests', () => {
  const testConfig = { numRuns: 100 };

  describe('Property 1: Event card completeness', () => {
    it('should ensure all events have required fields for event cards', () => {
      fc.assert(
        fc.property(fc.constantFrom(...getAllEvents()), (event) => {
          // Every event must have all required fields for event cards
          return (
            typeof event.title === 'string' && event.title.length > 0 &&
            typeof event.date === 'string' && event.date.length > 0 &&
            typeof event.location === 'string' && event.location.length > 0 &&
            typeof event.eventType === 'string' && event.eventType.length > 0 &&
            typeof event.category === 'string' && event.category.length > 0 &&
            typeof event.description === 'string' && event.description.length > 0
          );
        }),
        testConfig
      );
    });

    it('should ensure upcoming events have all required fields', () => {
      const upcomingEvents = getUpcomingEvents();
      
      if (upcomingEvents.length === 0) {
        // Skip test if no upcoming events
        return;
      }

      fc.assert(
        fc.property(fc.constantFrom(...upcomingEvents), (event) => {
          return (
            event.type === 'upcoming' &&
            typeof event.title === 'string' && event.title.length > 0 &&
            typeof event.date === 'string' && event.date.length > 0 &&
            typeof event.location === 'string' && event.location.length > 0 &&
            typeof event.venue === 'string' && event.venue.length > 0 &&
            typeof event.attendees === 'string' && event.attendees.length > 0 &&
            typeof event.duration === 'string' && event.duration.length > 0 &&
            typeof event.eventType === 'string' && event.eventType.length > 0 &&
            typeof event.category === 'string' && event.category.length > 0 &&
            typeof event.description === 'string' && event.description.length > 0
          );
        }),
        testConfig
      );
    });

    it('should ensure past events have all required fields', () => {
      const pastEvents = getPastEvents();
      
      if (pastEvents.length === 0) {
        // Skip test if no past events
        return;
      }

      fc.assert(
        fc.property(fc.constantFrom(...pastEvents), (event) => {
          return (
            event.type === 'past' &&
            typeof event.title === 'string' && event.title.length > 0 &&
            typeof event.date === 'string' && event.date.length > 0 &&
            typeof event.location === 'string' && event.location.length > 0 &&
            typeof event.description === 'string' && event.description.length > 0 &&
            typeof event.summary === 'string' && event.summary.length > 0 &&
            Array.isArray(event.keyTakeaways) &&
            Array.isArray(event.highlights)
          );
        }),
        testConfig
      );
    });
  });

  describe('Property 19: Category filtering', () => {
    const categories: EventCategory[] = ['AI & ML', 'CXTeq', 'HRTeq', 'FinTeq', 'MarTeq', 'Tech Summit', 'Networking'];

    it('should return only events matching the specified category', () => {
      fc.assert(
        fc.property(fc.constantFrom(...categories), (category) => {
          const filtered = getEventsByCategory(category);
          // Every event in the filtered results must have the specified category
          return filtered.every(event => event.category === category);
        }),
        testConfig
      );
    });

    it('should return empty array for categories with no events', () => {
      // Test with a category that might not have events
      const filtered = getEventsByCategory('Networking' as EventCategory);
      // Result should be an array (possibly empty)
      expect(Array.isArray(filtered)).toBe(true);
    });

    it('should maintain event completeness after filtering', () => {
      fc.assert(
        fc.property(fc.constantFrom(...categories), (category) => {
          const filtered = getEventsByCategory(category);
          // All filtered events should still have complete data
          return filtered.every(event => 
            typeof event.title === 'string' && event.title.length > 0 &&
            typeof event.date === 'string' && event.date.length > 0 &&
            typeof event.location === 'string' && event.location.length > 0 &&
            event.category === category
          );
        }),
        testConfig
      );
    });
  });

  describe('Utility Functions - Basic Properties', () => {
    it('should return only upcoming events from getUpcomingEvents', () => {
      const upcoming = getUpcomingEvents();
      expect(upcoming.every(e => e.type === 'upcoming')).toBe(true);
    });

    it('should return only past events from getPastEvents', () => {
      const past = getPastEvents();
      expect(past.every(e => e.type === 'past')).toBe(true);
    });

    it('should return correct event by slug', () => {
      const allEvents = getAllEvents();
      
      if (allEvents.length === 0) return;

      fc.assert(
        fc.property(fc.constantFrom(...allEvents), (event) => {
          const retrieved = getEventBySlug(event.slug);
          return retrieved !== null && retrieved.slug === event.slug;
        }),
        testConfig
      );
    });

    it('should return null for non-existent slug', () => {
      const result = getEventBySlug('non-existent-event-slug-12345');
      expect(result).toBeNull();
    });

    it('should return an upcoming event or null from getFeaturedEvent', () => {
      const featured = getFeaturedEvent();
      if (featured !== null) {
        expect(featured.type).toBe('upcoming');
      }
    });

    it('should return all events from getAllEvents', () => {
      const all = getAllEvents();
      expect(Array.isArray(all)).toBe(true);
      expect(all.length).toBeGreaterThan(0);
    });
  });
});
