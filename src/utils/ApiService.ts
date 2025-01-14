import axios, {AxiosError, AxiosInstance} from "axios";
import {API_URL, DEFAULT_COUNTRY_CODE} from "../constants";
import {PublicHolidayV3Dto} from "../interfaces/NagerInterfaces.ts";

class ApiService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      headers: {
        'Accept': 'application/json'
      }
    });
  }

  public async getPublicHolidays(year: number, countryCode: string = DEFAULT_COUNTRY_CODE): Promise<PublicHolidayV3Dto[]> {
   try {
     const response = await this.client.get(`/PublicHolidays/${year}/${countryCode}`);
     console.log('response', response);

     return response.data;
   } catch (err) {
     this.handleError(err as AxiosError)
   }
  }

  private handleError(error: AxiosError): never {
    if (error.response) {
      console.error('Error:', error.response.status, error.response.data);
      throw new Error(`API Error: ${error.response.status} - ${error.response.statusText || 'Unknown error'}`);
    } else if (error.request) {
      console.error('No response received:', error.request);
      throw new Error('No response received from API');
    } else {
      console.error('Error setting up request:', error.message);
      throw new Error(`Request setup error: ${error.message}`);
    }
  }

}

export default new ApiService();