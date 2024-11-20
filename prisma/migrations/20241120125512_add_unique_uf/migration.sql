/*
  Warnings:

  - A unique constraint covering the columns `[uf]` on the table `tb_estado` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "tb_estado_uf_idx";

-- CreateIndex
CREATE UNIQUE INDEX "tb_estado_uf_key" ON "tb_estado"("uf");
