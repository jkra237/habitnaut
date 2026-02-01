// Import data validation using Zod
// Prevents malicious or malformed data from corrupting application state

import { z } from 'zod';

// Maximum limits for imported data
const MAX_HABITS = 1000;
const MAX_ENTRIES = 5000;
const MAX_REFLECTIONS = 500;
const MAX_GRATITUDE_ENTRIES = 5000;
const MAX_STRING_LENGTH = 500;
const MAX_NAME_LENGTH = 100;
const MAX_EMOJI_LENGTH = 10;

// Date format validation (YYYY-MM-DD)
const dateStringSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format');

// Sanitize strings to prevent XSS (remove script tags and event handlers)
const sanitizeString = (str: string): string => {
  return str
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .replace(/<[^>]*>/g, '')
    .trim();
};

// Custom string schema with sanitization
const sanitizedString = (maxLength: number) => 
  z.string().max(maxLength).transform(sanitizeString);

// Personality profile schema - all fields required when profile exists
const PersonalityProfileSchema = z.object({
  rhythm: z.enum(['morning', 'evening', 'flexible']),
  energy: z.enum(['steady', 'bursts', 'waves']),
  motivation: z.enum(['internal', 'external', 'mixed']),
  approach: z.enum(['structured', 'spontaneous', 'adaptive']),
  focus: z.enum(['deep', 'varied', 'contextual']),
  recovery: z.enum(['solitude', 'social', 'mixed']),
  pace: z.enum(['slow', 'moderate', 'fast']),
}).optional();

// Habit schema
const HabitSchema = z.object({
  id: z.string().max(100),
  name: sanitizedString(MAX_NAME_LENGTH),
  description: sanitizedString(MAX_STRING_LENGTH).optional(),
  emoji: z.string().max(MAX_EMOJI_LENGTH).optional(),
  timeAnchor: z.enum(['morning', 'midday', 'evening', 'none']).optional().default('none'),
  softFrequency: z.enum(['daily', 'few-times-week', 'free']).optional().default('free'),
  createdAt: z.union([z.string(), z.date()]).optional(),
  isResting: z.boolean().optional().default(false),
  restingNote: sanitizedString(MAX_STRING_LENGTH).optional(),
}).passthrough(); // Allow additional fields for forward compatibility

// Habit state schema
const HabitStateSchema = z.enum(['done', 'not-done', 'conscious-skip']);

// Day entry schema
const DayEntrySchema = z.object({
  date: dateStringSchema,
  habits: z.record(z.string(), HabitStateSchema).optional().default({}),
  mood: z.number().min(1).max(5).optional(),
  energy: z.number().min(1).max(5).optional(),
  note: sanitizedString(MAX_STRING_LENGTH).optional(),
}).passthrough();

// Week reflection schema
const WeekReflectionSchema = z.object({
  weekStart: dateStringSchema,
  word: sanitizedString(MAX_NAME_LENGTH).optional(),
  takeaway: sanitizedString(MAX_STRING_LENGTH).optional(),
}).passthrough();

// Gratitude entry schema
const GratitudeEntrySchema = z.object({
  id: z.string().max(100),
  date: dateStringSchema,
  text: sanitizedString(MAX_STRING_LENGTH),
  createdAt: z.string().optional(),
}).passthrough();

// App preferences schema
const AppPreferencesSchema = z.object({
  language: z.string().max(10).optional(),
  insightFrequency: z.enum(['rare', 'occasional', 'weekly']).optional(),
  weekStart: z.enum(['monday', 'sunday']).optional(),
}).passthrough();

// Full import data schema
const ImportDataSchema = z.object({
  personality: PersonalityProfileSchema.optional(),
  habits: z.array(HabitSchema).max(MAX_HABITS).optional(),
  entries: z.array(DayEntrySchema).max(MAX_ENTRIES).optional(),
  reflections: z.array(WeekReflectionSchema).max(MAX_REFLECTIONS).optional(),
  gratitudeEntries: z.array(GratitudeEntrySchema).max(MAX_GRATITUDE_ENTRIES).optional(),
  preferences: AppPreferencesSchema.optional(),
  exportedAt: z.string().optional(),
}).passthrough();

export type ValidatedImportData = z.infer<typeof ImportDataSchema>;

export interface ValidationResult {
  success: boolean;
  data?: ValidatedImportData;
  error?: string;
}

/**
 * Validate and sanitize imported JSON data
 * Returns validated data or an error message
 */
export function validateImportData(jsonData: string): ValidationResult {
  // Parse JSON
  let rawData: unknown;
  try {
    rawData = JSON.parse(jsonData);
  } catch {
    return { success: false, error: 'Could not parse the file. Please ensure it is valid JSON.' };
  }

  // Basic structure check
  if (!rawData || typeof rawData !== 'object') {
    return { success: false, error: 'Invalid data format. Expected an object.' };
  }

  // Validate against schema
  const result = ImportDataSchema.safeParse(rawData);
  
  if (!result.success) {
    // Extract first error for user-friendly message
    const firstError = result.error.errors[0];
    const path = firstError?.path?.join('.') || 'data';
    const message = firstError?.message || 'Invalid data';
    
    return { 
      success: false, 
      error: `Invalid ${path}: ${message}` 
    };
  }

  return { success: true, data: result.data };
}
