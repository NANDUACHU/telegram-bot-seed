# Telegram.org Bot - NodeJS Seed

Telegram is amazing and gives us the possibility to insert a bot as a service inside this messenger.

## Authorize Bot

you have to register a new bot inside the telegram application

follow the introductions on [telegram.org](https://core.telegram.org/bots)

## Register Webhook

telegram needs an callback url, if anyone is typing in an command inside the bot chat

    https://api.telegram.org/bot{yourBotToken}/setWebhook?url=https://yourdomain.tld/bot/

## Install Bot dependencies

if you dont have, you must install nodejs

use brew on mac

    $ brew install nodejs

run NodeJS Package Manager

    $ npm install

## Start Bot Server

    $ npm start

or

    $ node server.js

## Bot

inside bot.js, you can see one example command

    /start

calls an welcome message
