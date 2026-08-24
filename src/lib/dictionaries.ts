import type { Locale } from "@/lib/i18n";
import pl from "@/dictionaries/pl";
import uk from "@/dictionaries/uk";

const dictionaries = { pl, uk };

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}

export type Dictionary = typeof pl;
