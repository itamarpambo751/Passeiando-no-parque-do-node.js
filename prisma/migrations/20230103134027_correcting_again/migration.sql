/*
  Warnings:

  - You are about to drop the `permitions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "permitions_name_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "permitions";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "permissions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_rolePermissions" (
    "role_id" TEXT NOT NULL,
    "permission_id" TEXT NOT NULL,

    PRIMARY KEY ("role_id", "permission_id"),
    CONSTRAINT "rolePermissions_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "rolePermissions_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "permissions" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_rolePermissions" ("permission_id", "role_id") SELECT "permission_id", "role_id" FROM "rolePermissions";
DROP TABLE "rolePermissions";
ALTER TABLE "new_rolePermissions" RENAME TO "rolePermissions";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "permissions_name_key" ON "permissions"("name");
