const { Command } = require("sheweny");

module.exports = class warnCommand extends Command {
  constructor(client) {
    super(client, {
      name : "warn",
      description: "Commands for the Administrators of this server, to warn an user",
      category: "Moderation",
      cooldown: 0,
      type: "MESSAGE_COMMAND",
      channel: "GUILD",
      userPermissions: ["KICK_MEMBERS"],
      args: [
        {
          name: "userWarned",
          type: "USER"
        },
        {
          name: "reason",
          type: "REST"
        }
      ]
    });
    this.config = client.options.config;
    this.client = client;
    this.pool = client.options.pool;
    this.embed = client.options.MessageEmbed;
  }

  async execute(message, args) {
    
    const embed = this.embed;
    const config = this.config;
    let reason_bis;
    const { userWarned, reason } = args;
    if (!reason) reason_bis = "Aucune raison spécifiée";
    else reason_bis = reason;
    this.pool.query(`INSERT INTO warns(user_id, reason) VALUES('${userWarned.id}', '${reason_bis}')`, function(err) {
      if (err) throw err;
      return message.channel.send({embeds:[
        new embed()
          .setColor(config.colors.info ?? "BLUE")
          .setTitle("Un utilisateur a été averti !")
          .setDescription(`${userWarned} a été averti par ${message.author}`)
          .addFields(
            {name: "Utilisateur averti :", value: userWarned.tag, inline: true},
            {name: "Modérateur :", value: message.author.tag, inline: true},
            {name: "Raison : ", value: reason_bis, inline: true}
          )
          .setFooter(message.author.tag, message.author.displayAvatarURL())
      ]});
    })
  }
};
