import "dotenv/config";
import { sql } from "drizzle-orm";
import { db } from "@/db/drizzle";
import * as schema from "@/db/schema";
import { reset } from "drizzle-seed";

import rqtypeData from "./data/rqtype";
import settlement from "./data/settlement";
import street from "./data/street";
import fact from "./data/rqfact";
import character from "./data/rqharacter";
import diameter from "./data/diameter";
import material from "./data/material";
import pipeLayingType from "./data/pipe_laying_type";
import pressure from "./data/pressure";
import performer from "./data/performer";

async function seeding() {
  await reset(db, schema);

  await db.execute(sql.raw(rqtypeData));

  await db.execute(sql.raw(settlement));

  await db.execute(sql.raw(street));

  await db.execute(sql.raw(fact));

  await db.execute(sql.raw(character));

  await db.execute(sql.raw(diameter));

  await db.execute(sql.raw(material));

  await db.execute(sql.raw(pipeLayingType));

  await db.execute(sql.raw(pressure));

  await db.execute(sql.raw(performer));
}

seeding();
