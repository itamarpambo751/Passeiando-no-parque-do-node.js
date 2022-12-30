-- CreateTable
CREATE TABLE "role" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "permitions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PermitionToRole" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_PermitionToRole_A_fkey" FOREIGN KEY ("A") REFERENCES "permitions" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_PermitionToRole_B_fkey" FOREIGN KEY ("B") REFERENCES "role" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "role_name_key" ON "role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "permitions_name_key" ON "permitions"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_PermitionToRole_AB_unique" ON "_PermitionToRole"("A", "B");

-- CreateIndex
CREATE INDEX "_PermitionToRole_B_index" ON "_PermitionToRole"("B");
