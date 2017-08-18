[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# Meetup WEB

> [Meetup API repository](https://github.com/mingrammer/meetup-api)

This repository is for WEB for 9XD meetup management service.

## Features

- Calendar
- Meetup CRUD
- Meetup detail page
- Comment

## Setup

You must set up the following configurations in your `config.development.ts`, `config.production.ts`

```bash
export const config = {
  'slackClientId': 'XXXXXXXXX.XXXXXXXXXX',
  'googleApiKey': 'XXXXXXXXXXXXXXXXXXXXX',
  'apiRootUrl': 'https://XXXXXXXXXXX',
  'webUrl': 'https://XXXXXXXXXXXXXX'
};
```

## Run

```bash
npm install && ng serve
```

## build & deploy

```bash
ng build --prod --aot false
firebase deploy
```

## Maintainers

- [@qkraudghgh](https://github.com/qkraudghgh)
- [@mingrammer](https://github.com/mingrammer)
