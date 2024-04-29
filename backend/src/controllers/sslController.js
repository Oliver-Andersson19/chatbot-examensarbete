import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);





async function certValidation(req, res) {
    const options = {
        root: path.join(__dirname + "/../../cert/")
    };
 
    const fileName = 'CA2E14A16132802AEFD4F79B917290AE.txt';

    res.sendFile(fileName, options, (err) => {
        if (err) {
            console.error('Error sending file:', err);
        } else {
            console.log('SSL Validation Sent');
        }
    });
}

export default { certValidation }