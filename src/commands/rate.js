const { Command, Button } = require("sheweny");

module.exports = class rateCommand extends Command {
  constructor(client) {
    super(client, {
      name : "rate",
      description: "Command for client for rate developpers",
      category: "client",
      type: "MESSAGE_COMMAND",
      cooldown: 0,
      channel: "GUILD",
      args: [
        {
          name: "uniqid",
          type: "STRING"
        },
        {
          name: "developper",
          type: "USER"
        },
      ]
    });
    this.config = client.options.config;
    this.client = client;
    this.pool = client.options.pool;
    this.embed = client.options.MessageEmbed;
    this.select = client.options.MessageSelectMenu;
    this.row = client.options.MessageActionRow;
  }

  async execute(message, args) {
    const { uniqid, developper } = args;
    const config = this.config;
    const row = this.row;
    const embed = this.embed;
    const selectMenu = this.select;
    let stars = "";
    const selectOptions = []
    this.pool.query(`SELECT * FROM rates WHERE user_id = "${message.author.id}" AND is_complete = 0`, async function(err, results) {
      if (err) return message.channel.send(`Erreur sur les avis : \`${err}\``);
      if (!results.length) return message.reply({content: "Vous n'avez pas de commande non complète !", allowedMentions: {repliedUser: true}});
      if (!uniqid === results[0].uniqid) return message.reply({content: `Vous n'avez pas de commandes avec comme identifiant \`${uniqid}\``, allowedMentions: {repliedUser: true}});
      if (!developper.id === results[0].developper_id) return message.reply({content: "Vous ne pouvez pas noter le développeur dont vous n'avez pas de commandes non complètes !", allowedMentions: {repliedUser: true}});
      for (let i = 0; i < 5; i++) {
        stars += "⭐";
        selectOptions.push({
          label: `${i+1} étoiles`, 
          description: `Noter la prestation de ${developper.tag} avec ${stars} étoile(s)`, 
          value: `${stars}`
        });
      }
      const select = new row()
        .addComponents(new selectMenu()
                            .setCustomId("adev::select_rate")
                            .setPlaceholder(`Veuillez choisir la notation pour la prestation de ${developper.tag}`)
                            .setMinValues(1)
                            .addOptions(selectOptions)
                            .setMaxValues(1))
        return message.channel.send({components: [select], embeds: [
          new embed()
              .setColor(config.colors.info ?? "BLUE")
              .setTitle(`Menu de notation | Prestation de ${developper.tag}`)
        ]});
    })
  }
};
