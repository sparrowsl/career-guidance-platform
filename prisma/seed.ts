import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting database seed...')

  // Clear existing data
  await prisma.studentResponse.deleteMany()
  await prisma.studentRecommendation.deleteMany()
  await prisma.mentorshipRequest.deleteMany()
  await prisma.mentor.deleteMany()
  await prisma.goal.deleteMany()
  await prisma.studentProgress.deleteMany()
  await prisma.marketInsight.deleteMany()
  await prisma.questionOption.deleteMany()
  await prisma.quizQuestion.deleteMany()
  await prisma.learningResource.deleteMany()
  await prisma.careerSkill.deleteMany()
  await prisma.skill.deleteMany()
  await prisma.career.deleteMany()
  await prisma.student.deleteMany()

  console.log('Cleared existing data')

  // Create Quiz Questions
  const questions = [
    {
      question: "How do you prefer to solve complex problems?",
      category: "analytical",
      weight: 1.0,
      order: 1,
      options: [
        { text: "Break them down into smaller, logical steps", score: 5 },
        { text: "Use data and statistics to find patterns", score: 4 },
        { text: "Think creatively and try unconventional approaches", score: 2 },
        { text: "Collaborate with others to brainstorm solutions", score: 2 },
      ]
    },
    {
      question: "When working on a project, what excites you most?",
      category: "creative",
      weight: 1.0,
      order: 2,
      options: [
        { text: "Creating something visually appealing or unique", score: 5 },
        { text: "Coming up with innovative ideas and concepts", score: 4 },
        { text: "Following a structured plan to completion", score: 2 },
        { text: "Analyzing data and optimizing performance", score: 1 },
      ]
    },
    {
      question: "Which statement best describes you?",
      category: "technical",
      weight: 1.0,
      order: 3,
      options: [
        { text: "I enjoy learning how things work technically", score: 5 },
        { text: "I like building and fixing things", score: 4 },
        { text: "I prefer working with people over machines", score: 1 },
        { text: "I'm more interested in ideas than implementation", score: 2 },
      ]
    },
    {
      question: "In a team setting, you naturally tend to:",
      category: "interpersonal",
      weight: 1.0,
      order: 4,
      options: [
        { text: "Lead and organize the group", score: 5 },
        { text: "Help resolve conflicts and keep morale high", score: 4 },
        { text: "Focus on your individual tasks", score: 2 },
        { text: "Provide technical expertise when needed", score: 2 },
      ]
    },
    {
      question: "What type of challenges do you enjoy most?",
      category: "analytical",
      weight: 1.0,
      order: 5,
      options: [
        { text: "Puzzles and logic problems", score: 5 },
        { text: "Research and investigation", score: 4 },
        { text: "Creative design challenges", score: 2 },
        { text: "Interpersonal negotiations", score: 1 },
      ]
    },
    {
      question: "How do you approach learning something new?",
      category: "technical",
      weight: 1.0,
      order: 6,
      options: [
        { text: "Hands-on experimentation and practice", score: 5 },
        { text: "Reading documentation and tutorials", score: 4 },
        { text: "Watching others and asking questions", score: 3 },
        { text: "Theoretical understanding before application", score: 3 },
      ]
    },
    {
      question: "What environment helps you work best?",
      category: "interpersonal",
      weight: 1.0,
      order: 7,
      options: [
        { text: "Collaborative, with lots of team interaction", score: 5 },
        { text: "Flexible, with a mix of solo and group work", score: 4 },
        { text: "Quiet, where I can focus independently", score: 2 },
        { text: "Structured, with clear guidelines", score: 2 },
      ]
    },
    {
      question: "Which activity sounds most appealing?",
      category: "creative",
      weight: 1.0,
      order: 8,
      options: [
        { text: "Designing a website or app interface", score: 5 },
        { text: "Writing content or storytelling", score: 4 },
        { text: "Analyzing market trends", score: 2 },
        { text: "Coding a new software feature", score: 2 },
      ]
    },
    {
      question: "When making decisions, you rely most on:",
      category: "analytical",
      weight: 1.0,
      order: 9,
      options: [
        { text: "Facts, data, and logical reasoning", score: 5 },
        { text: "Past experiences and patterns", score: 4 },
        { text: "Intuition and gut feeling", score: 2 },
        { text: "Input from others and consensus", score: 2 },
      ]
    },
    {
      question: "What kind of impact do you want to make?",
      category: "interpersonal",
      weight: 1.0,
      order: 10,
      options: [
        { text: "Help people directly through service or teaching", score: 5 },
        { text: "Build communities and foster connections", score: 4 },
        { text: "Create innovative products or solutions", score: 2 },
        { text: "Advance knowledge in a specific field", score: 2 },
      ]
    },
    {
      question: "Which skill would you most like to develop?",
      category: "technical",
      weight: 1.0,
      order: 11,
      options: [
        { text: "Programming and software development", score: 5 },
        { text: "Data analysis and statistics", score: 4 },
        { text: "Digital design and multimedia", score: 3 },
        { text: "Public speaking and communication", score: 1 },
      ]
    },
    {
      question: "Your ideal project would involve:",
      category: "creative",
      weight: 1.0,
      order: 12,
      options: [
        { text: "Expressing ideas through art or media", score: 5 },
        { text: "Developing new concepts or strategies", score: 4 },
        { text: "Solving technical problems", score: 2 },
        { text: "Coordinating people and resources", score: 2 },
      ]
    },
  ]

  for (const q of questions) {
    const question = await prisma.quizQuestion.create({
      data: {
        question: q.question,
        category: q.category,
        weight: q.weight,
        order: q.order,
      },
    })

    for (const opt of q.options) {
      await prisma.questionOption.create({
        data: {
          questionId: question.id,
          text: opt.text,
          score: opt.score,
        },
      })
    }
  }

  console.log('Created quiz questions')

  // Create Skills
  const skills = [
    { name: "Python Programming", description: "High-level programming language", category: "technical" },
    { name: "JavaScript", description: "Web development programming language", category: "technical" },
    { name: "Data Analysis", description: "Analyzing datasets to extract insights", category: "analytical" },
    { name: "Machine Learning", description: "Building predictive models and AI systems", category: "technical" },
    { name: "UI/UX Design", description: "Designing user interfaces and experiences", category: "creative" },
    { name: "Graphic Design", description: "Visual communication and design", category: "creative" },
    { name: "Project Management", description: "Planning and managing projects", category: "interpersonal" },
    { name: "Communication", description: "Effective verbal and written communication", category: "interpersonal" },
    { name: "Problem Solving", description: "Analytical problem-solving skills", category: "analytical" },
    { name: "Critical Thinking", description: "Logical reasoning and analysis", category: "analytical" },
    { name: "Creativity", description: "Creative thinking and innovation", category: "creative" },
    { name: "Leadership", description: "Leading and motivating teams", category: "interpersonal" },
  ]

  const createdSkills = await Promise.all(
    skills.map(skill =>
      prisma.skill.create({
        data: skill,
      })
    )
  )

  console.log('Created skills')

  // Create Careers
  const careers = [
    {
      title: "Software Developer",
      description: "Design, develop, and maintain software applications and systems. Work with various programming languages and frameworks to create solutions for users.",
      averageSalary: "$85,000 - $130,000",
      jobGrowthRate: "22% (Much faster than average)",
      requiredEducation: "Bachelor's degree in Computer Science or related field",
      category: "technical",
      demandLevel: "high",
      skills: ["JavaScript", "Python Programming", "Problem Solving"]
    },
    {
      title: "Data Scientist",
      description: "Analyze complex data sets to help organizations make better decisions. Use statistical methods and machine learning to extract insights.",
      averageSalary: "$95,000 - $150,000",
      jobGrowthRate: "36% (Much faster than average)",
      requiredEducation: "Bachelor's or Master's degree in Data Science, Statistics, or related field",
      category: "analytical",
      demandLevel: "high",
      skills: ["Data Analysis", "Python Programming", "Machine Learning", "Critical Thinking"]
    },
    {
      title: "UX/UI Designer",
      description: "Create intuitive and visually appealing user interfaces for digital products. Focus on user experience and interaction design.",
      averageSalary: "$70,000 - $110,000",
      jobGrowthRate: "13% (Faster than average)",
      requiredEducation: "Bachelor's degree in Design, HCI, or related field",
      category: "creative",
      demandLevel: "high",
      skills: ["UI/UX Design", "Graphic Design", "Creativity"]
    },
    {
      title: "Project Manager",
      description: "Plan, execute, and oversee projects from initiation to completion. Coordinate teams and ensure projects meet deadlines and budgets.",
      averageSalary: "$75,000 - $120,000",
      jobGrowthRate: "8% (As fast as average)",
      requiredEducation: "Bachelor's degree and/or PMP certification",
      category: "interpersonal",
      demandLevel: "high",
      skills: ["Project Management", "Leadership", "Communication"]
    },
    {
      title: "Graphic Designer",
      description: "Create visual concepts to communicate ideas that inspire and inform consumers. Design layouts for advertisements, brochures, magazines, and reports.",
      averageSalary: "$50,000 - $75,000",
      jobGrowthRate: "3% (Slower than average)",
      requiredEducation: "Bachelor's degree in Graphic Design or related field",
      category: "creative",
      demandLevel: "medium",
      skills: ["Graphic Design", "Creativity", "UI/UX Design"]
    },
    {
      title: "Business Analyst",
      description: "Analyze business processes and systems to improve efficiency and effectiveness. Bridge the gap between IT and business stakeholders.",
      averageSalary: "$70,000 - $100,000",
      jobGrowthRate: "11% (Faster than average)",
      requiredEducation: "Bachelor's degree in Business, IT, or related field",
      category: "analytical",
      demandLevel: "high",
      skills: ["Data Analysis", "Critical Thinking", "Communication", "Problem Solving"]
    },
  ]

  for (const careerData of careers) {
    const career = await prisma.career.create({
      data: {
        title: careerData.title,
        description: careerData.description,
        averageSalary: careerData.averageSalary,
        jobGrowthRate: careerData.jobGrowthRate,
        requiredEducation: careerData.requiredEducation,
        category: careerData.category,
        demandLevel: careerData.demandLevel,
      },
    })

    // Link skills to career
    for (const skillName of careerData.skills) {
      const skill = createdSkills.find(s => s.name === skillName)
      if (skill) {
        await prisma.careerSkill.create({
          data: {
            careerId: career.id,
            skillId: skill.id,
            importance: careerData.skills.indexOf(skillName) === 0 ? "essential" : "recommended",
          },
        })
      }
    }
  }

  console.log('Created careers')

  // Create Learning Resources
  const resources = [
    {
      skillName: "Python Programming",
      resources: [
        { title: "Python for Everybody", url: "https://www.coursera.org/specializations/python", type: "course", provider: "Coursera", isFree: true },
        { title: "Learn Python", url: "https://www.codecademy.com/learn/learn-python-3", type: "course", provider: "Codecademy", isFree: false },
      ]
    },
    {
      skillName: "JavaScript",
      resources: [
        { title: "JavaScript Basics", url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/", type: "course", provider: "freeCodeCamp", isFree: true },
        { title: "Modern JavaScript", url: "https://javascript.info/", type: "article", provider: "javascript.info", isFree: true },
      ]
    },
    {
      skillName: "Data Analysis",
      resources: [
        { title: "Data Analysis with Python", url: "https://www.coursera.org/learn/data-analysis-with-python", type: "course", provider: "Coursera", isFree: true },
        { title: "Excel Data Analysis", url: "https://www.udemy.com/course/microsoft-excel-data-analysis/", type: "course", provider: "Udemy", isFree: false },
      ]
    },
    {
      skillName: "UI/UX Design",
      resources: [
        { title: "Google UX Design Certificate", url: "https://www.coursera.org/professional-certificates/google-ux-design", type: "course", provider: "Coursera", isFree: false },
        { title: "Figma UI Design Tutorial", url: "https://www.youtube.com/watch?v=FTFaQWZBqQ8", type: "video", provider: "YouTube", isFree: true },
      ]
    },
    {
      skillName: "Machine Learning",
      resources: [
        { title: "Machine Learning by Andrew Ng", url: "https://www.coursera.org/learn/machine-learning", type: "course", provider: "Coursera", isFree: true },
        { title: "Fast.ai Practical Deep Learning", url: "https://www.fast.ai/", type: "course", provider: "fast.ai", isFree: true },
      ]
    },
    {
      skillName: "Project Management",
      resources: [
        { title: "Project Management Principles", url: "https://www.coursera.org/learn/project-management", type: "course", provider: "Coursera", isFree: true },
        { title: "PMP Certification Prep", url: "https://www.udemy.com/course/pmp-certification-exam-prep-course/", type: "course", provider: "Udemy", isFree: false },
      ]
    },
  ]

  for (const resourceGroup of resources) {
    const skill = createdSkills.find(s => s.name === resourceGroup.skillName)
    if (skill) {
      for (const res of resourceGroup.resources) {
        await prisma.learningResource.create({
          data: {
            skillId: skill.id,
            title: res.title,
            url: res.url,
            type: res.type,
            provider: res.provider,
            isFree: res.isFree,
          },
        })
      }
    }
  }

  console.log('Created learning resources')

  // Create Mentors
  const allCareers = await prisma.career.findMany()

  const mentorData = [
    {
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      bio: "Senior Software Engineer with 8+ years of experience in full-stack development. Passionate about mentoring junior developers and helping them navigate their career paths in tech.",
      title: "Senior Software Engineer",
      company: "Google",
      yearsExperience: 8,
      linkedInUrl: "https://linkedin.com/in/sarahjohnson",
      careerTitle: "Software Developer"
    },
    {
      name: "Michael Chen",
      email: "michael.chen@example.com",
      bio: "Lead Data Scientist specializing in machine learning and predictive analytics. I love teaching others about the power of data-driven decision making.",
      title: "Lead Data Scientist",
      company: "Amazon",
      yearsExperience: 10,
      linkedInUrl: "https://linkedin.com/in/michaelchen",
      careerTitle: "Data Scientist"
    },
    {
      name: "Emily Rodriguez",
      email: "emily.rodriguez@example.com",
      bio: "Principal UX Designer with experience at leading tech companies. I mentor designers to create user-centered experiences that make a difference.",
      title: "Principal UX Designer",
      company: "Apple",
      yearsExperience: 12,
      linkedInUrl: "https://linkedin.com/in/emilyrodriguez",
      careerTitle: "UX/UI Designer"
    },
    {
      name: "David Thompson",
      email: "david.thompson@example.com",
      bio: "Project Management Professional (PMP) with extensive experience leading cross-functional teams. Happy to share insights on project management best practices.",
      title: "Senior Project Manager",
      company: "Microsoft",
      yearsExperience: 9,
      linkedInUrl: "https://linkedin.com/in/davidthompson",
      careerTitle: "Project Manager"
    },
    {
      name: "Jessica Lee",
      email: "jessica.lee@example.com",
      bio: "Creative Director with a passion for visual storytelling. I've worked with brands big and small to create compelling designs.",
      title: "Creative Director",
      company: "Adobe",
      yearsExperience: 7,
      linkedInUrl: "https://linkedin.com/in/jessicalee",
      careerTitle: "Graphic Designer"
    },
    {
      name: "Robert Martinez",
      email: "robert.martinez@example.com",
      bio: "Business Analyst helping organizations leverage data for strategic decision-making. I enjoy mentoring those interested in business intelligence.",
      title: "Senior Business Analyst",
      company: "Salesforce",
      yearsExperience: 6,
      linkedInUrl: "https://linkedin.com/in/robertmartinez",
      careerTitle: "Business Analyst"
    },
  ]

  for (const mentor of mentorData) {
    const career = allCareers.find(c => c.title === mentor.careerTitle)
    if (career) {
      await prisma.mentor.create({
        data: {
          name: mentor.name,
          email: mentor.email,
          bio: mentor.bio,
          title: mentor.title,
          company: mentor.company,
          yearsExperience: mentor.yearsExperience,
          careerId: career.id,
          linkedInUrl: mentor.linkedInUrl,
          availability: "available",
          maxMentees: 5,
        },
      })
    }
  }

  console.log('Created mentors')

  // Create Market Insights
  const currentDate = new Date()
  const months = []
  for (let i = 0; i < 12; i++) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1)
    months.push(`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`)
  }

  for (const career of allCareers) {
    const basePostings = career.demandLevel === "high" ? 5000 : 2000
    const trends = ["increasing", "stable", "decreasing"]

    for (let i = 0; i < months.length; i++) {
      const month = months[i]
      const trendVariation = Math.random() * 0.3 - 0.15 // -15% to +15%
      const monthVariation = (12 - i) / 12 * 0.2 // Increase over time
      const jobPostings = Math.floor(basePostings * (1 + trendVariation + monthVariation))

      const baseSalary = career.demandLevel === "high" ? 90000 : 65000
      const avgSalary = baseSalary + Math.random() * 20000

      const demandTrend = i < 4 ? "increasing" : i < 8 ? "stable" : trends[Math.floor(Math.random() * 3)]

      let topSkills: string[] = []
      if (career.category === "technical") {
        topSkills = ["Python", "JavaScript", "Cloud Computing", "DevOps", "Agile"]
      } else if (career.category === "analytical") {
        topSkills = ["Data Analysis", "SQL", "Statistics", "Visualization", "Excel"]
      } else if (career.category === "creative") {
        topSkills = ["Figma", "Adobe Creative Suite", "UI Design", "Prototyping", "Typography"]
      } else if (career.category === "interpersonal") {
        topSkills = ["Leadership", "Communication", "Agile", "Stakeholder Management", "Risk Management"]
      }

      const topCompanies = ["Google", "Amazon", "Microsoft", "Apple", "Meta", "Netflix", "Salesforce", "Adobe"]
      const randomCompanies = topCompanies.sort(() => 0.5 - Math.random()).slice(0, 5)

      await prisma.marketInsight.create({
        data: {
          careerId: career.id,
          month,
          jobPostings,
          avgSalary,
          demandTrend,
          topSkills: JSON.stringify(topSkills),
          topCompanies: JSON.stringify(randomCompanies),
        },
      })
    }
  }

  console.log('Created market insights')
  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
