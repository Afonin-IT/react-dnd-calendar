import {create} from "zustand/react";
import {persist} from "zustand/middleware";
import {Task, TaskType} from "../interfaces";
import generateID from "../helpers/generateID.ts";
import {immer} from "zustand/middleware/immer";

type State = {
  tasks: Record<string, Task[]>,
  searchText: string,
}

type Actions = {
  setSearchText: (value: string) => void,

  add: (date: string, task: Omit<Task, "id" | "order" | "type">) => string
  update: (id: string, updatedTask: Partial<Omit<Task, "id">>) => void
  reorder: (date: string, updatedTasks: Task[]) => void
  move: (fromDate: string, toDate: string, id: string) => void
  remove: (id: string) => void
}

export const useTaskStore = create<State & Actions>()(persist(
  immer((set) => ({
    tasks: {},

    searchText: "",
    setSearchText: (value) => set({searchText: value}),

    add: (date, task) => {
      const id = generateID();

      set((state) => {
        const order = state.tasks[date]
          ? (state.tasks[date][(state.tasks[date]?.length || 0) - 1]?.order || 0) + 1
          : 0;

        const newTask = {
          ...task,
          id,
          order,
          type: TaskType.Task
        }

        if (state.tasks[date]) {
          state.tasks[date].push(newTask)
        } else {
          state.tasks[date] = [newTask]
        }
      });

      return id;
    },

    update: (id, updatedTask) => {
      set((state) => {
        for (const key of Object.keys(state.tasks)) {
          const tasks = state.tasks[key];
          const taskIndex = tasks.findIndex(item => item.id === id);
          if (taskIndex !== -1) {
            state.tasks[key][taskIndex] = {...tasks[taskIndex], ...updatedTask}
            break;
          }
        }
      })
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

    remove: (id) => {
      set((state) => {
        for (const key of Object.keys(state.tasks)) {
          const index = state.tasks[key].findIndex(item => item.id === id);
          if (index !== -1) {
            state.tasks[key] = state.tasks[key].filter((_, i) => i !== index);
            break;
          }
        }
      })
    }
  })),
  {
    name: "tasks"
  }
))