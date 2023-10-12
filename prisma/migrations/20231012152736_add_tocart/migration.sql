-- CreateTable
CREATE TABLE "addToCart" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,

    CONSTRAINT "addToCart_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "addToCart" ADD CONSTRAINT "addToCart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "addToCart" ADD CONSTRAINT "addToCart_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
