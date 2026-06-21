import { test , expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
test("verify the get Response",async ({request}) => {
    const bookingId='2244';
    const response=await request.get(`/booking?bookingID=2241`);
    const responseBody=await response.json();
expect(response.ok).toBeTruthy;
expect(response.status()).toBe(200);
console.log(response);
    
})

test("test GetBookingIdsByName",async ({request}) => {
   const firstname="Kalyani";
   const response=await request.get(`/booking?firstname=${firstname}`);
   const responseBody=await response.json();
   
   expect(response.ok).toBeTruthy();
   expect(response.status()).toBe(200);
   console.log(responseBody);
})
   test("test response by booking Date",async ({request}) => {
    const checkin='2026-06-14'
    const response= await request.get(`/booking?checkin=${checkin}`);
   expect(response.ok).toBeTruthy();
   expect(response.status()).toBe(200);
   console.log(response);
   })

   //for testing git push