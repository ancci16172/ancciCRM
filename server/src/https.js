import https from "https";
import { _dirname } from "./lib/dirname.js";
import app from "./app.js";
import fs from "fs";
import path from "path";

const dirName = _dirname(import.meta.url);

const privateKey = fs.readFileSync(path.join(dirName,"..", "..", "..", "certificados", 'blancogusmar.com.key'), 'utf8');

const certificate = fs.readFileSync(path.join(dirName,"..", "..", "..", "certificados", 'blancogusmar.com.crt'), 'utf8');

const credentials = { key: privateKey, cert: certificate, 
    ca: [
        fs.readFileSync(path.join(dirName, "..","..", "..", "certificados", 'SectigoRSADomainValidationSecureServerCA.crt'), 'utf8')
    ]
 };


const httpsServer = https.createServer(credentials, app);


export default httpsServer
