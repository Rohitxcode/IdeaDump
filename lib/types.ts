export interface Idea {
  id: string
  user_id: string
  title: string
  description?: string
  tags: string[]
  is_favorite: boolean
  created_at: string
  updated_at: string
}

export interface IdeaInput {
  title: string
  description?: string
  tags: string[]
}
