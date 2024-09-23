// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema
 
// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?
// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init
 
generator client {
  provider = "prisma-client-js"
}
 
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
 
model Customer {
  customerId       Int            @id
  password         String?
  customerName     String
  customerMail     String         @unique
  customerPhone    String
  customerCurrPlan Int
  plansList        CustomerPlan[] // Reference to the join table
  invoiceList      Invoice[]
}
 
model Plan {
  planId        Int            @id
  planName      String
  ratePerUnit   Float
  description   String         @default("basic plan")
  billingCycle  String
  prepaidPlans  PrepaidPlan[]
  postpaidPlans PostpaidPlan[]
  invoices      Invoice[]
  customers     CustomerPlan[] // Reference to the join table
}
 
model CustomerPlan {
  id             Int      @id @default(autoincrement())
  customerId     Int
  planId         Int
  datePurchased  DateTime @default(now()) // Automatically sets the current time as default
  activationDate DateTime
  dueDate        DateTime
  customer       Customer @relation(fields: [customerId], references: [customerId])
  plan           Plan     @relation(fields: [planId], references: [planId])
 
  @@unique([customerId, planId]) // Ensure unique customer-plan pairs
}
 
model PrepaidPlan {
  id             Int    @id @default(autoincrement())
  planId         Int
  unitsAvailable Float
  prepaidBalance Float
  billingCycle   String
  plan           Plan   @relation(fields: [planId], references: [planId])
}
 
model PostpaidPlan {
  id           Int    @id @default(autoincrement())
  planId       Int
  unitsUsed    Float
  billingCycle String
  plan         Plan   @relation(fields: [planId], references: [planId])
}
 
model Invoice {
  invoiceId    Int      @id
  customerName String
  customerId   Int
  planId       Int
  units        Int
  date         DateTime
  status       String?  @default("null")
  amount       Float
  planType     PlanType
  customer     Customer @relation(fields: [customerId], references: [customerId])
  plan         Plan     @relation(fields: [planId], references: [planId])
}
 
enum PlanType {
  PREPAID
  POSTPAID
}
 
