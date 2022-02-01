const { Command } = require("sheweny");

module.exports = class advertisementCommand extends Command {
  constructor(client) {
    super(client, {
      name : "advertissement",
      description: "Command for administrator to advertisse !",
      category: "Administration",
      type: "MESSAGE_COMMAND",
      cooldown: 0,
      channel: "GUILD",
      userPermissions: ["ADMINISTRATOR"],
      args: [
        {
        name: "text",
        type: "REST"
      }
      ]
    });
    this.translate = client.options.translate;
    this.config = client.options.config;
    this.embed = client.options.MessageEmbed;
  }

  async execute(message, args) {
    const config = this.config;
    const { text } = args;
    const sTranslatedText = await this.translate(text, {from: "fr", to: "en"});
    return message.guild.channels.cache.get(config.channels.advertissement).send({content: `@everyone`,embeds: [
      new this.embed()
        .setColor(config.colors.info ?? "BLUE")
        .setTitle(`Nouvelle annonce de ${message.author.tag} | New announcement of ${message.author.tag}`)
        .setDescription(`__🇫🇷__ \n ${text} \n\n __🇺🇸__ \n ${sTranslatedText.text}`)
        .setTimestamp()
        .setFooter(this.client.user.username, this.client.user.displayAvatarURL({dynamic: true}))
        .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
    ]})
  }
};
