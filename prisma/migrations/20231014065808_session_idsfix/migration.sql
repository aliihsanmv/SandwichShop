/*
  Warnings:

  - You are about to drop the column `sessionId` on the `cartitem` table. All the data in the column will be lost.
  - Added the required column `sessionId` to the `cart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cart` ADD COLUMN `sessionId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `cartitem` DROP COLUMN `sessionId`;
