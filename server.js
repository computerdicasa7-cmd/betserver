const express = require("express");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const app = express();
const PORT = process.env.PORT || 10000;

const API_KEY = process.env.FOOTBALL_API_KEY;

// competizioni gratuite disponibili
const leagues = ["SA", "PL", "PD", "BL1", "FL1"]; 
// Serie A, Premier League, Liga, Bundesliga, Ligue 1

app.get("/matches", async (req, res) => {
  try {

    let allMatches = [];

    for (let code of leagues) {

      const response = await fetch(
        `https://api.football-data.org/v4/competitions/${code}/matches?status=SCHEDULED`,
        { headers: { "X-Auth-Token": API_KEY } }
      );

      const data = await response.json();

      if (!data.matches) continue;

      data.matches.forEach(m => {

        allMatches.push({
          home: m.homeTeam.name,
          away: m.awayTeam.name,
          homeXG: 1.2 + Math.random()*1.2,
          awayXG: 0.9 + Math.random()*1.0
        });

      });
    }

    res.json(allMatches);

  } catch (e) {
    res.json([]);
  }
});

app.listen(PORT, () => console.log("Server avviato"));

