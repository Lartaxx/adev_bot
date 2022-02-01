const { Command } = require("sheweny");

module.exports = class helpLanguageCommand extends Command {
  constructor(client) {
    super(client, {
      name :"languages",
      description: "Commands for see all languages avaibles",
      category: "utility",
      cooldown: 10,
      type: "MESSAGE_COMMAND",
      channel: "GUILD",
    });
    this.config = client.options.config;
    this.embed = client.options.MessageEmbed;
  }

  async execute(message) {
    let sLangs;
    for (const [key, value] of Object.entries(this.config.langs)) {
      sLangs += `- ${key} : ${value} \n`;
    }
    return message.channel.send({embeds: [
      new this.embed() 
        .setColor(config.colors.info ?? "BLUE")
        .setTitle(`${Object.keys(this.config.langs).length} langues disponibles !`)
        .setDescription(sLangs.replace("undefined", ""))
        .setTimestamp()
    ]})
  }
};
