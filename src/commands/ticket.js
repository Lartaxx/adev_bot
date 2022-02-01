const { Command } = require("sheweny");

module.exports = class ticketCommand extends Command {
  constructor(client) {
    super(client, {
      name : "ticket",
      description: "Commands for Administrators of this server, to create ticket embed",
      category: "Administration",
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
    message.delete();
    const config = this.config;
    const button_ticket = new this.row()
      .addComponents(new this.button()
                          .setCustomId("adev::button_ticket")
                          .setStyle("PRIMARY")
                          .setLabel("➕ | Créer un ticket")
      );

      return message.channel.send({components: [button_ticket], embeds: [
        new this.embed()
          .setColor(config.colors.info ?? "BLUE")
          .setTitle("Création de ticket")
          .setDescription("Pour créer un ticket, veuilez cliquer sur le bouton ci-dessous !")
          .setTimestamp()
      ]});
  }
};
