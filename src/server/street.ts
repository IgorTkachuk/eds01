import { db } from "@/db/drizzle";
import { street, Street } from "@/db/schema";

import { eq, ilike } from "drizzle-orm";

export async function getStreets(){
    try {
        const allStreet = await db.select().from(street);
        return allStreet;
    } catch(error) {
        console.error(error);
        throw error;
    }
}


type StreetItem = {
    id: number;
    name: string;
}

export async function getStreetsByName(term?: string) {
    const strs = await db
        .select()
        .from(street)
        .where(term ? ilike(street.name, `%${term}%`) : undefined);

    return strs;
    
}