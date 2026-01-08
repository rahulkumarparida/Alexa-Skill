import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Required to get paths in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Loading JSON files manually
const quotes = JSON.parse(
  fs.readFileSync(path.join(__dirname, "quotes.json"), "utf-8")
);

const music = JSON.parse(
  fs.readFileSync(path.join(__dirname, "music.json"), "utf-8")
);

export const handler = async (event) => {
  const now = new Date();
  const isHour = (now.getUTCHours() + 5.5) % 24;

  let timeofDay;
  if (isHour >= 6 && isHour < 12) {
    timeofDay = "Morning";
  } else if (isHour >= 12 && isHour < 18) {
    timeofDay = "Afternoon";
  } else if (isHour >= 18 && isHour < 24) {
    timeofDay = "Evening";
  } else {
    timeofDay = "Night";
  }

  const daySeed = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
  const quoteList = quotes[timeofDay];
  const quote = quoteList[daySeed % quoteList.length];
  const musicList = music[timeofDay];
  const musicIndex = Math.floor(Math.random() * 4) + 1;
  const musicUrl = musicList[musicIndex];

  if (event.request.type === "LaunchRequest") {
    return {
      version: "1.0",
      response: {
        outputSpeech: {
          type: "PlainText",
          text: `Good ${timeofDay}, ${quote}. Would you like me to play your ${timeofDay} music?`,
        },
        shouldEndSession: false,
      },
    };
  }

  if (
    event.request.type === "IntentRequest" &&
    event.request.intent.name === "PlayMusicIntent"
  ) {
    return {
      version: "1.0",
      response: {
        shouldEndSession: true,
        directives: [
          {
            type: "AudioPlayer.Play",
            playBehavior: "REPLACE_ALL",
            audioItem: {
              stream: {
                token: "daily-music",
                url: musicUrl,
                offsetInMilliseconds: 0,
              },
            },
          },
        ],
        shouldEndSession: true,
      },
    };
  }

  if (
    event.request.type === "IntentRequest" &&
    event.request.intent.name === "AMAZON.PauseIntent"
  ) {
    return {
      version: "1.0",
      response: {
        shouldEndSession: true,
        directives: [
          {
            type: "AudioPlayer.Stop",
          },
        ],
        shouldEndSession: true,
      },
    };
  }
};
