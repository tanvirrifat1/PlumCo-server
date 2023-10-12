-- CreateTable
CREATE TABLE "review" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "review" TEXT NOT NULL,
    "rating" TEXT NOT NULL,

    CONSTRAINT "review_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
