-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "refreshToken" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_pais" (
    "id" SERIAL NOT NULL,
    "pais" VARCHAR(50) NOT NULL,
    "sigla" VARCHAR(2) NOT NULL,
    "codigo" INTEGER NOT NULL,
    "continente" VARCHAR(20) NOT NULL,

    CONSTRAINT "tb_pais_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_regiao" (
    "id" SERIAL NOT NULL,
    "regiao" VARCHAR(50) NOT NULL,

    CONSTRAINT "tb_regiao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_estado" (
    "id" SERIAL NOT NULL,
    "codigo_uf" INTEGER NOT NULL,
    "estado" VARCHAR(50) NOT NULL,
    "estado_oficial" VARCHAR(50) NOT NULL,
    "uf" CHAR(2) NOT NULL,
    "regiao_id" INTEGER NOT NULL,
    "pais_id" INTEGER NOT NULL,

    CONSTRAINT "tb_estado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_municipio" (
    "id" SERIAL NOT NULL,
    "codigo" INTEGER NOT NULL,
    "cidade" VARCHAR(60) NOT NULL,
    "uf" CHAR(2) NOT NULL,
    "estado_id" INTEGER NOT NULL,

    CONSTRAINT "tb_municipio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_bairro" (
    "id" SERIAL NOT NULL,
    "codigo" INTEGER NOT NULL,
    "bairro" VARCHAR(60) NOT NULL,
    "cidade_id" INTEGER NOT NULL,

    CONSTRAINT "tb_bairro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_cep" (
    "id" SERIAL NOT NULL,
    "cep" VARCHAR(8) NOT NULL,
    "logradouro" VARCHAR(255) NOT NULL,
    "faixa_cep" VARCHAR(255) NOT NULL,
    "bairro" VARCHAR(60) NOT NULL,
    "cidade_id" INTEGER NOT NULL,
    "estado_id" INTEGER NOT NULL,

    CONSTRAINT "tb_cep_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tb_pais_pais_key" ON "tb_pais"("pais");

-- CreateIndex
CREATE UNIQUE INDEX "tb_pais_sigla_key" ON "tb_pais"("sigla");

-- CreateIndex
CREATE INDEX "tb_pais_codigo_idx" ON "tb_pais"("codigo");

-- CreateIndex
CREATE INDEX "tb_pais_sigla_idx" ON "tb_pais"("sigla");

-- CreateIndex
CREATE UNIQUE INDEX "tb_regiao_regiao_key" ON "tb_regiao"("regiao");

-- CreateIndex
CREATE INDEX "tb_estado_uf_idx" ON "tb_estado"("uf");

-- CreateIndex
CREATE INDEX "tb_municipio_uf_idx" ON "tb_municipio"("uf");

-- CreateIndex
CREATE INDEX "tb_cep_cep_idx" ON "tb_cep"("cep");

-- AddForeignKey
ALTER TABLE "tb_estado" ADD CONSTRAINT "tb_estado_regiao_id_fkey" FOREIGN KEY ("regiao_id") REFERENCES "tb_regiao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_estado" ADD CONSTRAINT "tb_estado_pais_id_fkey" FOREIGN KEY ("pais_id") REFERENCES "tb_pais"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_municipio" ADD CONSTRAINT "tb_municipio_estado_id_fkey" FOREIGN KEY ("estado_id") REFERENCES "tb_estado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_bairro" ADD CONSTRAINT "tb_bairro_cidade_id_fkey" FOREIGN KEY ("cidade_id") REFERENCES "tb_municipio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_cep" ADD CONSTRAINT "tb_cep_cidade_id_fkey" FOREIGN KEY ("cidade_id") REFERENCES "tb_municipio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_cep" ADD CONSTRAINT "tb_cep_estado_id_fkey" FOREIGN KEY ("estado_id") REFERENCES "tb_estado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
