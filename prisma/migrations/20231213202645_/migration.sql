/*
  Warnings:

  - A unique constraint covering the columns `[text]` on the table `Posts` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Posts" ALTER COLUMN "likes" SET DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "Posts_text_key" ON "Posts"("text");
