# AI-Powered Career Guidance Platform

A comprehensive Next.js-based platform that helps students discover career paths aligned with their aptitudes, market demand, and provides AI-powered guidance through their career journey.

## Features

### Core Features
- **Student Registration**: Simple name and email signup (no authentication required)
- **Aptitude Quiz**: 12-question assessment covering 4 categories:
  - Analytical skills
  - Creative thinking
  - Technical aptitude
  - Interpersonal abilities
- **AI-Powered Career Matching**: Advanced recommendations using Vercel AI SDK with OpenAI
- **Career Dashboard**: Personalized career recommendations with:
  - Match percentage scores with reasoning
  - Career descriptions and market insights
  - Required skills with importance levels
  - Curated learning resources (courses, articles, videos)

### AI Features
- **AI Career Chat**: Real-time conversational AI assistant powered by Vercel AI SDK
  - Natural language career guidance
  - Personalized advice based on student profile
  - Streaming responses for better UX
- **AI Career Insights**: Intelligent career analysis with streaming output
  - Industry trends analysis
  - Skill gap identification
  - Career path recommendations
- **Structured AI Matching**: Type-safe career recommendations using Zod schemas
  - Key strengths identification
  - Development areas analysis
  - Match score calculations

### Progress & Learning
- **Progress Tracking**: Monitor learning journey
  - Track course completion
  - View learning statistics
  - Manage multiple resources
- **Goal Setting**: Set and track career goals
  - Create custom goals with deadlines
  - Mark goals as completed
  - Track active vs completed goals

### Market Intelligence
- **Labor Market Insights**: Real-time job market data
  - Job posting trends over time
  - Average salary information
  - Demand trend analysis (increasing/decreasing/stable)
  - Top skills in demand
  - Top hiring companies
  - Filter by career field

### Mentorship
- **Mentor Registration**: Professionals can sign up as mentors
  - Profile with expertise and experience
  - Availability management
  - Mentee capacity tracking
- **Mentorship Requests**: Connect students with mentors
  - Request mentorship with custom messages
  - Accept/reject workflow for mentors
  - Status tracking (pending/accepted/rejected/completed)
- **Mentor Dashboard**: Manage mentorship relationships
  - View pending requests
  - Respond to student inquiries
  - Track active mentees

### Administration
- **Admin Panel**: Comprehensive dashboard with:
  - Platform statistics (students, mentors, careers, skills)
  - Recent student registrations with activity counts
  - Recent mentor registrations
  - Mentorship request analytics
  - Goal progress tracking
  - Learning activity monitoring
  - Database status overview

### Demo Pages
- **AI Chat Demo**: Interactive demonstration of AI chat capabilities
- **Career Insights Demo**: Showcase of streaming AI insights
- **Career Match Demo**: Structured AI matching with Zod validation

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI Components**: shadcn/ui (Button, Card, Badge, Tabs, Input, etc.)
- **Styling**: Tailwind CSS
- **Database**: SQLite with Prisma ORM
- **AI/LLM**:
  - Vercel AI SDK
  - OpenAI GPT-4o-mini
  - Zod for schema validation
- **Icons**: lucide-react
- **State Management**: React Hooks (useState, useEffect)
- **API**: Next.js API Routes

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- OpenAI API key (for AI features)

### Environment Setup

1. Clone the repository and navigate to the project directory

2. Create a `.env` file in the root directory:
```bash
# Required for AI features
OPENAI_API_KEY=your_openai_api_key_here

# Optional: Database URL (defaults to SQLite)
DATABASE_URL="file:./dev.db"
```

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up the database:
```bash
# This creates the SQLite database and runs migrations
npx prisma migrate dev
```

3. Seed the database with initial data:
```bash
npm run seed
```

This will populate the database with:
- 12 aptitude quiz questions with scoring
- 6 career paths with detailed information
- 12+ professional skills
- Learning resources (courses, articles, videos)
- Sample market insights data
- Sample mentors (optional)

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000` (or the next available port).

### Verifying Installation

1. Visit `http://localhost:3000` - You should see the landing page
2. Navigate to `/admin` - Check database statistics
3. Try the demo pages at `/demo` to test AI features

## Usage

### For Students

