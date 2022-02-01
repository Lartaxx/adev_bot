const { Event } = require("sheweny");

module.exports = class ReadyEvent extends Event {
  constructor(client) {
    super(client, "ready", {
      description: "Client is logged in",
      once: true,
    });
    this.chalk = client.options.chalk;
    this.schedule = client.options.schedule;
    this.client = client;
  }

  execute() {
    const chalk = this.chalk;
    const client = this.client;
      this.schedule.scheduleJob("* * * * * *", function() {
          client.user.setActivity(`${client.guilds.cache.get("789808009613672448").memberCount} utilisateurs`, {type: "WATCHING"})
      })
    console.log(chalk.white.bgBlue("  _                      _                             ____            _   \r\n | |       __ _   _ __  | |_    __ _  __  __ __  __   | __ )    ___   | |_ \r\n | |      \/ _` | | \'__| | __|  \/ _` | \\ \\\/ \/ \\ \\\/ \/   |  _ \\   \/ _ \\  | __|\r\n | |___  | (_| | | |    | |_  | (_| |  >  <   >  <    | |_) | | (_) | | |_ \r\n |_____|  \\__,_| |_|     \\__|  \\__,_| \/_\/\\_\\ \/_\/\\_\\   |____\/   \\___\/   \\__|\r\n"));
    console.log(chalk.black.bgGreen(`${this.client.user.tag} est connecté`))
  }
};
