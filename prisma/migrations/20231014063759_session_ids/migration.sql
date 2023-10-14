/*
  Warnings:

  - Added the required column `sessionId` to the `cartitem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ingredients` to the `menuitem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `menuitem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sessionId` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `orderitem` DROP FOREIGN KEY `OrderItem_menuItemId_fkey`;

-- DropForeignKey
ALTER TABLE `orderitem` DROP FOREIGN KEY `OrderItem_orderId_fkey`;

-- AlterTable
ALTER TABLE `cartitem` ADD COLUMN `sessionId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `menuitem` ADD COLUMN `ingredients` JSON NOT NULL,
    ADD COLUMN `rating` DECIMAL(65, 30) NOT NULL;

-- AlterTable
ALTER TABLE `order` ADD COLUMN `sessionId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `orderitem` ADD CONSTRAINT `orderitem_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orderitem` ADD CONSTRAINT `orderitem_menuItemId_fkey` FOREIGN KEY (`menuItemId`) REFERENCES `menuitem`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
