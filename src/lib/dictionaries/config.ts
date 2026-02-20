import { settlement } from "@/db/schema";
import { street } from "@/db/schema";
import { rqType } from "@/db/schema";
import { rqFact } from "@/db/schema";
import { diameter } from "@/db/schema";
import { material } from "@/db/schema";
import { pressure } from "@/db/schema";
import { pipeLayingType } from "@/db/schema";
import { performer } from "@/db/schema";

export const dictionaries = {
  settlement: {
    table: settlement,
    label: "Населенний пункт",
  },
  street: {
    table: street,
    label: "Вулиця",
  },
  rqType: {
    table: rqType,
    label: "Характер заявки",
  },
  rqFact: {
    table: rqFact,
    label: "Фактична причина заявки",
  },
  diameter: {
    table: diameter,
    label: "Діаметер",
  },
  material: {
    table: material,
    label: "Матеріал",
  },
  pressure: {
    table: pressure,
    label: "Тиск",
  },
  pipeLayingType: {
    table: pipeLayingType,
    label: "Розташуваня газопроводу",
  },
  performer: {
    table: performer,
    label: "Виконавець",
  },
} as const;

export type DictionaryType = keyof typeof dictionaries;
