# FaceAI

Фронтенд для сервиса по сравнению лиц на фотографиях с использованием искусственного интеллекта. Написан на реакте с ручной настройкой вебпака по БЭМ

## Запуск

Нужно склонировать репозиторий, поставить зависимости и запустить дев сервер

`git clone https://github.com/DEsimas/FaceAI`

`cd FaceAI`

`npm i`

`npm run serve:dev`

## Настройка

Дополнительно можно создать .env файл, где можно сконфигурировать ограничения по загружаемым файлам и адрес, где хостится приложение

```
URL=http://localhost:9000
MAXIMUM_AMOUNT_OF_SELECTED_FACES=10
MAXIMUM_FILE_SIZE_BYTES=268435456
ALLOWED_FILE_EXTENSIONS=png,jpg,jpeg
```

## Preview

<img src="./repository\assets\preview.png" alt="preview">
