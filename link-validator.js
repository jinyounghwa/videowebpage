
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'js/data.js');
const fileContent = fs.readFileSync(dataPath, 'utf8');

const urlRegex = /https?:\/\/[^\s'"]+/g;
const urls = fileContent.match(urlRegex) || [];
const uniqueUrls = [...new Set(urls)];

console.log(`Found ${uniqueUrls.length} unique URLs to validate.`);

async function validateUrls() {
    const results = [];
    for (const url of uniqueUrls) {
        try {
            const response = await fetch(url, { method: 'HEAD' });
            results.push({ url, status: response.status, ok: response.ok });
            console.log(`[${response.status}] ${url}`);
        } catch (error) {
            results.push({ url, status: 'FAILED', ok: false, error: error.message });
            console.error(`[FAILED] ${url} - ${error.message}`);
        }
    }
    
    const broken = results.filter(r => !r.ok);
    console.log('\n--- Validation Summary ---');
    console.log(`Total: ${results.length}`);
    console.log(`Valid: ${results.length - broken.length}`);
    console.log(`Broken: ${broken.length}`);
    
    if (broken.length > 0) {
        console.log('\nBroken Links:');
        broken.forEach(b => console.log(`- ${b.url} (${b.status})`));
    }
}

validateUrls();
