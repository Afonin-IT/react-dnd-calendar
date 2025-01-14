import {create} from "zustand/react";
import {persist} from "zustand/middleware";
import {Task, TaskType} from "../interfaces";
import generateID from "../helpers/generateID.ts";

interface TaskState {
  tasks: Record<string, Task[]>,

  searchText: string,
  setSearchText: (value: string) => void,

  add: (date: string, task: Omit<Task, "id" | "order" | "type">) => void
  update: (date: string, id: string, updatedTask: Partial<Omit<Task, "id">>) => void
  reorder: (date: string, updatedTasks: Task[]) => void
  move: (fromDate: string, toDate: string, id: string) => void
  delete: (date: string, id: string) => void
}

export const useTaskStore = create<TaskState>()(persist(
  (set) => ({
    tasks: {},

    searchText: "",
    setSearchText: (value) => set({searchText: value}),

    add: (date, task) => {
      set((state) => ({
        tasks: {
          ...state.tasks,
          [date]: [
            ...(state.tasks[date] || []),
            {
              ...task,
              id: generateID(),
              order: (state.tasks[date][(state.tasks[date]?.length || 0) - 1]?.order || 0) + 1,
              type: TaskType.Task
            }
          ]
        }
      }))
    },

    update: (date, id, updatedTask) => {
      set((state) => ({
        tasks: {
          ...state.tasks,
          [date]: state.tasks[date].map(task =>
            task.id === id ? { ...task, ...updatedTask } : task
          )
        }
      }))
    },

    reorder: (date, updatedTasks) => {
      set((state) => ({
        tasks: {
          ...state.tasks,
          [date]: updatedTasks
        }
      }))
    },

    move: (fromDate, toDate, id) => {
      set((state) => {
        const tasks = { ...state.tasks };
        const taskToMove = tasks[fromDate]?.find(task => task.id === id);

        if (!taskToMove) return { tasks };

        tasks[fromDate] = tasks[fromDate]?.filter(task => task.id !== id);
        if (tasks[fromDate].length === 0) {
          delete tasks[fromDate];
        }

        const newTask: Task = { ...taskToMove, order: (tasks[toDate][(tasks[toDate]?.length || 0) - 1]?.order || 0) + 1 }
        tasks[toDate] = [...(tasks[toDate] || []), newTask]

        return { tasks }
      })
    },

    delete: (date, id) => {
      set((state) => ({
        tasks: {
          ...state.tasks,
          [date]: state.tasks[date].filter(task => task.id !== id)
        }
      }))
    }
  }),
  {
    name: "tasks"
  }
))