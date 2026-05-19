import { Idea, IdeaInput } from './types'

export async function getIdeas(supabase: any, userId: string): Promise<Idea[]> {
  const { data, error } = await supabase
    .from('ideas')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

export async function searchIdeas(supabase: any, userId: string, query: string): Promise<Idea[]> {
  const { data, error } = await supabase
    .from('ideas')
    .select('*')
    .eq('user_id', userId)
    .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data || []
}

export async function createIdea(supabase: any, userId: string, input: IdeaInput): Promise<Idea> {
  const { data, error } = await supabase
    .from('ideas')
    .insert({
      user_id: userId,
      title: input.title,
      description: input.description,
      tags: input.tags,
      is_favorite: false,
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateIdea(
  supabase: any,
  userId: string,
  ideaId: string,
  input: Partial<IdeaInput>
): Promise<Idea> {
  const { data, error } = await supabase
    .from('ideas')
    .update(input)
    .eq('id', ideaId)
    .eq('user_id', userId)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function toggleFavorite(supabase: any, userId: string, ideaId: string): Promise<Idea> {
  // First get the current state
  const { data: idea, error: fetchError } = await supabase
    .from('ideas')
    .select('is_favorite')
    .eq('id', ideaId)
    .eq('user_id', userId)
    .single()

  if (fetchError) throw fetchError

  // Toggle it
  const { data, error } = await supabase
    .from('ideas')
    .update({ is_favorite: !idea.is_favorite })
    .eq('id', ideaId)
    .eq('user_id', userId)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteIdea(supabase: any, userId: string, ideaId: string): Promise<void> {
  const { error } = await supabase
    .from('ideas')
    .delete()
    .eq('id', ideaId)
    .eq('user_id', userId)

  if (error) throw error
}
