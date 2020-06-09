# Migration `20200430125030-second-try`

This migration has been generated at 4/30/2020, 12:50:30 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Doc" ADD COLUMN "name" text   ,
ADD COLUMN "ydUrl" text   ,
ALTER COLUMN "updetedAt" SET DEFAULT CURRENT_TIMESTAMP;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200430102848-create-db..20200430125030-second-try
--- datamodel.dml
+++ datamodel.dml
@@ -1,27 +1,26 @@
-// This is your Prisma schema file,
-// learn more about it in the docs: https://pris.ly/d/prisma-schema
-
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url      = env("DATABASE_URL")
 }
 generator client {
   provider = "prisma-client-js"
 }
 model Doc {
-  id Int @id @default(autoincrement())
-  title String?
-  events DocEvents[]
-  createddAt DateTime @default(now())
-  updetedAt DateTime
+  id         Int         @default(autoincrement()) @id
+  title      String?
+  ydUrl      String?
+  name       String?
+  events     DocEvents[]
+  createddAt DateTime    @default(now())
+  updetedAt  DateTime    @default(now())
 }
 model DocEvents {
-  id Int @id @default(autoincrement())
-  doc Doc @relation(fields: [docId], references: [id])
+  id    Int          @default(autoincrement()) @id
+  doc   Doc          @relation(fields: [docId], references: [id])
   docId Int
   event AllowedEvent
 }
```


