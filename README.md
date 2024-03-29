# FaceAI

Фронтенд для сервиса по сравнению лиц на фотографиях с использованием искусственного интеллекта. Написан на реакте с ручной настройкой вебпака по БЭМ

## Запуск

Нужно склонировать репозиторий, поставить зависимости и запустить дев сервер

`git clone https://github.com/DEsimas/FaceAI`

`cd FaceAI`

`pnpm i`

`pnpm hooks`

`pnpm serve:dev`

## Настройка

Настроить приложение можно путем задания переменных окружения в .env файле

```
URL=http://localhost:9000 # Куда будут отправляться запросы к API
MAXIMUM_AMOUNT_OF_SELECTED_FACES=10 # Максимальное количесво одновременно выбранных лиц
MAXIMUM_FILE_SIZE_BYTES=268435456 # Максимальный размер файла в байтах
ALLOWED_FILE_EXTENSIONS=png,jpg,jpeg # Расширения файлов, которые можно загружать
USE_MOCK=false # false - делать запросы к серверу, true - дев режим с захардкоженными значениями
MAX_IMAGE_HEIGHT=500 # Максимальная высота строки галлереи изображений
MIN_IMAGE_HEIGHT=300 # Минимальнай высота строки галлереи изображений
```

## Preview

<img src="./repository\assets\load.png" alt="load">
<img src="./repository\assets\select.png" alt="select">
<img src="./repository\assets\result.png" alt="result">
