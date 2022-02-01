const { Command } = require("sheweny");

module.exports = class verificationCommand extends Command {
  constructor(client) {
    super(client, {
      name : "verification",
      description: "Commands for Administrators of this server, to create verification embed command",
      category: "staff",
      cooldown: 0,
      channel: "GUILD",
      userPermissions: ["ADMINISTRATOR"]
    });
    this.client = client;
    this.embed = client.options.MessageEmbed;
    this.button = client.options.MessageButton;
    this.config = client.options.config;
    this.row = client.options.MessageActionRow;
  }

  async execute(message) {
    const row = new this.row()
      .addComponents(new this.button()
                          .setCustomId("adev::button_verif")
                          .setStyle("SUCCESS")
                          .setLabel("✔️ Me vérifier")
      )
    return message.channel.send({components: [row], embeds: [
      new this.embed()
        .setColor(this.config.colors.info ?? "BLUE")
        .setTitle("Vérification des nouveaux utilisateurs")
        .setDescription("Pour avoir accès au reste du Discord, vous devez cliquer sur le bouton ci-dessous.")
        .setFooter(this.client.user.username, this.client.user.displayAvatarURL())
        .setThumbnail(this.client.user.displayAvatarURL())
    ]})
  }
};
