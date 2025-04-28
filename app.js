const pm2 = require("pm2");

pm2.connect((err) =>
{
    if (err) {
        console.error("PM2 connection error:", err);
        return;
    }

    // Subscribe to PM2 bus (process events)
    pm2.launchBus((err, bus) =>
    {
        if (err) {
            console.error("LaunchBus error:", err);
            return;
        }

        console.log("[PM2 MODULE] Listening for PM2 events");

        bus.on("process:event", (data) => {
            if (data.event === "start" || data.event === "restart" || data.event === "stop") {
                pm2.dump();
            }
        });

    });
});
