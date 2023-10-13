/*
  Warnings:

  - Added the required column `menuItemId` to the `CartItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cartitem` ADD COLUMN `menuItemId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `cartitem` ADD CONSTRAINT `cartitem_menuItemId_fkey` FOREIGN KEY (`menuItemId`) REFERENCES `menuitem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
