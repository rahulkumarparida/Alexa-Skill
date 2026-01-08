
---

# 📄 `ERRORS.md`

# Errors, Issues & Architectural Learnings

This document details the major issues encountered during development, their root causes, and the architectural lessons learned while building the Alexa Daily Greeting & Music Skill.

All issues were observed during **real device testing**, not just simulator usage.

---

## Error 1: Skill Not Invoked (Locale Mismatch)

### Symptom
Alexa repeatedly responded with:
> “I’m not sure how to help with that.”

Lambda logs showed **no invocation**.

---

### Root Cause
- Skill locale configured as **English (US)**
- Alexa device language set to **English (India)**

Alexa never routed the voice request to the skill.

---

### Fix
- Added English (India) locale in Alexa Developer Console
- Rebuilt the skill
- Re-enabled the skill on the device

---

### Learning
> Alexa skill routing depends on **device locale**, not AWS region or Lambda location.

---

## Error 2: Mixing Speech and Audio in One Response

### Initial Attempt
Tried to:
- Speak greeting
- Speak quote
- Auto-play music  
all in a single response.

---

### Error
> “There was a problem with the requested skill’s response.”

---

### Root Cause
Alexa uses **two distinct session types**:
1. Conversational session (speech)
2. Media session (AudioPlayer)

They cannot be freely mixed.
Music playback requires **explicit user intent**.

---

### Learning
> Alexa skills behave like **state machines**, not simple request-response APIs.

---

## Error 3: AudioPlayer Fails on Real Device

### Symptom
On the Alexa app:
> “Invalid Directive – Skill has not declared that it implements the AudioPlayer interface.”

---

### Root Cause
- AudioPlayer.Play directive was returned in Lambda
- But AudioPlayer interface was **not enabled** in skill configuration

---

### Fix
- Alexa Developer Console → Build → Interfaces
- Enabled AudioPlayer
- Rebuilt skill
- Re-enabled on device

---

### Learning
> Returning a directive is not enough —  
> the skill must explicitly declare interface support.

---

## Error 4: Auto-Play Design Violation

### Issue
Music auto-played immediately after greeting without user confirmation.

---

### Problem
This violated Alexa UX and certification rules.

---

### Fix
Redesigned flow:
- Greeting and quote in LaunchRequest
- Music only on explicit user intent

---

### Learning
> Media playback must always be **user-initiated**.

---

## Error 5: Simulator Masking Real Issues

### Observation
Some failures:
- Did not appear in simulator
- Appeared only on physical device

---

### Learning
> Alexa Simulator is useful for logic testing,  
> but **unreliable for AudioPlayer and lifecycle validation**.

Real-device testing is mandatory.

---

## Summary of Key Lessons

| Issue | Lesson |
|-----|-------|
Locale mismatch | Device locale controls invocation |
Auto-play failure | Sessions must be separated |
AudioPlayer rejection | Interface must be declared |
Pause/Resume handling | Use built-in intents |
Simulator reliability | Always test on real hardware |



## Final Takeaway

> Understanding Alexa’s platform rules matters more than writing more code.

> This project reinforced the importance of respecting system constraints, lifecycle design, and real-world testing.
