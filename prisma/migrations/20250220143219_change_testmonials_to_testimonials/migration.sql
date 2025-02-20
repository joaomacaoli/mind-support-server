/*
  Warnings:

  - You are about to drop the `Testmonials` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Testmonials";

-- CreateTable
CREATE TABLE "Testimonials" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Testimonials_pkey" PRIMARY KEY ("id")
);
