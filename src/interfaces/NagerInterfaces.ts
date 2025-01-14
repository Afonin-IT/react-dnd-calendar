export type HolidayTypes = "Public" | "Bank" | "School" | "Authorities" | "Optional" | "Observance";

export interface PublicHolidayV3Dto {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  global: boolean;
  counties?: string[];
  launchYear?: number;
  types: HolidayTypes[];
}
