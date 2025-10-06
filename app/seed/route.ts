import postgres from "postgres";
import { Item } from "../lib/definitions";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });



async function User() {
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        phone_number VARCHAR(20) NOT NULL,
        dob DATE NOT NULL,
        image TEXT,
        password VARCHAR(255) NOT NULL
      )
    `;
  }

  async function Items() {
    await sql`
        CREATE TABLE IF NOT EXISTS items (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description TEXT,
            location VARCHAR(255),
            report_date DATE NOT NULL,
            number_of_claims INTEGER DEFAULT 0,
            type VARCHAR(10) NOT NULL CHECK (type IN ('lost', 'found')),
            user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )
    `;
}

async function images(){
  await sql`
  CREATE TABLE IF NOT EXISTS item_images (
    id SERIAL PRIMARY KEY,
    item_id INTEGER NOT NULL REFERENCES items(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    is_thumbnail BOOLEAN DEFAULT FALSE, -- Optional: to designate a primary/thumbnail image
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);`
}

async function claims(){
  await sql`
  CREATE TABLE IF NOT EXISTS claims (
    id SERIAL PRIMARY KEY,
    item_id INTEGER NOT NULL REFERENCES items(id) ON DELETE CASCADE,
    claimant_user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    claim_details TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);`
}



export async function GET(){
    try{
        await User();
        await Items();
        await images();
        await claims();
        return Response.json({ message: 'Database seeded successfully' });
    }
    catch (error) {
        return Response.json({ message: 'error creating table' });
    }
    
}

