const { Command } = require("sheweny");

module.exports = class ClearCommand extends Command {
  constructor(client) {
    super(client, {
      name : "clear",
      description: "Command for clear x number of message to the channel",
      type: "MESSAGE_COMMAND",
      channel: "GUILD",
      category: "Moderation",
      userPermissions: ["MANAGE_CHANNELS"],
      args: [
        {
          name: "numberCleared",
          type: "STRING"
        }
      ]
    });
  }

  async execute(message, args) {
    message.channel.bulkDelete(parseInt(args.numberCleared))
        .then(messages => message.channel.send(`Nombre de messages supprimés : ${messages.size}`)).then(msg => msg.delete({timeout: 2000}))
        .catch(m => message.channel.send(`Erreur : \`${m}\``));
  }
};
