// Form Data Interfaces

export interface RegistrationData {
  name: string;
  email: string;
  company: string;
  role: string;
  eventSlug: string;
}

export interface EventSubmissionData {
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
  eventType: string;
  organizerName: string;
  organizerEmail: string;
  website?: string;
}

// Validation Functions
export function validateEmail(email: string): string {
  const trimmed = email.trim();
  if (!trimmed) return "Email is required";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(trimmed) ? "" : "Please enter a valid email address";
}

export function validateRequired(value: string, fieldName: string): string {
  return value.trim() ? "" : `${fieldName} is required`;
}

export function validateRegistrationData(data: Partial<RegistrationData>): Record<string, string> {
  const errors: Record<string, string> = {};
  
  if (!data.name?.trim()) errors.name = "Name is required";
  if (!data.company?.trim()) errors.company = "Company is required";
  if (!data.role?.trim()) errors.role = "Role is required";
  
  const emailError = validateEmail(data.email || "");
  if (emailError) errors.email = emailError;
  
  return errors;
}

export function validateEventSubmissionData(data: Partial<EventSubmissionData>): Record<string, string> {
  const errors: Record<string, string> = {};
  
  if (!data.title?.trim()) errors.title = "Event title is required";
  if (!data.description?.trim()) errors.description = "Event description is required";
  if (!data.date?.trim()) errors.date = "Please select a valid date";
  if (!data.location?.trim()) errors.location = "Location is required";
  if (!data.category) errors.category = "Please select a category";
  if (!data.eventType) errors.eventType = "Please select an event type";
  if (!data.organizerName?.trim()) errors.organizerName = "Organizer name is required";
  
  const emailError = validateEmail(data.organizerEmail || "");
  if (emailError) errors.organizerEmail = emailError;
  
  return errors;
}
