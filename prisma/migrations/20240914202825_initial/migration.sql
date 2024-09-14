/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Attendee` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Attendee` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the `_AttendeeToEvent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_AttendeeToEvent" DROP CONSTRAINT "_AttendeeToEvent_A_fkey";

-- DropForeignKey
ALTER TABLE "_AttendeeToEvent" DROP CONSTRAINT "_AttendeeToEvent_B_fkey";

-- AlterTable
ALTER TABLE "Attendee" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- DropTable
DROP TABLE "_AttendeeToEvent";
