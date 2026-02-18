const express = require("express");

const app = express();
const PORT = process.env.PORT || 10000;

const API_KEY = process.env.FOOTBALL_API_KEY;

const leagues = ["SA","PL","PD","BL1","FL1"];

app.get("/matches", async (req, res) => {
  try {

    let allMatches = [];

    for (const code of leagues) {

      const response = await fetch(
        `https://api.football-data.org/v4/competitions/${code}/matches?status=SCHEDULED`,
        {
          headers: { "X-Auth-Token": API_KEY }
        }
      );

      const data = await response.json();

      if (!data.matches) continue;

      for (const m of data.matches) {
        allMatches.push({
          home: m.homeTeam.name,
          away: m.awayTeam.name,
          homeXG: 1.2 + Math.random()*1.2,
          awayXG: 0.9 + Math.random()*1.0
        });
      }
    }

    res.json(allMatches);

  } catch (err) {
    res.json([]);
  }
});

app.listen(PORT, () => console.log("Server avviato"));

