/*
  Warnings:

  - You are about to drop the column `price` on the `productvariants` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "productvariants" DROP COLUMN "price",
ALTER COLUMN "size" DROP NOT NULL;