1. **Get Started**: Click "Get Started" on the homepage
2. **Sign Up**: Enter your name and email (stored in localStorage)
3. **Take Quiz**: Answer 12 questions about your interests and skills
4. **View Dashboard**: See your personalized career recommendations with:
   - Match scores and detailed reasoning
   - Career details, salary, and growth information
   - Required skills with importance levels
   - Learning resources by skill
5. **Explore Additional Features**:
   - **Progress Page** (`/progress`): Track your learning and set career goals
   - **Market Insights** (`/market-insights`): Explore labor market trends
   - **Mentors** (`/mentors`): Browse and request mentorship
   - **AI Chat**: Get personalized career advice through AI conversation

### For Mentors

1. **Register**: Visit `/mentor/register` and create a mentor profile
2. **Dashboard**: Access your dashboard at `/mentor/dashboard`
3. **Manage Requests**:
   - View pending mentorship requests
   - Accept or decline with custom responses
   - Track active mentees
   - Mark completed mentorships

### For Administrators

Visit `/admin` to access the comprehensive admin panel:
- **Overview Statistics**: Students, mentors, careers, skills, resources
- **Student Analytics**: Recent registrations with activity metrics
- **Mentor Analytics**: Recent mentor sign-ups and request counts
- **Mentorship Overview**: Request status breakdown (pending/accepted/rejected)
- **Goal Progress**: Track student goal completion rates
- **Learning Progress**: Monitor student learning activities
- **Database Status**: System health and data availability checks

## Project Structure

```
career-guidance-platform/
├── prisma/
│   ├── schema.prisma              # Database schema (14 models)
│   ├── seed.ts                    # Database seed script
│   └── migrations/                # Database migrations
├── src/
│   ├── app/
│   │   ├── page.tsx                      # Landing page
│   │   ├── start/page.tsx                # Student registration
│   │   ├── quiz/page.tsx                 # Aptitude quiz
│   │   ├── dashboard/page.tsx            # Career recommendations dashboard
│   │   ├── progress/page.tsx             # Progress tracking & goals
│   │   ├── market-insights/page.tsx      # Labor market data
│   │   ├── mentors/page.tsx              # Browse mentors
│   │   ├── admin/page.tsx                # Admin panel
│   │   ├── mentor/
│   │   │   ├── register/page.tsx         # Mentor registration
│   │   │   └── dashboard/page.tsx        # Mentor dashboard
│   │   ├── demo/
│   │   │   ├── page.tsx                  # Demo hub
│   │   │   ├── chat/page.tsx             # AI chat demo
│   │   │   ├── insights/page.tsx         # AI insights demo
│   │   │   └── career-match/page.tsx     # Structured AI matching demo
│   │   └── api/                          # API routes
│   │       ├── students/route.ts         # Student CRUD
│   │       ├── careers/route.ts          # Career data
│   │       ├── mentors/                  # Mentor endpoints
│   │       ├── quiz/
│   │       │   ├── questions/route.ts    # Fetch quiz questions
│   │       │   └── submit/route.ts       # Submit quiz answers
│   │       ├── recommendations/route.ts   # Career recommendations
│   │       ├── progress/route.ts         # Learning progress
│   │       ├── goals/                    # Goal management
│   │       ├── market-insights/route.ts  # Market data
│   │       ├── mentorship-requests/      # Mentorship endpoints
│   │       ├── admin/
│   │       │   └── stats/route.ts        # Admin statistics
│   │       └── ai/                       # AI-powered endpoints
│   │           ├── chat/route.ts         # Streaming AI chat
│   │           ├── insights/route.ts     # Streaming insights
│   │           └── career-match/route.ts # Structured matching
│   ├── components/
│   │   ├── ui/                           # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── input.tsx
│   │   │   ├── progress.tsx
│   │   │   └── ... (other UI components)
│   │   ├── navigation-header.tsx         # App navigation
│   │   ├── career-chat.tsx               # AI chat component
│   │   └── career-insights.tsx           # AI insights component
│   └── lib/
│       ├── prisma.ts                     # Prisma client singleton
│       ├── types.ts                      # Centralized TypeScript types
│       ├── ai.ts                         # AI configuration & models
│       ├── openai.ts                     # OpenAI helper functions
│       └── utils.ts                      # Utility functions
├── .env                                   # Environment variables
├── package.json                          # Dependencies & scripts
├── tsconfig.json                         # TypeScript configuration
├── tailwind.config.ts                    # Tailwind CSS config
└── next.config.js                        # Next.js configuration
```

