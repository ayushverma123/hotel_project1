import { Customer } from "../../entities/customer.schema";

export interface CustomerInterfaceResponse {
  code: number;
  message: string;
  status: string;
  data: Customer;

} 