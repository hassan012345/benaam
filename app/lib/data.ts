interface Item {
    id: string;
    name: string;
    description: string;
    image: string;
    type: 'lost' | 'found';
    location: string;
    date: string;
    status: 'open' | 'claimed';
    userId: string;
}

const Items: Item[] = [
    {
        id: "1",
        name: "iPhone 13",
        description: "I lost my iPhone 13 (silver color) inside main cafeteria. Last seen on table near the entrance.",
        image: "",
        type: "lost",
        location: "Main Cafeteria",
        date: "2024-03-20",
        status: "open",
        userId: "user1"
    },
    {
        id: "2",
        name: "Dell Laptop Charger",
        description: "Found a Dell laptop charger in the library. It's black with a 65W power rating.",
        image: "",
        type: "found",
        location: "Library",
        date: "2024-03-19",
        status: "open",
        userId: "user2"
    }
];

export default Items;