## Database Schema

The platform uses Prisma ORM with SQLite (easily swappable to PostgreSQL/MySQL). Key models:

### Core Models
- **Student**: User profiles with relationships to responses, recommendations, progress, goals
- **QuizQuestion**: Quiz questions with categories, weights, and display order
- **QuestionOption**: Multiple choice options with scoring weights
- **StudentResponse**: Student answers linked to questions and options

### Career Data
- **Career**: Career information, salary data, growth rates, demand levels
- **Skill**: Professional skills with categories (technical, soft, domain-specific)
- **CareerSkill**: Many-to-many relationship with importance levels

### Recommendations & Learning
- **StudentRecommendation**: AI-generated matches with reasoning and scores
- **LearningResource**: Courses, articles, videos, books with URLs and metadata
- **StudentProgress**: Learning activity tracking with completion percentages

### Goals & Growth
- **Goal**: Student career goals with target dates and status tracking

### Mentorship
- **Mentor**: Mentor profiles with experience, availability, and capacity
- **MentorshipRequest**: Connection requests with messages and status workflow

### Market Intelligence
- **MarketInsight**: Labor market data with job postings, salaries, trends, top skills

## API Endpoints

### Student Management
- `POST /api/students` - Create or find student profile
  - Body: `{ name: string, email: string }`
  - Returns: Student object with ID

### Quiz System
- `GET /api/quiz/questions` - Fetch all quiz questions with options
  - Returns: Array of questions with nested options
- `POST /api/quiz/submit` - Submit quiz answers and generate recommendations
  - Body: `{ studentId: string, answers: [{ questionId, optionId }] }`
  - Returns: Success status, generates recommendations

### Recommendations
- `GET /api/recommendations?studentId=<id>` - Get student's career recommendations
  - Returns: Recommendations with career details, skills, and resources

### Career Data
- `GET /api/careers` - List all careers
  - Returns: Array of career objects
- `GET /api/careers/[id]` - Get specific career details
  - Returns: Career with skills and resources

### Progress & Goals
- `GET /api/progress?studentId=<id>` - Get student's learning progress
  - Returns: Array of progress items with resources
- `POST /api/progress` - Create progress entry
  - Body: `{ studentId, resourceId, status, progressPercent }`
- `PATCH /api/progress/[id]` - Update progress
  - Body: `{ status, progressPercent, completedAt }`

- `GET /api/goals?studentId=<id>` - Get student's goals
  - Returns: Array of goal objects
- `POST /api/goals` - Create new goal
  - Body: `{ studentId, title, description, targetDate }`
- `PATCH /api/goals/[id]` - Update goal
  - Body: `{ status, title, description, targetDate }`
- `DELETE /api/goals/[id]` - Delete goal

### Market Insights
- `GET /api/market-insights?careerId=<id>` - Get market data for career
  - Returns: Array of monthly insights with trends

### Mentorship
- `GET /api/mentors` - List all mentors
  - Returns: Array of mentor profiles with career info
- `POST /api/mentors` - Register as mentor
  - Body: Mentor profile data
- `GET /api/mentors/[id]` - Get mentor details

- `GET /api/mentorship-requests?mentorId=<id>` - Get requests for mentor
  - Returns: Array of mentorship requests with student info
- `GET /api/mentorship-requests?studentId=<id>` - Get student's requests
- `POST /api/mentorship-requests` - Create mentorship request
  - Body: `{ studentId, mentorId, message }`
- `PATCH /api/mentorship-requests/[id]` - Update request status
  - Body: `{ status, response }`

### Administration
- `GET /api/admin/stats` - Get comprehensive platform statistics
  - Returns: Dashboard data with counts, recent activity, analytics

### AI-Powered Endpoints
- `POST /api/ai/chat` - Streaming AI chat conversation
  - Body: `{ messages: [{ role, content }] }`
  - Returns: Streaming text response
  - Uses: Vercel AI SDK with OpenAI

