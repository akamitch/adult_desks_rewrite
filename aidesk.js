//import OpenAI from "openai";
const OpenAI = require('openai');
const config = require('./config.js');

// Function to generate a new description based on ALT_1, Description, and TAGS
async function generateNewDescription(alt1, description, tags) {
    const prompt = config.prompt;
    const clues = `${alt1} ${description} ${tags}`;
    const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: `${prompt} ${clues}` }],
      });
  const newDescription = completion.choices[0].message.content;
  return newDescription;
}

// Function to process the CSV file
async function processCSV(csvFilePath) {
    const start = new Date();  
    const csvData = fs.readFileSync(csvFilePath, 'utf8');
    const lines = csvData.split('\n');
  
    const headerRow = lines[0].split('|');
    const alt1Index = headerRow.indexOf('ALT_1');
    const descriptionIndex = headerRow.indexOf('description::1');
    const tagsIndex = headerRow.indexOf('TAGS::1');

    if (descriptionIndex === -1) { 
        //Field 'description::1' does not exist in input file and need to be added after 'ALT_1' (position 2)
        headerRow.splice(2, 0, 'description::1');
    }
  
    const updatedLines = [];
    for (let i = 1; i < lines.length; i++) {
      const row = lines[i].split('|');
      if (row.length > 1) {
        let alt1 = '';
        if (alt1Index !== -1) { 
            alt1 = row[alt1Index]; 
        }
        let description = '';
        if (descriptionIndex !== -1) { 
            description = row[descriptionIndex];
        }
        
        let tags = '';
        if (tagsIndex !== -1) { 
            tags = row[tagsIndex];
        }
        
        //console.log(`alt: ${alt1} description: ${description} tags: ${tags}`);
        const newDescription = await generateNewDescription(alt1, description, tags);

        if (config.showLog) {
            console.log(`row ${i} from total ${lines.length -1}`);
            console.log(`Alt1: ${alt1}`);
            console.log(`Tags: ${tags}`);
            console.log(`Old description: ${description}`);
            console.log(`New description: ${newDescription}`);
        }

        if (descriptionIndex !== -1) { 
            //Field 'description::1' exist in input file
            row[descriptionIndex] = newDescription;
        } else {
            row.splice(2, 0, newDescription);
        }

        
        updatedLines.push(row.join('|'));
      }
    }
  
    const newCsvData = [headerRow.join('|'), ...updatedLines].join('\n');
    const newCsvFilePath = path.join(path.dirname(csvFilePath), `updated_${path.basename(csvFilePath)}`);
    fs.writeFileSync(newCsvFilePath, newCsvData);
  
    console.log(`Updated CSV file saved as ${newCsvFilePath}`);

    const end = new Date();
    const timeToProcess = end.getTime() - start.getTime(); //milliseconds
    const sec = Math.round(timeToProcess / 1000);
    console.log(`Time: ${sec} sec. Total ${lines.length - 1} rows`);
  }

const openai = new OpenAI({
    apiKey: `${config.apiKey}`,
    baseURL: `${config.baseURL}`,
    dangerouslyAllowBrowser: true,
});

const fs = require('fs');
const path = require('path');

processCSV(config.inFile);


//head -n 3 ../93_84k_top_ai_no_desc0.txt > in.txt
