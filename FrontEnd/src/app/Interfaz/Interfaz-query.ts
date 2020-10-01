import { ActoresTemasInterface } from "../Interfaz/ActoresTemas";

export interface InterfazQuery {

  query: string;
  estado: string;
  palabrasClaves: string[];
  ActoresTemas?:ActoresTemasInterface[];
}
