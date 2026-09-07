-- CreateTable
CREATE TABLE "Libro" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "autor" TEXT NOT NULL,
    "imagen" TEXT NOT NULL DEFAULT '',
    "precio" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Libro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Autor" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "nacionalidad" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Autor_pkey" PRIMARY KEY ("id")
);
