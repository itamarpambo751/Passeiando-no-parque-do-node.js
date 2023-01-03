/*
  Warnings:

  - You are about to drop the `_PermitionToRole` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_RoleToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_PermitionToRole";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_RoleToUser";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "RolePermitons" (
    "role_id" TEXT NOT NULL,
    "permition_id" TEXT NOT NULL,

    PRIMARY KEY ("role_id", "permition_id"),
    CONSTRAINT "RolePermitons_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "role" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "RolePermitons_permition_id_fkey" FOREIGN KEY ("permition_id") REFERENCES "permitions" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
