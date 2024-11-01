/*
  Warnings:

  - Added the required column `uf` to the `tb_bairro` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tb_bairro" ADD COLUMN     "uf" CHAR(2) NOT NULL;
