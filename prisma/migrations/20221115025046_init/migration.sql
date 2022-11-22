/*
  Warnings:

  - The primary key for the `Url` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `url_id` on the `Url` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `Url` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id` to the `Url` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Url_url_id_key";

-- AlterTable
ALTER TABLE "Url" DROP CONSTRAINT "Url_pkey",
DROP COLUMN "url_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Url_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Url_id_key" ON "Url"("id");
