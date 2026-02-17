const express = require("express");
const cors = require("cors");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const app = express();
app.use(cors());
const PORT = process.env.PORT || 10000;

const API_KEY = "04fca872796041aca478c439502c2016";

app.get("/matches", async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const response = await fetch(
      `https://api.football-data.org/v4/matches?dateFrom=${today}&dateTo=${today}`,
      { headers: { "X-Auth-Token": API_KEY } }
    );

    const data = await response.json();

    let matches = [];

    data.matches.forEach(m => {
      if (m.status !== "SCHEDULED") return;

      matches.push({
        home: m.homeTeam.name,
        away: m.awayTeam.name,
        homeXG: 1.2 + Math.random()*1.2,
        awayXG: 0.9 + Math.random()*1.0
      });
    });

    res.json(matches);

  } catch (e) {
    res.json([]);
  }
});

app.listen(PORT, () => console.log("Server avviato"));

