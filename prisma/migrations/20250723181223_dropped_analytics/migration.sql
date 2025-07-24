/*
  Warnings:

  - You are about to drop the column `last_login_at` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `AnalyticsEvent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `daily_analytics` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AnalyticsEvent" DROP CONSTRAINT "AnalyticsEvent_todoId_fkey";

-- DropForeignKey
ALTER TABLE "AnalyticsEvent" DROP CONSTRAINT "AnalyticsEvent_userId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "last_login_at";

-- DropTable
DROP TABLE "AnalyticsEvent";

-- DropTable
DROP TABLE "daily_analytics";
