import { Booking } from "src/entities/booking.schema";
export interface BookingInterfaceResponse {
  code: number;
  message: string;
  status: string;
  data: Booking;

}
