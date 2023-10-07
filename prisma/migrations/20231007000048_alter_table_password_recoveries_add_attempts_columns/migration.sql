-- AlterTable
ALTER TABLE `password_recovery` ADD COLUMN `attempts` INTEGER NOT NULL DEFAULT 0;
