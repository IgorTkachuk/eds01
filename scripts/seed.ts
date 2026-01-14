import 'dotenv/config';
import { sql } from 'drizzle-orm';
import { db } from '@/db/drizzle';
import * as schema from '@/db/schema'
import { reset } from 'drizzle-seed'

import rqtypeData from './data/rqtype'
import settlement from './data/settlement'
import street from './data/street';


async function seeding() {
    await reset(db, schema);

    await db.execute(sql.raw(rqtypeData));

    await db.execute(sql.raw(settlement));

    await db.execute(sql.raw(street));
}

seeding();