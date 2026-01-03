const fs = require('fs');
const path = require('path');
const envPath = path.join(__dirname, '.env');

try {
    let content = fs.readFileSync(envPath, 'utf8');
    const oldHash = '$2a$10$QTw7aHT61Yj/fwJA8EBCgO/vQIaEmYbLAuVXR37iZUyTK5rDVdMXu';
    const newHash = '$2a$10$1./LKtnh0op96mjwB2lJaeWrMOun4UyTorr7PSFJZBg9fmjMP.jKO'; // admin123

    if (content.includes(oldHash)) {
        content = content.replace(oldHash, newHash);
        fs.writeFileSync(envPath, content);
        console.log('Password reset successfully');
    } else {
        console.log('Old hash not found, attempting to find any ADMIN_PASSWORD line');
        const regex = /ADMIN_PASSWORD=.*/;
        if (regex.test(content)) {
            content = content.replace(regex, `ADMIN_PASSWORD=${newHash}`);
            fs.writeFileSync(envPath, content);
            console.log('Password reset by regex successfully');
        } else {
            console.log('ADMIN_PASSWORD variable not found in .env');
        }
    }
} catch (error) {
    console.error('Error:', error.message);
}
