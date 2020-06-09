# Migration `20200430102848-create-db`

This migration has been generated at 4/30/2020, 10:28:48 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "AllowedEvent" AS ENUM ('DROPPED', 'REMOVED', 'UPLOADED', 'DOWNLOADED', 'DELETED', 'TITLED', 'SAVED');

CREATE TABLE "public"."Doc" (
    "createddAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" SERIAL,
    "title" text   ,
    "updetedAt" timestamp(3)  NOT NULL ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "public"."DocEvents" (
    "docId" integer  NOT NULL ,
    "event" "AllowedEvent" NOT NULL ,
    "id" SERIAL,
    PRIMARY KEY ("id")
) 

ALTER TABLE "public"."DocEvents" ADD FOREIGN KEY ("docId")REFERENCES "public"."Doc"("id") ON DELETE CASCADE  ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200430102848-create-db
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,36 @@
+// This is your Prisma schema file,
+// learn more about it in the docs: https://pris.ly/d/prisma-schema
+
+datasource db {
+  provider = "postgresql"
+  url      = env("DATABASE_URL")
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model Doc {
+  id Int @id @default(autoincrement())
+  title String?
+  events DocEvents[]
+  createddAt DateTime @default(now())
+  updetedAt DateTime
+}
+
+model DocEvents {
+  id Int @id @default(autoincrement())
+  doc Doc @relation(fields: [docId], references: [id])
+  docId Int
+  event AllowedEvent
+}
+
+enum AllowedEvent {
+  DROPPED
+  REMOVED
+  UPLOADED
+  DOWNLOADED
+  DELETED
+  TITLED
+  SAVED
+}
```


