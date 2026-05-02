/*
  Warnings:

  - Added the required column `purpose` to the `attendances` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "AttendanceStatus" ADD VALUE 'RECOVERED';

-- AlterTable
ALTER TABLE "attendances" ADD COLUMN     "purpose" TEXT NOT NULL;
