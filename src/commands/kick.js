const { Command } = require("sheweny");

module.exports = class kickCommand extends Command {
  constructor(client) {
    super(client, {
      name : "kick",
      description: "Commands for the staff of this server, to kick a user from the discord",
      category: "staff",
      cooldown: 0,
      type: "MESSAGE_COMMAND",
      channel: "GUILD",
      userPermissions: ["KICK_MEMBERS"],
      args: [
        {
          name: "userToKick",
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
    const { userToKick, reason } = args;
    const config = this.config; 
    if ( userToKick.user.id === message.author.id || userToKick.user.id === message.guild.ownerId) return message.channel.send({embeds: [
      new this.embed()
        .setColor(config.colors.error ?? "RED")
        .setTitle("Vous ne pouvez pas vous expulser vous-même ou le propriétaire du serveur !")
    ]});
    const RoleHighestKickedUser = message.guild.members.cache.get(userToKick.user.id).roles.highest.rawPosition;
    const RoleHighestModeratorUser = message.guild.members.cache.get(message.author.id).roles.highest.rawPosition;
    if (RoleHighestModeratorUser > RoleHighestKickedUser) {
      userToKick.kick({reason: reason ?? "Aucune raison spécifiée"})
        return message.channel.send({embeds: [
          new this.embed()
            .setColor(config.colors.success ?? "GREEN")
            .setTitle("Un utilisateur a été expulser !")
            .setDescription(`${message.author} a expulsé(e) ${userToKick} pour la raison \`${reason ?? "Aucune raison spécifiée"}\` !`)
          ]})
     
    }
    else {
      return message.channel.send({embeds: [
        new this.embed()
          .setColor(config.colors.error ?? "RED")
          .setDescription(`${message.author}, vous ne pouvez pas expulser ${userToKick} car il a des rôles plus important ou égal à vous !`)
        ]});
    }
      
  }
};
