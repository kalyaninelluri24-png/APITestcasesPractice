import { test, expect } from '@playwright/test';
import requestBody from 'C:/Users/sanellur/APITESTCASEPW/TestData/PostRequest.json';

test("verify Post request response", async ({ request }) => {

    const response = await request.post('/booking', {
        data: requestBody
    });

    const responseBody = await response.json();

    console.log(responseBody);

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    expect(responseBody).toHaveProperty('bookingid');
});