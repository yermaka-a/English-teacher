import { blob, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v7 as UUIDv7 } from "uuid";
export const cards = sqliteTable("cards", {
  id: blob("id")
    .notNull()
    .primaryKey()
    .$default(() => UUIDv7()),

  originalTerm: text("original_term").notNull(),
  translation: text("translation").notNull(),
  transcription: text("transcription").default(""),
});
