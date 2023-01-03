/*
  Warnings:

  - You are about to drop the `rolePermitions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "rolePermitions";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "rolePermissions" (
    "role_id" TEXT NOT NULL,
    "permission_id" TEXT NOT NULL,

    PRIMARY KEY ("role_id", "permission_id"),
    CONSTRAINT "rolePermissions_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "rolePermissions_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "permitions" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
