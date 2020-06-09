# Migration `20200508165807-add-act`

This migration has been generated at 5/8/2020, 4:58:07 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."Act" (
    "id" text  NOT NULL ,
    PRIMARY KEY ("id")
) 

ALTER TABLE "public"."Doc" ADD COLUMN "actId" text  NOT NULL ;

ALTER TABLE "public"."Doc" ADD FOREIGN KEY ("actId")REFERENCES "public"."Act"("id") ON DELETE CASCADE  ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200430125030-second-try..20200508165807-add-act
--- datamodel.dml
+++ datamodel.dml
@@ -1,35 +1,43 @@
+generator client {
+  provider      = "prisma-client-js"
+  binaryTargets = ["native", "darwin", "debian-openssl-1.1.x"]
+}
+
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url      = env("DATABASE_URL_INTROSPECT")
 }
-generator client {
-  provider = "prisma-client-js"
+model Act {
+  id   String @id
+  docs Doc[]
 }
 model Doc {
+  createddAt DateTime    @default(now())
   id         Int         @default(autoincrement()) @id
+  act        Act         @relation(fields: [actId], references: [id])
+  actId      String
+  name       String?
   title      String?
+  updetedAt  DateTime    @default(now())
   ydUrl      String?
-  name       String?
-  events     DocEvents[]
-  createddAt DateTime    @default(now())
-  updetedAt  DateTime    @default(now())
+  DocEvents  DocEvents[]
 }
 model DocEvents {
-  id    Int          @default(autoincrement()) @id
-  doc   Doc          @relation(fields: [docId], references: [id])
   docId Int
   event AllowedEvent
+  id    Int          @default(autoincrement()) @id
+  Doc   Doc          @relation(fields: [docId], references: [id])
 }
 enum AllowedEvent {
+  DELETED
+  DOWNLOADED
   DROPPED
   REMOVED
+  SAVED
+  TITLED
   UPLOADED
-  DOWNLOADED
-  DELETED
-  TITLED
-  SAVED
 }
```


