import {create} from "zustand/react";
import {persist} from "zustand/middleware";
import ApiService from "../utils/ApiService.ts";
import {Task} from "../interfaces";
import generateID from "../helpers/generateID.ts";

export type HolidaysByDate = Record<string, Array<Omit<Task, 'order'>>>

interface HolidayState {
  holidays: Record<number, HolidaysByDate>,
  isLoading: boolean,

  fetchHolidays: (year: number, countryCode?: string) => Promise<void>
}

export const useHolidayStore = create<HolidayState>()(persist(
  (set, get) => ({
    holidays: {},
    isLoading: false,

    fetchHolidays: async (year, countryCode) => {
      const { holidays } = get();

      if (year in holidays) return;

      set({isLoading: true})
      try {
        const data = await ApiService.getPublicHolidays(year, countryCode);
        const newHolidays = data.reduce((acc, holiday) => {
          const task = {
            id: generateID(),
            name: holiday.localName,
          };

          if (holiday.date in acc) {
            acc[holiday.date].push(task)
          } else {
            acc[holiday.date] = [task]
          }

          return acc;
        }, {} as HolidaysByDate);

        set({holidays: {...holidays, [year]: newHolidays}});
      } catch (err) {
        console.error('Error fetching holidays:', err);
      } finally {
        set({isLoading: false})
      }
    }
  }),
  {
    name: 'holidays'
  }
))