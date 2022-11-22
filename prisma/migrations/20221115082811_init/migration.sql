/*
  Warnings:

  - You are about to drop the column `owner_key_hash` on the `Url` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Url" DROP COLUMN "owner_key_hash";
