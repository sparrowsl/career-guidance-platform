import { z } from 'zod';

// ============================================================================
// COMPONENT PROPS TYPES
// ============================================================================

export interface NavigationHeaderProps {
  userName?: string;
  showLogout?: boolean;
  userType?: 'student' | 'mentor' | 'admin';
}

// ============================================================================
// CORE DOMAIN TYPES
// ============================================================================

export type Career = {
  id: string;
  title: string;
  description: string;
  averageSalary: string | null;
  jobGrowthRate: string | null;
  requiredEducation: string | null;
  category: string;
  demandLevel: string;
};

export type Skill = {
  id: string;
  name: string;
  description: string | null;
  category: string;
};

export type LearningResource = {
  id: string;
  title: string;
  url: string;
  type: string;
  provider: string | null;
  isFree: boolean;
};

export type Question = {
  id: string;
  question: string;
  category: string;
  options: {
    id: string;
    text: string;
    score: number;
  }[];
};

// ============================================================================
// DASHBOARD TYPES
// ============================================================================

export type Recommendation = {
  id: string;
  matchScore: number;
  reasoning: string;
  career: Career & {
    skills: {
      skill: Skill & {
        resources: LearningResource[];
      };
      importance: string;
    }[];
  };
};

// ============================================================================
// PROGRESS & GOALS TYPES
// ============================================================================

export interface StudentProgress {
  id: string;
  status: string;
  progressPercent: number;
  startedAt: string;
  completedAt?: string;
  resource: {
    id: string;
    title: string;
    type: string;
    provider: string | null;
    url: string;
    skill: {
      name: string;
      category: string;
    };
  };
}

export interface Goal {
  id: string;
  title: string;
  description?: string;
  targetDate?: string;
  status: string;
  createdAt: string;
}

// ============================================================================
// MARKET INSIGHTS TYPES
// ============================================================================

export interface MarketInsight {
  month: string;
  jobPostings: number;
  avgSalary: number | null;
  demandTrend: string;
  topSkills: string;
  topCompanies: string | null;
}

// ============================================================================
// MENTORSHIP TYPES
// ============================================================================

export interface MentorshipRequest {
  id: string;
  status: string;
  message?: string;
  response?: string;
  createdAt: string;
  student: {
    id: string;
    name: string;
    email: string;
  };
}

// ============================================================================
// ADMIN TYPES
// ============================================================================

export type AdminStats = {
  totalStudents: number;
  totalCareers: number;
  totalQuestions: number;
  totalSkills: number;
  totalMentors: number;
  totalMentorshipRequests: number;
  totalGoals: number;
  totalProgress: number;
  totalResources: number;
  recentStudents: {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    _count: {
      responses: number;
      recommendations: number;
      goals: number;
      progress: number;
    };
  }[];
  recentMentors: {
    id: string;
    name: string;
    email: string;
    title: string;
    company: string | null;
    createdAt: string;
    career: {
      title: string;
    };
    _count: {
      mentorshipRequests: number;
    };
  }[];
  mentorshipStats: {
    status: string;
    _count: number;
  }[];
  goalStats: {
    status: string;
    _count: number;
  }[];
  progressStats: {
    status: string;
    _count: number;
  }[];
};

// ============================================================================
// AI & CAREER MATCH TYPES
// ============================================================================

export interface CareerRecommendation {
  careerId: string;
  matchScore: number;
  reasoning: string;
  keyStrengths: string[];
  developmentAreas: string[];
}

// ============================================================================
// ZOD SCHEMAS
// ============================================================================

export const careerRecommendationSchema = z.object({
  recommendations: z.array(
    z.object({
      careerId: z.string().describe('The ID of the recommended career'),
      matchScore: z.number().min(0).max(100).describe('Match score from 0-100'),
      reasoning: z.string().describe('Explanation of why this career matches the student'),
      keyStrengths: z.array(z.string()).describe('Key strengths that align with this career'),
      developmentAreas: z.array(z.string()).describe('Areas to develop for this career'),
    })
  ),
});
