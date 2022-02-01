const { Command } = require("sheweny");

module.exports = class helpCommand extends Command {
  constructor(client) {
    super(client,{
      name : "help",
      description: "Commands for see all commands for the bot",
      category: "utility",
      cooldown: 0,
      type: "MESSAGE_COMMAND",
      channel: "GUILD",
    });
    this.client = client;
    this.embed = client.options.MessageEmbed;
    this.config = client.options.config;
  }

  async execute(message) {
    let sCommands;
    const config = this.config;
    this.client.handlers.commands.commands.forEach(command => {
      sCommands += `- [**${command?.category}**] | !${command?.name} - ${command?.description} \n`
    })
    return message.channel.send({embeds: [
      new this.embed()
        .setColor(config.colors.info ?? "BLUE")
        .setTitle(`${this.client.handlers.commands.commands.size} commandes disponibles !`)
        .setDescription(sCommands.replace("undefined", ""))
        .setTimestamp()
    ]})
  }
};
