import { getAllItems } from "./lib/actions";
import LostItem from "@/app/ui/LostItem";

export const Items = async () =>{
    const items = 
    return 
}
// app/page.tsx
import ClientHome from "@/app/ClientHome"; // New client component (create this file)
import { Item } from "@/app/lib/definitions";

export default async function Home() {
  let items: Item[] = [];
  let error: string | null = null;

  try {
    // Fetch on server (use env for URL to avoid hardcoding; cache:'no-store' for fresh data)
    const response = await getAllItems();
    if (!response.success) {
      throw new Error(`HTTP error! status: ${response.error}`);
    }
    const items = response.data;
  } catch (err) {
    error = "Failed to load items.";
  }

  // Pass data/error to client component
  return <ClientHome items={items} error={error} />;
}