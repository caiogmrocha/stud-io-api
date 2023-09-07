-- CreateTable
CREATE TABLE `password_recovery` (
    `id` CHAR(36) NOT NULL,
    `profile_id` CHAR(36) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `send_code_token` VARCHAR(191) NOT NULL,
    `change_password_token` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `expires_at` DATETIME(3) NULL,
    `recovered_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `password_recovery` ADD CONSTRAINT `password_recovery_profile_id_fkey` FOREIGN KEY (`profile_id`) REFERENCES `profiles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
