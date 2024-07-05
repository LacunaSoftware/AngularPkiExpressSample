# Pki Express Angular Sample
## Description
This is a Lacuna's PKI Express sample for PAdES signature using Angular as front end. For the back end, we have a nodejs express app which performs the signature using
[Node.js Lacuna PKI Express client library](https://www.npmjs.com/package/pki-express). The files generated are available in the `pkiExpress-NodeApp/output` folder. 
## Installation
To be able to run this application you must have Node.js and Lacuna's PKI Express installed.
To install all dependencies, simply run `npm install` in both the `angular-pkisuitesamples-pkiexpress` folder and the `pkiExpress-NodeApp`

## Running
You need to run two applications to use this sample correctly:
1. Go to the `angular-pkisuitesamples-pkiexpress` folder and run `npm start` for the angular app
2. Go to the `pkiExpress-NodeApp` folder and run `node app.js` for the nodejs app
3. Enter `localhost:4200` on your browser and select the certificate. Then click 'Sign file'. Authorize your certificate to perform the signature.
4. Navigate to the `pkiExpress-NodeApp\output\` and open the signed file.

In case any error occurs, it should appear on the browser console or the node app console. 
For further assistance, please contact us at [suporte@lacunasoftware.com](suporte@lacunasoftware.com)