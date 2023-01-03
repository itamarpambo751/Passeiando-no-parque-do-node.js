/*
  Warnings:

  - You are about to drop the `RolePermitons` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "RolePermitons";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "rolePermitions" (
    "role_id" TEXT NOT NULL,
    "permition_id" TEXT NOT NULL,

    PRIMARY KEY ("role_id", "permition_id"),
    CONSTRAINT "rolePermitions_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "rolePermitions_permition_id_fkey" FOREIGN KEY ("permition_id") REFERENCES "permitions" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "userRoles" (
    "user_id" TEXT NOT NULL,
    "role_id" TEXT NOT NULL,

    PRIMARY KEY ("user_id", "role_id"),
    CONSTRAINT "userRoles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "userRoles_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
