// Define Todo type
export interface Todo {
  id: number
  title: string
  isCompleted: boolean
}

// Sample todos data
export const TODO_LIST: Todo[] = [
  { id: 1, title: 'Learn React Native', isCompleted: false },
  { id: 2, title: 'Build a Todo App', isCompleted: true },
  { id: 3, title: 'Master TypeScript', isCompleted: false },
  { id: 4, title: 'Write Clean Code', isCompleted: false },
  { id: 5, title: 'Learn React Native', isCompleted: false },
  { id: 6, title: 'Build a Todo App', isCompleted: true },
  { id: 7, title: 'Master TypeScript', isCompleted: false },
  { id: 8, title: 'Write Clean Code', isCompleted: false },
]
