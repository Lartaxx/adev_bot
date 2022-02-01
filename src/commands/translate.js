const { Command } = require("sheweny");

module.exports = class translateCommand extends Command {
  constructor(client) {
    super(client, {
      name : "translate",
      description: "Translate text from x lang to y lang",
      category: "utility",
      cooldown: 5,
      type: "MESSAGE_COMMAND",
      channel: "GUILD",
      args: [
        {
          name: "lang_x",
          type: "STRING"
        },
        {
          name: "lang_y",
          type: "STRING"
        },
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
    const { text, lang_x, lang_y } = args;
    const config = this.config;
    function isLangAvaible(lang_x, lang_y) {
      const bResult = Object.keys(config.langs).some(lang => [lang_x, lang_y].includes(lang));
      return bResult;
    }
   const isAvaibleLanguages = isLangAvaible(lang_x, lang_y);
   if (!isAvaibleLanguages) {
     return message.channel.send({embeds: [
       new this.embed()
        .setColor("RED")
        .setTitle("OMG")
        .setDescription(`La langue ${lang_x} ou ${lang_y} n'est pas valide !`)
     ]})
   }
   const sTranslatedText = await this.translate(text, {from: lang_x, to: lang_y})
   return message.channel.send(`${message.author} a dit : \`${sTranslatedText.text}\``);
  }
};
