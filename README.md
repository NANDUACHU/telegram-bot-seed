# Telegram.org Bot - NodeJS Seed

Telegram is amazing and gives us the possibility to insert a bot as a service inside chats.

## Get Started

## Authorize Bot

first things first.

you have to register a new bot

follow these introductions on [telegram.org](https://core.telegram.org/bots)

### Register Webhook

telegram needs an callback url, if anyone is typing in an command inside the bot chat,
to send the request to our bot

    https://api.telegram.org/bot{yourBotToken}/setWebhook?url=https://yourdomain.tld/bot/

### Install Bot dependencies

if you don't have it yet, you must install nodejs

    [Install NodeJS](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager)

after them install dependencies

```shell
    $ npm install
```

### Start Bot Server

```shell
    $ npm start
```

## Examples

there are three example routings for messages

    /start
    /help
    /dice

## Bot Message

if you want to create an new message, you have to do following things

### Route

inside messageRouting.js

```javascript
{
    routeName: {
        message: templateName,
        description: messageDescription,
        middleware: default null,
        keyboard: {object}
    },
    secondRoute: {object},
    thirdRoute: {object}
}
```

#### Options

name  | type | explanation
------------- | -------------
message  | string | name of message template
description  | string | message description
middleware  | null or function | get request object to generate custom data for template
keyboard | object | telegram keyboard options

### Message Template

inside messages/ you will find rollTheDice.hbs

```javascript
    your number
    🎲{{data.number}}
```

all messages get the request object with all available data

```javascript
    request = {
        status: boolean,
        routes: [array],
        route: {object},
        user: {object},
        middleware: default null
    };
```

## Bot Keyboard

telegram supports keyboard using

```javascript
    keyboard: {
        keyboard: [["/dice"]],//
        "one_time_keyboard": true,
        "resize_keyboard": true
    }
```
