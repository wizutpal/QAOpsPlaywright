import { test as baseTest } from '@playwright/test'

interface testDataForOrder {
    productName: string,
            username:  string,
            password:  string
};

export const customTest= baseTest.extend<{testDataForOrder: testDataForOrder}>(
    {
        testDataForOrder :
        {
             productName: "ZARA COAT 3",
            username: "utpal2@gmail.com",
            password: "Pasword@123"
        }
    }
)