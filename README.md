# Custom Stickynote Bot

[![Author](https://img.shields.io/badge/Author-Michael%20John%20Pieruszka-blue)](https://github.com/MJPieruszka)

Custom Stickynote Bot is a Discord.js bot that manages a sticky note in a specific channel. It allows authorized users to update its content and toggle its visibility.

## Installation

1. Clone the repository: `git clone https://github.com/MJPieruszka/custom-stickynote-bot.git`
2. Install dependencies: `npm install`

## Configuration

1. Open the `index.js` file.
2. Replace `'YOUR TOKEN HERE'` with your Discord bot token.
3. Replace `'CHANNEL ID HERE'` with the ID of the channel where you want the sticky note to be managed.
4. Replace `'ROLE ID HERE'` with the ID of the role(s) that have permission to manage the sticky note.

## Usage

1. Run the bot: `node index.js`
2. The bot will automatically create a sticky note message in the specified channel if it doesn't exist.
3. Authorized users with the designated role(s) can update the sticky note by sending a message starting with the command prefix (`!sticky`) followed by the new content.
4. To toggle the visibility of the sticky bot, authorized users can use the command `!togglesticky`.
5. If a member with the trigger role ID sends a message, the bot will delete and re-send the sticky note message in the channel.

## Contributing

Contributions to the project are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

