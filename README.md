# adult_desks_rewrite
Rewrite descriptions for adult sites using TotalAI bot

# Installation
Install node.js 

Go to project directory and run
npm install

# Usage

Edit config.js:
- Put your key from https://t.me/TotalAIBot 
- Change prompt. At least change number of words for description
- Put your .csv filename. It can be full path like /home/user/in_file.txt or in_file.txt for the file in current folde
- run script

#run from the project folder
node aidesk.js

#or run from the any folder
node /full/path/adult_desks_rewrite/aidesk.js

# result file
will be in updated_in.txt in the same directory near in.txt from the config

# Details
in infile script try to find columns
ALT_1|description::1|TAGS::1

if they found, they used as clue for the AI together with prompt from config.
if column description::1 exist, values will be repleced
if column description::1 does not exist, column description::1 will be added on 3th position

# execution time
For description length 20-30 words around 1 sec per 1 description.
Longer for longer descriptions.
So, for the big file better run in the screen or background of you run it in remote server, because it can take hours.

# console log
Shows current progress, source, new descriptions
Switch it of in config bu changing value to false