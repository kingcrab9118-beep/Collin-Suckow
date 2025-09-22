-- CreateTable
CREATE TABLE "ExhibitHeartbeat" (
    "id" SERIAL NOT NULL,
    "receivedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExhibitHeartbeat_pkey" PRIMARY KEY ("id")
);
