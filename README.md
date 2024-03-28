# adult_desks_rewrite 
Рерайт адалт десков с использованием бота TotalAI 

# Установка 
Установите node.js 
Перейдите в каталог проекта и запустите npm install 

# Использование 
Отредактируйте config.js: 
- Вставьте свой ключ из https://t.me/TotalAIBot 
- Измените prompt. Как минимум, измените количество слов для описания 
- Вставьте имя своего файла .csv. Это может быть полный путь, например /home/user/in_file.txt, или in_file.txt для файла в текущей папке 

#запуск из папки проекта 
node aidesk.js 

#или запуск из любой папки 
node /full/path/adult_desks_rewrite/aidesk.js 

# Результирующий файл будет в updated_in.txt в том же каталоге рядом с in.txt из config 

# Подробности 
В исходном файле скрипт пытается найти столбцы ALT_1|description::1|TAGS::1 
Если они найдены, они используются как подсказка для ИИ вместе с prompt из config. 

Если существует столбец description::1, значения будут заменены 
Если столбца description::1 не существует, столбец description::1 будет добавлен на 3-ю позицию 

# Время выполнения 
Для длины описания 20-30 слов примерно 1 сек на 1 описание. 
Дольше для более длинных описаний. 
Для большого файла лучше запускать в screen или в фоновом режиме, если вы запускаете его на удаленном сервере, так как это может занять часы. 

# Консольный лог 
Показывает текущий прогресс, источник, новые описания Отключите его в config, изменив значение на false

================ English version ============

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