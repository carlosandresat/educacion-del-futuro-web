-- CreateTable
CREATE TABLE "registro" (
    "id" SERIAL NOT NULL,
    "curso" TEXT NOT NULL,
    "horario" TEXT NOT NULL,
    "nombres" TEXT NOT NULL,
    "cedula" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "genero" TEXT NOT NULL,
    "academic_year" TEXT NOT NULL,
    "colegio" TEXT NOT NULL,
    "condicion_salud" TEXT NOT NULL,
    "representante_nombres" TEXT NOT NULL,
    "representante_celular" TEXT NOT NULL,
    "representante_convencional" TEXT NOT NULL,
    "representante_email" TEXT NOT NULL,
    "representante_direccion" TEXT NOT NULL,
    "carrera" TEXT NOT NULL,
    "no_examenes" TEXT NOT NULL,
    "expectativas" TEXT NOT NULL,
    "descubierto_por" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "registro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clases_demostrativas" (
    "id" SERIAL NOT NULL,
    "curso" TEXT NOT NULL,
    "horario" TEXT NOT NULL,
    "nombres" TEXT NOT NULL,
    "cedula" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "genero" TEXT NOT NULL,
    "academic_year" TEXT NOT NULL,
    "colegio" TEXT NOT NULL,
    "condicion_salud" TEXT NOT NULL,
    "carrera" TEXT NOT NULL,
    "no_examenes" TEXT NOT NULL,
    "descubierto_por" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "clases_demostrativas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "session_token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "email_verified" TIMESTAMP(3),
    "image" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verificationtokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_provider_account_id_key" ON "accounts"("provider", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_session_token_key" ON "sessions"("session_token");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "verificationtokens_identifier_token_key" ON "verificationtokens"("identifier", "token");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
