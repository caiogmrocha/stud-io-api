-- AlterTable
ALTER TABLE `password_recovery` MODIFY `send_code_token` VARCHAR(600) NOT NULL,
    MODIFY `change_password_token` VARCHAR(600) NULL;
