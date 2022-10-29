-- CreateTable
CREATE TABLE "Url" (
    "url_id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "owner_key_hash" TEXT NOT NULL,

    CONSTRAINT "Url_pkey" PRIMARY KEY ("url_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Url_url_id_key" ON "Url"("url_id");
