'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from './server'
const supabase = createClient()

export async function getUser(){
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user
}


interface Task {
  id: string;
  content: string;
  status: 'todo' | 'inProgress' | 'done';
  startTime?: string;
  endTime?: string;
}

export async function createSessionWithTasks(userId: string, startTime: string, endTime: string, duration: number, tasks: Task[]) {
  try {

    const duration = Math.max(Math.round((new Date(endTime).getTime() - new Date(startTime).getTime()) / 1000), 1); // Ensure duration is at least 1 second

    const { data: sessionData, error: sessionError } = await supabase
      .from('Session')
      .insert({ user_id: userId, start_time: startTime, end_time: endTime, duration: duration })
      .select()

    if (sessionError) throw sessionError

    const sessionId = sessionData[0].id

    const { error: tasksError } = await supabase
      .from('Task')
      .insert(tasks.map(task => ({
        session_id: sessionId,
        content: task.content,
        status: task.status,
        start_time: task.startTime,
        end_time: task.endTime,
        duration: task.startTime && task.endTime 
          ? Math.max(Math.round((new Date(task.endTime).getTime() - new Date(task.startTime).getTime()) / 1000), 1)
          : null
      })))

    if (tasksError) throw tasksError

    revalidatePath('/study-session')
    return sessionId
  } catch (error) {
    console.error('Error creating session with tasks:', error)
    throw error
  }
}

export async function getLastSession(userId: string) {
  try {
    const { data, error } = await supabase
      .from('Session')
      .select('*')
      .eq('user_id', userId)
      .is('end_time', null)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (error && error.code !== 'PGRST116') {
      throw error
    }
    return data
  } catch (error) {
    console.error('Error fetching last session:', error)
    throw error
  }
}

export async function getSessionTasks(sessionId: string) {
  try {
    const { data, error } = await supabase
      .from('Task')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true })

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching session tasks:', error)
    throw error
  }
}