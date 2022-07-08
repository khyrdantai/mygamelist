const { app, request, STEAM_WEB_API_KEY} = require("../config/db");

module.exports = function steamAPI() {
    app.post('/api/getSteamGames', async (req, res) => {
        // incoming: userId, steamId
        // outgoing: appId, playtime
        const url = 'https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?'
            + 'key=' + STEAM_WEB_API_KEY + '&steamid=' + req.body.steamId;

        request.get(url, function (steamHttpBody) {
            res.setHeader('Content-Type', 'application/json');
            res.send(steamHttpBody);
        });
    });
}