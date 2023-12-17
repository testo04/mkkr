const { readdirSync } = require("fs");
const ascii = require("ascii-table");

let table = new ascii("Events");
table.setHeading("Event Name", "Loaded Status");

module.exports = (client) => {
  const events = readdirSync(`./events/`).filter((file) =>
    file.endsWith(".js")
  );
  for (let file of events) {
    try {
      let pull = require(`../events/${file}`);
      if (pull.event && typeof pull.event !== "string") {
        table.addRow(file, `❌`);
        continue;
      }
      pull.event = pull.event || file.replace(".js", "");
      if (typeof pull.run !== "function") {
        table.addRow(file, `❌`);
        continue;
      }
      client.on(pull.event, pull.run.bind(null, client));
      table.addRow(file, "✔");
    } catch (err) {
      console.log("");
      console.log(err);
      table.addRow(file, `❌`);
    }
  }
  console.log(table.toString());
};