- `POST /api/ai/insights` - Streaming career insights
  - Body: `{ careerTitle, studentStrengths, industryTrends }`
  - Returns: Streaming analysis
  - Uses: AI SDK streaming

- `POST /api/ai/career-match` - Structured career matching
  - Body: `{ studentName, categoryScores, careers }`
  - Returns: Typed recommendations with Zod validation
  - Uses: `generateObject()` for structured output

## Recommendation Algorithm

The platform uses a multi-layered approach:

### Basic Scoring (Quiz Submit)
1. Calculate average scores per category (analytical, creative, technical, interpersonal)
2. Match student category strengths with career categories
3. Apply demand level boosters for high-demand careers
4. Generate top 5 recommendations with reasoning

### AI-Enhanced Matching (Optional)
Using Vercel AI SDK with OpenAI:
- **Structured Recommendations**: Uses `generateObject()` with Zod schemas for type-safe outputs
- **Personalized Analysis**: AI analyzes student strengths and career requirements
- **Development Roadmap**: AI suggests skills to develop for each career path
- **Natural Conversation**: Chat interface for exploratory career guidance

## TypeScript Type System

All TypeScript types are centralized in `src/lib/types.ts` for consistency and reusability:

### Component Props
- `NavigationHeaderProps` - Navigation component properties

### Domain Types
- `Career`, `Skill`, `LearningResource`, `Question` - Core entities
- `Recommendation` - Career recommendations with nested relationships
- `StudentProgress`, `Goal` - Learning and goal tracking
- `MentorshipRequest` - Mentorship workflow
- `MarketInsight` - Labor market data
- `AdminStats` - Admin dashboard statistics
- `CareerRecommendation` - AI-generated recommendations

### Zod Schemas
- `careerRecommendationSchema` - Runtime validation for AI outputs

All files import types from `@/lib/types`, ensuring a single source of truth.

## AI Configuration

### AI Models (`src/lib/ai.ts`)

The platform uses Vercel AI SDK with multiple model configurations:

```typescript
models = {
  fast: openai('gpt-4o-mini'),      // Quick responses
  smart: openai('gpt-4o-mini'),     // Complex reasoning
  balanced: openai('gpt-4o-mini')   // General purpose
}
```

### System Prompts
- **Career Counselor**: Empathetic guidance for students
- **Career Analyst**: Structured career analysis
- **Mentor**: Supportive mentorship conversations

### Features
- **Streaming**: Real-time response streaming for better UX
- **Type Safety**: Zod schemas ensure AI outputs match TypeScript types
- **Error Handling**: Graceful fallbacks when AI is unavailable

## Page Routes

### Public Pages
- `/` - Landing page with platform overview
- `/start` - Student registration
- `/quiz` - Aptitude assessment
- `/dashboard` - Career recommendations (requires studentId)

### Student Features
- `/progress` - Learning progress and goal tracking
- `/market-insights` - Labor market data and trends
- `/mentors` - Browse available mentors

### Mentor Pages
- `/mentor/register` - Mentor sign-up
- `/mentor/dashboard` - Manage mentorship requests

### Admin
- `/admin` - Platform analytics and management

### Demo Pages
- `/demo` - AI features showcase hub
- `/demo/chat` - AI chat demonstration
- `/demo/insights` - Career insights streaming
- `/demo/career-match` - Structured AI matching

## Future Enhancements

### Completed ✅
- ✅ AI-powered recommendations using OpenAI
- ✅ Mentorship module with request workflow
- ✅ Progress tracking with goals
- ✅ Real-time labor market insights
- ✅ Streaming AI chat interface

### Planned 🚀
- **Authentication**: Full auth system with NextAuth.js or Clerk
- **Notifications**: Email/push notifications for mentorship and goals
- **Advanced Analytics**: Student success metrics and career outcomes
- **Mobile App**: React Native version
- **MOOC Integration**: Direct enrollment in Coursera, Udemy, etc.
- **Video Calls**: Integrated mentorship video sessions
- **Assessment Tools**: Personality tests (MBTI, Big Five)
- **Resume Builder**: AI-powered resume creation
- **Job Board**: Direct job postings integration
- **Community**: Forums and student networking

