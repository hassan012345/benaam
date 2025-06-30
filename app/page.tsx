'use client';
import Image from "next/image";
import Header from '@/app/ui/Header';
import Item from '@/app/ui/LostItem';
import Footer from '@/app/ui/Footer';
import AddItem from "@/app/ui/Additem";
import Items from '@/app/lib/data';


export default function Home() {

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-col items-center grow md:p-4 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-7xl">
          {Items.map((item) => (
            <Item
              key={item.id}
              id={item.id}
              name={item.name}
              image={item.image}
              description={item.description}
              type={item.type}
              location={item.location}
              date={item.date}
              status={item.status}
              userId={item.userId}
            />
          ))}
        </div>
        <AddItem />
      </div>
      <Footer />
    </div>
  );
}