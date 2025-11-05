import { EvaluationResource, RuneRating, AnalysisCriteria } from '../../types/evaluation'

export const mockEvaluations: EvaluationResource[] = [
  {
    id: '1',
    userId: '1',
    title: 'AI-Generated Product Description',
    description: 'Testing an AI-generated product description for accuracy and marketing appeal',
    type: 'response',
    content: {
      text: 'Our revolutionary coffee maker brews the perfect cup in just 30 seconds using advanced AI-powered temperature optimization...',
      fileUrl: undefined,
    },
    evaluation: {
      overallScore: 92,
      aiAnalysis: {
        score: 90,
        confidence: 0.95,
        criteria: {
          clarity: 95,
          effectiveness: 88,
          creativity: 90,
          technicalQuality: 85,
        } as AnalysisCriteria,
        processingTime: 1200,
      },
      humanReview: {
        score: 94,
        reviewer: 'sarah-expert',
        comments: 'Excellent marketing language with strong technical foundation. Minor grammar improvements suggested.',
        reviewedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
      runeRating: 'masterful',
      recommendations: [
        'Consider adding customer testimonial references',
        'Slight grammar refinement in second sentence',
        'Include technical specifications more prominently',
      ],
    },
    metadata: {},
    status: 'completed',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    evaluatedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    tags: ['marketing', 'product-description', 'e-commerce'],
  },
  {
    id: '2',
    userId: '1',
    title: 'Machine Learning Article Prompt',
    description: 'Evaluating a prompt for generating an article about machine learning fundamentals',
    type: 'prompt',
    content: {
      text: 'Write a comprehensive guide about machine learning fundamentals for beginners, including key concepts, types of learning, and real-world applications.',
      fileUrl: undefined,
    },
    evaluation: {
      overallScore: 78,
      aiAnalysis: {
        score: 76,
        confidence: 0.88,
        criteria: {
          clarity: 88,
          effectiveness: 74,
          creativity: 72,
          technicalQuality: 70,
        } as AnalysisCriteria,
        processingTime: 850,
      },
      runeRating: 'skilled',
      recommendations: [
        'Add specific section guidelines for better structure',
        'Include target audience specification',
        'Suggest including code examples for clarity',
      ],
    },
    metadata: {},
    status: 'completed',
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    evaluatedAt: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000),
    tags: ['ai', 'education', 'technical-writing'],
  },
  {
    id: '3',
    userId: '1',
    title: 'Product Screenshot Analysis',
    description: 'Evaluating an AI-generated product UI screenshot for design quality',
    type: 'image',
    content: {
      fileUrl: 'https://via.placeholder.com/800x600?text=Product+UI',
      fileName: 'product-ui.png',
      fileSize: 256000,
      mimeType: 'image/png',
    },
    evaluation: {
      overallScore: 85,
      aiAnalysis: {
        score: 83,
        confidence: 0.92,
        criteria: {
          clarity: 90,
          effectiveness: 82,
          creativity: 86,
          technicalQuality: 77,
        } as AnalysisCriteria,
        processingTime: 2100,
      },
      runeRating: 'masterful',
      recommendations: [
        'Color contrast could be improved for accessibility',
        'Navigation hierarchy is well-structured',
        'Button sizing follows modern UI standards',
      ],
    },
    metadata: {
      dimensions: {
        width: 800,
        height: 600,
      },
    },
    status: 'completed',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    evaluatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    tags: ['ui-design', 'ux', 'screenshots'],
  },
  {
    id: '4',
    userId: '1',
    title: 'Blog Post on AI Ethics',
    description: 'Full blog post about AI ethics and responsible AI development',
    type: 'document',
    content: {
      fileUrl: 'https://via.placeholder.com/documents/ai-ethics.pdf',
      fileName: 'ai-ethics-article.pdf',
      fileSize: 512000,
      mimeType: 'application/pdf',
    },
    evaluation: {
      overallScore: 88,
      aiAnalysis: {
        score: 87,
        confidence: 0.91,
        criteria: {
          clarity: 92,
          effectiveness: 86,
          creativity: 85,
          technicalQuality: 83,
        } as AnalysisCriteria,
        processingTime: 3400,
      },
      humanReview: {
        score: 90,
        reviewer: 'michael-ethics',
        comments: 'Well-researched piece with strong arguments. Excellent use of citations and examples.',
        reviewedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
      runeRating: 'masterful',
      recommendations: [
        'Include section on future trends in AI ethics',
        'Add case studies of ethical dilemmas',
        'Strengthen conclusion with actionable insights',
      ],
    },
    metadata: {
      originalSize: 512000,
    },
    status: 'completed',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    evaluatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    tags: ['ethics', 'ai', 'research', 'blog'],
  },
  {
    id: '5',
    userId: '1',
    title: 'Customer Service Chatbot Response',
    description: 'Testing AI chatbot response quality for customer service scenario',
    type: 'conversation',
    content: {
      text: 'Customer: How can I reset my password?\nChatbot: To reset your password, please visit our login page and click "Forgot Password". Enter your email address and follow the instructions sent to your inbox.',
      fileUrl: undefined,
    },
    evaluation: {
      overallScore: 72,
      aiAnalysis: {
        score: 70,
        confidence: 0.85,
        criteria: {
          clarity: 85,
          effectiveness: 68,
          creativity: 60,
          technicalQuality: 75,
        } as AnalysisCriteria,
        processingTime: 650,
      },
      runeRating: 'skilled',
      recommendations: [
        'Add estimated time for password reset',
        'Include alternative support options',
        'Could be more empathetic in tone',
      ],
    },
    metadata: {},
    status: 'completed',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    evaluatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    tags: ['customer-service', 'chatbot', 'support'],
  },
  {
    id: '6',
    userId: '1',
    title: 'Social Media Post Draft',
    description: 'New social media post evaluating engagement potential',
    type: 'response',
    content: {
      text: 'Just launched our new AI-powered analytics dashboard! Track your metrics in real-time, get actionable insights, and make data-driven decisions. Try it free today! 🚀📊',
      fileUrl: undefined,
    },
    evaluation: {
      overallScore: 82,
      aiAnalysis: {
        score: 81,
        confidence: 0.89,
        criteria: {
          clarity: 90,
          effectiveness: 80,
          creativity: 82,
          technicalQuality: 73,
        } as AnalysisCriteria,
        processingTime: 780,
      },
      runeRating: 'masterful',
      recommendations: [
        'Add hashtags for better reach',
        'Consider A/B testing different call-to-action',
        'Include social proof (testimonial or metric)',
      ],
    },
    metadata: {},
    status: 'completed',
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    evaluatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    tags: ['marketing', 'social-media', 'launch'],
  },
  {
    id: '7',
    userId: '1',
    title: 'Python Code Review',
    description: 'Evaluating AI-generated Python code for quality and best practices',
    type: 'document',
    content: {
      text: 'def calculate_average(numbers):\n    if not numbers:\n        return 0\n    return sum(numbers) / len(numbers)',
      fileUrl: undefined,
    },
    evaluation: {
      overallScore: 65,
      aiAnalysis: {
        score: 63,
        confidence: 0.82,
        criteria: {
          clarity: 80,
          effectiveness: 60,
          creativity: 55,
          technicalQuality: 65,
        } as AnalysisCriteria,
        processingTime: 920,
      },
      runeRating: 'apprentice',
      recommendations: [
        'Add type hints for better code clarity',
        'Include docstring with parameter descriptions',
        'Consider using statistics.mean() for built-in function',
        'Add validation for numeric input types',
      ],
    },
    metadata: {},
    status: 'completed',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    evaluatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    tags: ['code-review', 'python', 'technical'],
  },
  {
    id: '8',
    userId: '1',
    title: 'Email Newsletter Copy',
    description: 'Pending evaluation of newsletter copy effectiveness',
    type: 'response',
    content: {
      text: 'Subject: Your Weekly AI Insights\n\nDear Subscriber,\n\nThis week we explore the latest developments in generative AI and how they impact your business...',
      fileUrl: undefined,
    },
    evaluation: {
      overallScore: 0,
      aiAnalysis: {
        score: 0,
        confidence: 0,
        criteria: {
          clarity: 0,
          effectiveness: 0,
          creativity: 0,
          technicalQuality: 0,
        } as AnalysisCriteria,
        processingTime: 0,
      },
      runeRating: 'novice',
      recommendations: [],
    },
    metadata: {},
    status: 'pending',
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
    tags: ['newsletter', 'marketing', 'email'],
  },
  {
    id: '9',
    userId: '1',
    title: 'Video Script Analysis',
    description: 'Analyzing AI-generated video script for YouTube tutorial',
    type: 'document',
    content: {
      fileUrl: 'https://via.placeholder.com/documents/video-script.txt',
      fileName: 'tutorial-script.txt',
      fileSize: 45000,
      mimeType: 'text/plain',
    },
    evaluation: {
      overallScore: 79,
      aiAnalysis: {
        score: 78,
        confidence: 0.87,
        criteria: {
          clarity: 88,
          effectiveness: 76,
          creativity: 78,
          technicalQuality: 72,
        } as AnalysisCriteria,
        processingTime: 1500,
      },
      runeRating: 'skilled',
      recommendations: [
        'Add visual directions for scenes',
        'Improve pacing in middle section',
        'Include call-to-action timestamps',
      ],
    },
    metadata: {
      originalSize: 45000,
    },
    status: 'completed',
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
    evaluatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    tags: ['video', 'tutorial', 'script'],
  },
  {
    id: '10',
    userId: '1',
    title: 'API Documentation Review',
    description: 'Evaluating API documentation quality and completeness',
    type: 'document',
    content: {
      fileUrl: 'https://via.placeholder.com/documents/api-docs.md',
      fileName: 'api-documentation.md',
      fileSize: 125000,
      mimeType: 'text/markdown',
    },
    evaluation: {
      overallScore: 91,
      aiAnalysis: {
        score: 90,
        confidence: 0.93,
        criteria: {
          clarity: 94,
          effectiveness: 89,
          creativity: 85,
          technicalQuality: 92,
        } as AnalysisCriteria,
        processingTime: 2800,
      },
      humanReview: {
        score: 92,
        reviewer: 'david-tech-lead',
        comments: 'Comprehensive documentation with excellent examples and clear explanations. Well-organized sections.',
        reviewedAt: new Date(Date.now() - 0 * 24 * 60 * 60 * 1000),
      },
      runeRating: 'legendary',
      recommendations: [
        'Add performance benchmarks section',
        'Include rate limiting guidelines',
        'Consider adding troubleshooting section',
      ],
    },
    metadata: {
      originalSize: 125000,
    },
    status: 'completed',
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    evaluatedAt: new Date(Date.now() - 0 * 24 * 60 * 60 * 1000),
    tags: ['documentation', 'api', 'technical'],
  },
]

// Helper function to get mock evaluation by ID
export const getMockEvaluationById = (id: string): EvaluationResource | undefined => {
  return mockEvaluations.find((evaluation) => evaluation.id === id)
}

// Helper function to get filtered mock evaluations
export const getFilteredMockEvaluations = (
  searchTerm?: string,
  type?: string,
  status?: string,
  tags?: string[]
): EvaluationResource[] => {
  return mockEvaluations.filter((evaluation) => {
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      if (
        !evaluation.title.toLowerCase().includes(term) &&
        !evaluation.description?.toLowerCase().includes(term)
      ) {
        return false
      }
    }

    if (type && evaluation.type !== type) {
      return false
    }

    if (status && evaluation.status !== status) {
      return false
    }

    if (tags && tags.length > 0) {
      const hasTag = tags.some((tag) => evaluation.tags.includes(tag))
      if (!hasTag) return false
    }

    return true
  })
}

// Helper function to get evaluation statistics
export const getMockEvaluationStats = () => {
  const completed = mockEvaluations.filter((e) => e.status === 'completed')
  const scores = completed.map((e) => e.evaluation.overallScore)
  const averageScore = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0

  // Count rune ratings
  const ratingDistribution: Record<RuneRating, number> = {
    legendary: completed.filter((e) => e.evaluation.runeRating === 'legendary').length,
    masterful: completed.filter((e) => e.evaluation.runeRating === 'masterful').length,
    skilled: completed.filter((e) => e.evaluation.runeRating === 'skilled').length,
    apprentice: completed.filter((e) => e.evaluation.runeRating === 'apprentice').length,
    novice: completed.filter((e) => e.evaluation.runeRating === 'novice').length,
  }

  // Get top tags
  const tagCounts: Record<string, number> = {}
  mockEvaluations.forEach((evaluation) => {
    evaluation.tags.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1
    })
  })
  const topTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([tag]) => tag)

  return {
    totalEvaluations: mockEvaluations.length,
    completedEvaluations: completed.length,
    averageScore: Math.round(averageScore),
    ratingDistribution,
    topTags,
  }
}
