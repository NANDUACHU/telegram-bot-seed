# Telegram.org Bot - NodeJS Seed

Telegram is amazing and gives us the possibility to insert a bot as a service inside chats.

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

there are three example routings for messages

    /start
    /help
    /dice

calls an welcome message

## Bot Messages

if you want to create an new message, you have to insert

inside messageRouting.js extend the object

```javascript
dice: {
    message: "rollTheDice",
    description: "roll the dice",
    middleware: dice.rollTheDice,
    keyboard: {
        keyboard: [["/dice"]],
        "one_time_keyboard": true,
        "resize_keyboard": true
    }
}
```

inside messages/ you will find rollTheDice.hbs

```javascript
    your number
    🎲{{data.number}}
```

each message message has on object with the userData Object from Bot

```javascript
    data: {
        data: {},
        user: {}
    }
```

## Bot Keyboard

```javascript
    keyboard: {
        keyboard: [["/dice"]],
        "one_time_keyboard": true,
        "resize_keyboard": true
    }
```
