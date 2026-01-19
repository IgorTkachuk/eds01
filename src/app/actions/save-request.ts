'use server'

import { formSchema } from "@/forms/schema"
import { db } from "@/db/drizzle"
import { request } from "@/db/schema"


export async function saveRequestAction(data: unknown){
    const values = formSchema.parse(data)

    await db.insert(request).values({
        streetId: values.streetId,
        settlementId: values.settlementId,
        rqCharacterId: values.rqCharacterId,
        rqFactId: values.rqFactId,
    })

    return {success: true}
}