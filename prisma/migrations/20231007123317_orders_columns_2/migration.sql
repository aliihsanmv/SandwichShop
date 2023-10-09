/*
  Warnings:

  - Added the required column `deliveryMode` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order` ADD COLUMN `deliveryAddress` JSON NULL,
    ADD COLUMN `deliveryMode` INTEGER NOT NULL;
