

import { test, expect } from "@playwright/test";
import fs from 'fs';

//utility function returns json file data
function readJson(filePath: string) {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

test('Verify the Patch Operation', async ({ request }) => {

    

    const requestBody = readJson('testdata/PostRequest.json');
    const createResponse = await request.post('/booking', { data:requestBody });

    expect(createResponse.ok()).toBeTruthy();

    const responsebody = await createResponse.json();

    console.log(responsebody);
    const bookingid = responsebody.bookingid;   // extracting bookingid from the response body
    console.log("Booking id", bookingid);

    

    const tokenrequestBody = readJson('testdata/Token.json');
    const tokenresponse = await request.post('/auth', { data: tokenrequestBody });
    expect(tokenresponse.ok()).toBeTruthy();

    const tokenresponsebody = await tokenresponse.json();
    const token = tokenresponsebody.token;
    console.log("Token", token);


    
     const patchRequestbody = readJson('testdata/PatchRequest.json');
    const partialupdateresponse=await request.patch(`/booking/${bookingid}`,
                       {
                        headers:{"Cookie":`token=${token}`},
                        data:patchRequestbody
                        }
                     );

    expect(partialupdateresponse.ok()).toBeTruthy();
    expect(partialupdateresponse.status()).toBe(200);

    const partialupdateresponsebody=await partialupdateresponse.json();
    console.log(partialupdateresponsebody)
     console.log("Booking details updated succesfully")               
    

})



