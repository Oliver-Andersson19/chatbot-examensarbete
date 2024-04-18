import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);





async function certValidation(req, res) {
    const options = {
        root: path.join(__dirname + "/../../cert/")
    };
 
    const fileName = '7D4287E8977AE9477B619F5D32DF9A1F.txt';

    res.sendFile(fileName, options, (err) => {
        if (err) {
            console.error('Error sending file:', err);
        } else {
            console.log('SSL Validation Sent');
        }
    });
}

export default { certValidation }