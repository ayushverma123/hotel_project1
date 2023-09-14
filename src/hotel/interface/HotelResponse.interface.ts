import { Hotel } from "../../entities/hotel.schema";

export interface HotelInterfaceResponse {
  code: number;
  message: string;
  status: string;
  data: Hotel;
}

