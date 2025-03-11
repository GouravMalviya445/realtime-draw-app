/*
  Warnings:

  - You are about to drop the column `receiverId` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the column `senderId` on the `Chat` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_receiverId_fkey";

-- DropForeignKey
ALTER TABLE "Chat" DROP CONSTRAINT "Chat_senderId_fkey";

-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "receiverId",
DROP COLUMN "senderId",
ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
