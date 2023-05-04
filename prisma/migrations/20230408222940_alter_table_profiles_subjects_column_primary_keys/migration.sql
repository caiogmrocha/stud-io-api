/*
  Warnings:

  - The primary key for the `profiles_subjects` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `profileId` on the `profiles_subjects` table. All the data in the column will be lost.
  - You are about to drop the column `subjectId` on the `profiles_subjects` table. All the data in the column will be lost.
  - Added the required column `profile_id` to the `profiles_subjects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subject_id` to the `profiles_subjects` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `profiles_subjects` DROP FOREIGN KEY `profiles_subjects_profileId_fkey`;

-- DropForeignKey
ALTER TABLE `profiles_subjects` DROP FOREIGN KEY `profiles_subjects_subjectId_fkey`;

-- AlterTable
ALTER TABLE `profiles_subjects` DROP PRIMARY KEY,
    DROP COLUMN `profileId`,
    DROP COLUMN `subjectId`,
    ADD COLUMN `profile_id` CHAR(36) NOT NULL,
    ADD COLUMN `subject_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`profile_id`, `subject_id`);

-- AddForeignKey
ALTER TABLE `profiles_subjects` ADD CONSTRAINT `profiles_subjects_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `profiles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `profiles_subjects` ADD CONSTRAINT `profiles_subjects_subject_id_fkey` FOREIGN KEY (`subject_id`) REFERENCES `subjects`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
