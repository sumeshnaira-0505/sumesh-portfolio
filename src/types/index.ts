export interface Project {
  id: string
  title: string
  description: string
  techStack: string[]
  client?: string
  liveUrl?: string
  githubUrl?: string
  imageUrl?: string
}

export interface Skill {
  name: string
  category: 'frontend' | 'libraries' | 'integrations' | 'tools'
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
}