## Scripts

### Development
```bash
npm run dev          # Start development server (with hot reload)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Database
```bash
npm run seed                    # Seed database with initial data
npx prisma studio              # Open Prisma Studio (database GUI)
npx prisma migrate dev         # Create and apply migrations
npx prisma migrate reset       # Reset database and run all migrations
npx prisma generate            # Generate Prisma Client
npx prisma db push             # Push schema changes without migrations
```

### Useful Commands
```bash
# View database in browser
npx prisma studio

# Format Prisma schema
npx prisma format

# Check for schema issues
npx prisma validate
```

## Database Management

### View and Edit Data
Open Prisma Studio to view and edit database records:
```bash
npx prisma studio
```
Access at `http://localhost:5555`

### Reset Database
If you need to start fresh:
```bash
npx prisma migrate reset    # Resets DB and runs migrations
npm run seed                # Re-populate with sample data
```

### Database Location
SQLite database is stored at:
- `prisma/dev.db` - Main database
- `prisma/dev.db-journal` - Transaction journal

## Troubleshooting

### AI Features Not Working
- Check that `OPENAI_API_KEY` is set in `.env`
- Verify API key is valid with OpenAI
- Check API usage limits and billing

### Database Errors
```bash
# If migrations fail
npx prisma migrate reset
npx prisma migrate dev

# If Prisma Client is out of sync
npx prisma generate
```

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use a different port
npm run dev -- -p 3001
```

## Development Tips

### Type Safety
- All types are centralized in `src/lib/types.ts`
- Import types with: `import { TypeName } from '@/lib/types'`
- Prisma generates types automatically from schema

### AI Testing
- Use demo pages (`/demo`) to test AI features without setup
- Monitor token usage in browser console
- Adjust model settings in `src/lib/ai.ts`

### Database Seeding
- Modify `prisma/seed.ts` to customize initial data
- Run `npm run seed` after changes
- Use Prisma Studio to verify data

### Hot Reload
- Next.js automatically reloads on file changes
- Prisma Client regenerates on schema changes
- Restart server if `.env` changes

## Environment Variables

Create a `.env` file with:

```bash
# Required for AI features
OPENAI_API_KEY=sk-...

# Database (optional, defaults to SQLite)
DATABASE_URL="file:./dev.db"

# Next.js (optional)
NODE_ENV=development
```

## Performance Considerations

- **Database**: SQLite is fine for development; use PostgreSQL for production
- **AI Calls**: Implement rate limiting for production
- **Caching**: Consider caching API responses for market insights
- **Images**: Optimize images with Next.js Image component
- **Bundle Size**: Monitor with `npm run build` and analyze bundle

## Security Notes

⚠️ **Important**: This is a development/demo application:

- No authentication system (localStorage only)
- API routes are unprotected
- No rate limiting implemented
- Suitable for demos and prototypes only

For production deployment:
1. Implement proper authentication (NextAuth.js, Clerk, etc.)
2. Add API route protection and rate limiting
3. Use environment-specific configurations
4. Implement proper error logging
5. Add input validation and sanitization
6. Use PostgreSQL or another production database

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Docker
```bash
# Build image
docker build -t career-guidance-platform .

# Run container
docker run -p 3000:3000 career-guidance-platform
```

### Database for Production
Switch to PostgreSQL:
1. Update `DATABASE_URL` in `.env`
2. Run `npx prisma migrate dev`
3. Deploy with managed PostgreSQL (Neon, Supabase, Railway)

## License

ISC

## Tech Stack Summary

- **Framework**: Next.js 15 (App Router) with React 19
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS with shadcn/ui components
- **Database**: Prisma ORM with SQLite (dev) / PostgreSQL (prod)
- **AI/ML**: Vercel AI SDK with OpenAI GPT-4o-mini
- **Validation**: Zod for schema validation
- **Icons**: Lucide React
- **State**: React Hooks (no external state management)

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes with clear commit messages
4. Test thoroughly
5. Submit a pull request

## Support

For issues, questions, or feedback:
- Open an issue on GitHub
- Check existing issues for solutions
- Review the troubleshooting section above

---

Built with ❤️ using Next.js, Prisma, Vercel AI SDK, and shadcn/ui.
