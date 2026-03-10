import { blob, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { v7 as UUIDv7 } from "uuid";
export const menuCards = sqliteTable("menu_cards", {
  id: blob("id")
    .notNull()
    .primaryKey()
    .$default(() => UUIDv7()),

  title: text("title").notNull(),
  description: text("description").notNull(),
});
