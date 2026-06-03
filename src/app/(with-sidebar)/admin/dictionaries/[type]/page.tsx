import { notFound } from "next/navigation";
import { dictionaries, DictionaryType } from "@/lib/dictionaries/config";
import { getDictionary } from "@/lib/dictionaries/service";
import DictionaryCrud from "@/components/dictionary-crud";

type Props = {
  params: { type: DictionaryType };
};

export default async function Page({ params }: Props) {
  const { type } = await params;

  const config = dictionaries[type];
  if (!config) return notFound();

  const items = await getDictionary(type);

  return (
    <DictionaryCrud type={type} label={config.label} initialData={items} />
  );
}
