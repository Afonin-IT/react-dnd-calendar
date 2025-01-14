import {TaskType} from "../interfaces";

export const DEFAULT_COUNTRY_CODE = 'UA';

export const API_URL = "https://date.nager.at/api/v3";

export const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const TASK_COLORS = {
  [TaskType.Holiday]: "#0279be",
  [TaskType.Task]: "#61c04e"
}