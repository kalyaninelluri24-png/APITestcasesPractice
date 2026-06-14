/*

Pre-requisites:
    data: json file
    create token

1) Create a booking (Post) ---> bookingId
2) Update booking (Put)   // required token

*/

import { test, expect } from "@playwright/test";
import fs from 'fs';

//utility function returns json file data
function readJson(filePath: string) {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

test('Verify update booking Id', async ({ request }) => {

    

    const requestBody = readJson('testdata/PostRequest.json');
    
    const createResponse = await request.post('/booking', { data:requestBody });

    expect(createResponse.ok()).toBeTruthy();

    const responsebody = await createResponse.json();

    console.log(responsebody);
    const bookingid = responsebody.bookingid;   
    console.log("Booking id======>", bookingid);

   
    const tokenrequestBody = readJson('testdata/Token.json');
    const tokenresponse = await request.post('/auth', { data: tokenrequestBody });
    expect(tokenresponse.ok()).toBeTruthy();

    const tokenresponsebody = await tokenresponse.json();
    const token = tokenresponsebody.token;
    console.log("Token ======>", token);


   
     const updateRequestbody = readJson('testdata/PutRequest.json');
    const updateresponse=await request.put(`/booking/${bookingid}`,
                       {
                        headers:{"Cookie":`token=${token}`},
                        data:updateRequestbody
                        }
                     );

    expect(updateresponse.ok()).toBeTruthy();
    expect(updateresponse.status()).toBe(200);

    const updateresponsebody=await updateresponse.json();
    console.log(updateresponsebody)
     console.log("Booking details updated succesfully...")               
    

})



