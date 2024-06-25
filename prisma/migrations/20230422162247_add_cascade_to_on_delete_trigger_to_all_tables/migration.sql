-- DropForeignKey
ALTER TABLE `profiles_subjects` DROP FOREIGN KEY `profiles_subjects_profile_id_fkey`;

-- DropForeignKey
ALTER TABLE `profiles_subjects` DROP FOREIGN KEY `profiles_subjects_subject_id_fkey`;

-- DropForeignKey
ALTER TABLE `students` DROP FOREIGN KEY `students_profileId_fkey`;

-- DropForeignKey
ALTER TABLE `teachers` DROP FOREIGN KEY `teachers_profileId_fkey`;

-- AddForeignKey
ALTER TABLE `students` ADD CONSTRAINT `students_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `teachers` ADD CONSTRAINT `teachers_profileId_fkey` FOREIGN KEY (`profileId`) REFERENCES `profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `profiles_subjects` ADD CONSTRAINT `profiles_subjects_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `profiles_subjects` ADD CONSTRAINT `profiles_subjects_subject_id_fkey` FOREIGN KEY (`subject_id`) REFERENCES `subjects`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
