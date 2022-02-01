const { Command } = require("sheweny");

module.exports = class RolesCommand extends Command {
  constructor(client) {
    super(client, {
      name : "roles",
      description: "Command for staff to send roles embed command",
      type: "MESSAGE_COMMAND",
      channel: "GUILD",
      category: "Administration",
      userPermissions: ["ADMINISTRATOR"]
    });
      this.embed = client.options.MessageEmbed;
      this.row = client.options.MessageActionRow;
      this.button = client.options.MessageButton;
      this.config = client.options.config;
  }

  async execute(message) {
    const roleEmbed = new this.embed()
    	.setColor(this.config.colors.info ?? "BLUE")
        .setTitle("Choisir mes rôles")
    	.setDescription("Vous pouvez appuyer sur ces boutons, pour choisir vos rôles. \n La commande est mise à jour à chaque nouveau rôle ajouté.")
   		.setTimestamp();
      
     const row = new this.row()
     	this.config.buttons_roles.forEach(role => {
            row.addComponents(new this.button()
                             .setCustomId(`adev::role_${role.id}`)
                             .setLabel(role.name)
                             .setStyle(role.type)
                             .setEmoji(role.emoji))
        })
 
      return message.channel.send({embeds: [roleEmbed], components:[row]})
  }
};
