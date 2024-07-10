const express = require('express');
const { PadesSignatureStarter, StandardSignaturePolicies, PkiExpressOperator, SignatureStarter, SignatureFinisher } = require('pki-express');
const { PadesVisualElements } = require('./PadesVisualElements');
const cors = require('cors');  // Import the CORS middleware
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');


// Set up the Express app
const app = express();
const port = 3000;
// Use CORS middleware
app.use(cors());

// Use body-parser to parse JSON bodies
app.use(bodyParser.json());

transferFile: string = "";

app.post('/start-signature', async (req, res) => {
	try {
		// Recover variables from the POST arguments to be use don this step.
		const certContent = req.body.certificateContent;

		// Get an instantiate of the PadesSignatureStarter class, responsible for
		// receiving the signature elements and start the signature process.
		const signatureStarter = new PadesSignatureStarter();

		// Trust lacuna's test certificates
		signatureStarter._trustLacunaTestRoot = true;
		
		// Set signature policy.
		signatureStarter.signaturePolicy = StandardSignaturePolicies.PADES_BASIC_WITH_LTV;
		
		// Set PDF to be signed.
		signatureStarter.setPdfToSignFromPathSync( getPdfPath());
		
		// Set Base64-encoded certificate's content to signature starter.
		signatureStarter.setCertificateFromBase64Sync(certContent);
		
		// Set a file reference for the stamp file. Note that this file can be
		// referenced later by "fref://{alias}" at the "url" field on the
		// visual representation (see public/vr.json or
		// getVisualRepresentation() method).
		signatureStarter.addFileReferenceSync('stamp', path.resolve("./PdfStamp.png"));
		
		// Set the visual representation. We provided a dictionary that
		// represents the visual representation JSON model.
		signatureStarter
		.setVisualRepresentationSync(PadesVisualElements.getVisualRepresentation());
		
		// Start the signature process.
		const signatureResult = await signatureStarter.start();
		transferFile = signatureResult.transferFile;
		return res.json(signatureResult);
	} catch (error) {
		console.error('An error occurred:', error);
		res.status(500).send('An error occurred while starting the signature process');
	}
});

app.post('/finish-signature', async (req, res) => {
	try {
		// Recover variables from the POST arguments to be used on this step.
		const signature = req.body.signature.signedHash;
		
		// Get an instance of the PadesSignatureFinisher class, responsible for
		// completing the signature process.
		const signatureFinisher = new SignatureFinisher();
		// Trust lacuna's test certificates
		signatureFinisher._trustLacunaTestRoot = true;
		
		// Set PDF to be signed. It's the same file we used on "start" step.
		signatureFinisher.setFileToSignFromPathSync(getPdfPath());
		
		// Set transfer file.
		signatureFinisher.setTransferFileFromPathSync(transferFile);
		
		// Set signature.
		signatureFinisher.signature = signature;
		// Set to get certificate
		
		// Generate path for output file and add the signature finisher.
		const outputFileName = `${uuidv4()}.pdf`;
		const outputFilePath = process.cwd() + '\\output\\';
		const fullPath = `${outputFilePath}${outputFileName}`
		fs.access(outputFilePath, (err) => {
			if (err) {
				fs.mkdir(outputFilePath, (err) => {
					if (err) {
						console.error('Error when trying to create directory:', err);
					} else {
						console.log('Directory created with success');
					}
				});
			}
		});
		signatureFinisher.outputFile = fullPath

		// boolean to return certificate information after performing the signature
		getCertInfo = true;
	
		// Complete the signature process.
		const signatureResult = await signatureFinisher.complete(getCertInfo);
		console.log(`Signature completed! Signed file available in ${outputFilePath}`)

		return res.json(signatureResult);
		} catch (error) {
			console.error('An error occurred:', error);
			res.status(500).send('An error occurred while finishing the signature process');
		}
});

function getPdfPath() {
	return path.resolve("./SampleDocument.pdf");
}

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}/`);
});

