const login = require("fca-unofficial");
const config = require("./config.json");
const fs = require("fs");

login(
  { appState: JSON.parse(fs.readFileSync("appstate.json", "utf8")) },
  function (err, api) {
    if (err) return console.error(err);

    api.setOptions({ listenEvents: true });
    api.listenMqtt((err, event) => {
      if (!event.body) return;

      const { prefix, botName, ownerID } = config;
      const message = event.body.trim();

      // أمر سيرا الذكي
      if (message.startsWith(prefix + botName)) {
        require("./modules/sere/sira").run({ api, event, config });
        return;
      }

      // أوامر جاهزة
      if (message === prefix + "مطور") {
        require("./modules/general/help").run({ api, event, config });
      }
      if (message === prefix + "نكته") {
        require("./modules/general/nkt").run({ api, event, config });
      }
      if (message === prefix + "طرد") {
        require("./modules/admin/kick").run({ api, event, config });
      }
      if (message === prefix + "كتم") {
        require("./modules/admin/mute").run({ api, event, config });
      }
    });
  }
);
