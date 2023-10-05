/*
  Warnings:

  - Added the required column `menuItemId` to the `CartItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cartitem` ADD COLUMN `menuItemId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `CartItem` ADD CONSTRAINT `CartItem_menuItemId_fkey` FOREIGN KEY (`menuItemId`) REFERENCES `MenuItem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
