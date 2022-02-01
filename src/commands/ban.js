const { Command } = require("sheweny");

module.exports = class BanCommand extends Command {
  constructor(client) {
    super(client, {
      name : "ban",
      description: "Commands for the Administrators of this server, to ban a user from the discord",
      category: "Moderation",
      cooldown: 0,
      type: "MESSAGE_COMMAND",
      channel: "GUILD",
      userPermissions: ["BAN_MEMBERS"],
      args: [
        {
          name: "userToBan",
          type: "MEMBER"
        },
        {
          name: "reason",
          type: "STRING"
        }
      ]
    });
    this.embed = client.options.MessageEmbed;
    this.config = client.options.config;
  }

  async execute(message, args) {
    const { userToBan, reason } = args;
    const config = this.config; 
    if ( userToBan.user.id === message.author.id) return message.channel.send({embeds: [
      new this.embed()
        .setColor(config.colors.error ?? "RED")
        .setTitle("Vous ne pouvez pas vous bannir vous-même !")
    ]});
    if ( !message.guild.members.cache.get(userToBan.user.id).bannable ) {
      return message.channel.send({embeds: [
        new this.embed()
          .setColor(config.colors.error ?? "RED")
          .setDescription(`${userToBan} n'est pas bannissable !`)
      ]});
    }
    userToBan.ban({reason: reason ?? `Aucune raison n'a été spécifiée | Banni(e) par ${message.author.tag}`});

    return message.channel.send({embeds: [
      new this.embed()
        .setColor(config.colors.success)
        .setTitle("Un utilisateur a été banni !")
        .setDescription(`${message.author} a banni(e) ${userToBan} pour la raison \`${reason ?? "Aucune raison spécifiée"}\` !`)
    ]});

  }
};
