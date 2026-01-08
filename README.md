# Alexa Daily Greeting & Music Skill

An event-driven Alexa skill built using AWS Lambda and Amazon S3 that greets users based on the time of day, delivers a daily motivational quote, and plays mood-appropriate music on explicit user request.

This project was built for **practical learning**, focusing on understanding Alexa’s event lifecycle, serverless architecture, and real-device behavior rather than writing large amounts of code.

---

## Project Overview

This custom Alexa skill provides the following functionality:

- Time-based greeting (morning / afternoon / evening / night)
- Daily motivational quote spoken by Alexa
- Music playback based on time of day
- Pause, resume, and stop handled using Alexa’s built-in voice controls
- Fully event-driven and serverless architecture
- Tested on a **real Alexa device**, not simulator-only

The project emphasizes:
- Correct use of AWS services
- Respecting Alexa platform constraints
- Clean architectural separation between conversation and media playback

---

## Tech Stack

- Alexa Skills Kit
- Node.js, ES Modules
- public HTTPS audio hosting
- SSML (Speech Synthesis Markup Language)
- Alexa AudioPlayer Interface
- Alexa Developer Console
- Physical Alexa device testing

---

## Design Motivation

While learning AWS Lambda, the goal was to understand how **different triggers** work in real systems.

Instead of using common triggers like HTTP or schedules, this project explores **voice-based event triggers** using :contentReference[oaicite:2]{index=2}.

The idea was simple:
> Trigger Lambda through voice, return structured responses, and understand how Alexa manages conversation and media lifecycles.

---

## Core Features

### Time-Based Greeting
- Time calculated using UTC offset for India
- Time ranges:
  - Morning: 06–12
  - Afternoon: 12–18
  - Evening: 18–24
  - Night: 00–06

### Daily Quote System
- Quotes stored locally in a JSON file
- Deterministic daily quote selection using a day-based seed
- Same quote for all users on the same day
- No external APIs (zero cost)

### Music Playback
- Audio files stored in Amazon S3
- Organized by time of day
- Random track selection from the appropriate folder
- HTTPS public URLs (Alexa requirement)

---

## S3 Bucket Structure

```text
music/
├── Morning/
├── Afternoon/
├── Evening/
└── Night/

```

## Skill Flow

```text
Invocation
  ↓
LaunchRequest
  ↓
Greeting + Quote (SSML)
  ↓
Session Remains Open
  ↓
User Intent: Play Music
  ↓
AudioPlayer.Play
  ↓
Session Ends
  ↓
Music Plays
```
## Architechture Diagram
```text
+-------------------+
|       User        |
|  (Voice Command)  |
+---------+---------+
          |
          v
+-------------------+
|   Alexa Device    |
+---------+---------+
          |
          v
+-------------------+
|  Alexa Skill      |
| (Intent Routing)  |
+---------+---------+
          |
          v
+-----------------------------+
|        AWS Lambda           |
|  - Time Detection           |
|  - Quote Selection          |
|  - Intent Handling          |
+---------+-------------------+
          |
          | (Audio URL request)
          v
+-----------------------------+
|        Amazon S3            |
|  - Morning / Afternoon      |
|  - Evening / Night          |
+-----------------------------+

```


## Lifecycle-aware diagram

```text
[ User ]
   |
   | "Alexa, open personal greeting"
   v
[ LaunchRequest ]
   |
   v
[ Lambda ]
   |
   |-- Greeting (SSML)
   |-- Daily Quote
   |
[ Session OPEN ]
   |
   | "yes play the music"
   v
[ PlayMusicIntent ]
   |
   v
[ Lambda ]
   |
   |-- AudioPlayer.Play
   |-- Fetch S3 HTTPS URL
   |
[ Session ENDS ]
   |
   v
[ Alexa AudioPlayer ]
   |
   v
[ Music Plays from S3 ]

```

## Repository Structure

```text
Source/        → Lambda function and local data files  
Screenshots/   → Real-device and console screenshots  
README.md      → Project overview and architecture  
ERRORS.md      → Detailed issues and architectural learnings


