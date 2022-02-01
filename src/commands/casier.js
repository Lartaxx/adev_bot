const { Command } = require("sheweny");

module.exports = class casierCommand extends Command {
  constructor(client) {
    super(client, {
      name : "casier",
      description: "Commands for the staff of this server, to see the warn's of x user",
      category: "utility",
      cooldown: 5,
      type: "MESSAGE_COMMAND",
      channel: "GUILD",
      args: [
        {
          name: "userSearch",
          type: "USER"
        }
      ]
    });
    this.config = client.options.config;
    this.embed = client.options.MessageEmbed;
    this.pool = client.options.pool;
  }

  async execute(message, args) {
    const { userSearch } = args;
    const embed = this.embed;
    const config = this.config;
    let sReasons;
    this.pool.query(`SELECT * FROM warns WHERE user_id = ${userSearch.id}`, function(err, results) {
      if (err) throw err;
      if (!results.length) {
        return message.channel.send({embeds: [
            new embed()
              .setColor(config.colors.error ?? "RED")
              .setTitle(`${userSearch.tag} n'a pas de casier !`)
              .setTimestamp()
        ]});
      }
      results.forEach(infraction => {
        sReasons += `- ${infraction.reason} \n`;
      });
      return message.channel.send({embeds: [
        new embed()
          .setColor(config.colors.info ?? "BLUE")
          .setTitle(`Casier SunLight Rôleplay | ${userSearch.tag}`)
          .setDescription(`${userSearch} a **${results.length}** infractions ! \n ${sReasons.replace("undefined", "")}`)
          .setFooter(userSearch.tag, userSearch.displayAvatarURL())
          .setTimestamp()
      ]});
    })
  }
};
