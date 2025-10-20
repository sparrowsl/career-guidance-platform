# Product Requirements Document (PRD)

## 1. Product Overview
An **AI-Powered Career Guidance Platform** that helps students discover career paths aligned with their aptitudes and market demand. The platform provides career recommendations, skill roadmaps, and access to learning resources.

---

## 2. Problem Statement
Students often make career decisions without reliable data, resulting in unemployment and a mismatch between graduate skills and market needs. Traditional career counseling is limited, expensive, and not scalable.

---

## 3. Objectives
- Provide students with **personalized career recommendations**.
- Bridge the gap between **education and job market demand**.
- Offer clear **skill acquisition pathways** linked to real opportunities.

---

## 4. Target Users
- **Students** (secondary, university, vocational).
- **Career counselors** and **educational institutions**.

---

## 5. Features (MVP)
- Student sign-up/login.
- Aptitude/interest quiz.
- Career recommendation dashboard.
- Suggested skills and learning resources.
- Simple admin panel for managing quizzes and data.

---

## 6. Features (Future)
- Real-time labor market insights.
- AI-driven career prediction engine.
- Integration with MOOCs and e-learning providers.
- Mentorship module (students connect with professionals).
- Mobile app version.

---

## 7. Tech Stack
- **Frontend**: Next.js 14, shadcn/ui, TailwindCSS.
- **Backend**: Next.js API routes (can scale to Node.js microservices later).
- **Database**: PostgreSQL (via Prisma ORM).
- **Auth**: NextAuth.js (with social logins).
- **AI Layer**: OpenAI API or HuggingFace models for recommendations.
- **Hosting**: Vercel (frontend/backend), Supabase or Railway for Postgres.

---

## 8. Success Metrics
- % of students completing aptitude quizzes.
- Engagement with career recommendations (click-throughs).
- Retention (students returning to track progress).
- Partnerships with institutions/learning providers.
