# Rate Bot

A Telegram bot for $RATE token with custom commands and messaging.

## Features

- `/ca` or `/contract` - Get contract address
- `/chart` - View price chart
- `/website` - Visit official website (with OG image)
- `/whitepaper` - Read whitepaper
- `/burn` - View burn transaction
- `/burnschedule` - Check burn schedule
- `/help` - Show all commands

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file with your bot token:
   ```
   BOT_TOKEN=your_bot_token_here
   ```
4. Run the bot: `npm start`

## Security

- Never commit your `.env` file
- Keep your bot token secure
- The `.env` file is already excluded in `.gitignore`

## Commands

Each command includes custom messaging and a "Buy $RATE" button linking to Jupiter.
