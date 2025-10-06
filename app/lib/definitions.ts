export interface Item {
  id: string;
  name: string;
  image: string;
  description: string;
  type: "lost" | "found";
  location: string;
  report_date: string;
}

export type User = {
  id: string,
  name: string,
  email: string,
  phone: string,
  password: string,
}