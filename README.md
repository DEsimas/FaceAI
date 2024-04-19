# FaceAI

Фронтенд для сервиса по сравнению лиц на фотографиях с использованием искусственного интеллекта. Написан на реакте с ручной настройкой вебпака по БЭМ

## Запуск

Нужно склонировать репозиторий, поставить зависимости, в .env файле задать переменную API (см. паздел "настройка") и запустить дев сервер

`git clone https://github.com/DEsimas/FaceAI`

`cd FaceAI`

`pnpm i`

`pnpm hooks`

`pnpm serve:dev`

## Настройка

В .env файле нужно указать следующие переменные:

```
# Порт, на котором будет работать веб-сервер
PORT=9000

# Сюда приложение будет отправлять запросы
# Подразумевается, что это тот адрес, на котором хостится приложение
# И там стоит прокси сервер, который перенаправляет запросы на InsightFace-REST API
URL=https://facecompare.com

# Адрес InsightFace-REST API, на него прокси будет переводить запросы
API=http://backend:9000

# true - использовать захардкоженные данные как ответы на запросы
# false - делать запросы к серверу
USE_MOCK=false

# id для подключения яндекс метрики
YANDEX_METRIKA_ID=12345678

MAXIMUM_AMOUNT_OF_SELECTED_FACES=10 # Максимальное количесво одновременно выбранных лиц
MAXIMUM_FILE_SIZE_BYTES=20000000 # Максимальный размер файла в байтах
ALLOWED_FILE_EXTENSIONS=png,jpg,jpeg,webp,bmp,jpe,jif,jfif,pjpeg,pjp # Расширения файлов, которые можно загружать
MAX_IMAGE_HEIGHT=500 # Максимальная высота строки галлереи изображений
MIN_IMAGE_HEIGHT=300 # Минимальнай высота строки галлереи изображений
DISABLE_WIDGET=true # true - отключает перетаскивание и изменение размера виджета
```

## Preview

<img src="./repository/assets/load.png" alt="load">
<img src="./repository/assets/select.png" alt="select">
<img src="./repository/assets/result.png" alt="result">
<img src="./repository/assets/fullscreen.png" alt="fullscreen">
