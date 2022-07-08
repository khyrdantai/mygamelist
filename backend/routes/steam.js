
const { app, client } = require("../config/db");

module.exports = function steamAPI(app) {
    app.post('/api/getSteamGames', async (req, res) => {
        // incoming: userId, steamId
        // outgoing: appId, playtime
        const url = 'https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?'
            + 'key=' + steamWebApiKey + '&steamid=' + req.body.steamId;

        request.get(url, function (steamHttpBody) {
            res.setHeader('Content-Type', 'application/json');
            res.send(steamHttpBody);
        });
    });
}