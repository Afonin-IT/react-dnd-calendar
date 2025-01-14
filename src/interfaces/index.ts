export enum TaskType {
  Holiday,
  Task
}

export interface Task {
  id: string
  name: string
  order: number
  type: TaskType
}