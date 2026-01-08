# Screenshots & Visual Documentation

This document explains the screenshots included in this repository.
Each image captures a real stage of development, configuration, or testing
of the Alexa Daily Greeting & Music Skill.

The purpose of these screenshots is to provide **visual proof** of:
- Correct AWS service usage
- Alexa skill configuration
- Real-device testing
- End-to-end integration

---

## 1. Alexa Skill Invocation Configuration

![alt text](<Images/WhatsApp Image 2026-01-08 at 12.31.57.jpeg>)

**What this image shows:**
- Alexa Developer Console → Invocation settings
- Skill invocation name configured (`personal greeting`)
- Locale set to English (India)

**Why this matters:**
- Alexa routes voice requests based on **device locale**, not AWS region
- Incorrect locale configuration prevents skill invocation entirely
- This configuration was required for the skill to work on a real Alexa device

**Concepts involved:**
- Alexa Skill routing
- Locale-based invocation
- Skill lifecycle entry point

---

## 2. Amazon S3 – Music Bucket Structure

![alt text](<Images/WhatsApp Image 2026-01-08 at 12.31.58 (1).jpeg>)

**What this image shows:**
- Amazon S3 bucket containing the `music/` directory
- Time-based subfolders:
  - Morning
  - Afternoon
  - Evening
  - Night

**Why this matters:**
- Alexa AudioPlayer requires HTTPS-accessible audio files
- Organizing audio by time of day simplifies Lambda logic
- Enables dynamic, context-aware music selection

**Concepts involved:**
- Object storage design
- Public audio hosting for Alexa
- Data-driven content selection

---

## 3. AWS Lambda Function with Alexa Trigger

![alt text](<Images/WhatsApp Image 2026-01-08 at 12.31.58 (2).jpeg>)

**What this image shows:**
- AWS Lambda function used as the skill backend
- Alexa configured as the event trigger
- Lambda function code handling intents and responses

**Why this matters:**
- Demonstrates serverless, event-driven architecture
- Shows correct integration between Alexa Skills Kit and Lambda
- Confirms Lambda is invoked only through Alexa (no HTTP or schedule triggers)

**Concepts involved:**
- Event-driven compute
- Alexa → Lambda integration
- Serverless backend logic

---

## 4. Alexa Simulator – Skill Conversation Flow

![alt text](<Images/WhatsApp Image 2026-01-08 at 12.31.58.jpeg>)

**What this image shows:**
- Alexa Web Simulator testing the skill
- User invoking the skill
- Alexa responding with time-based greeting and motivational quote

**Why this matters:**
- Validates conversational flow and SSML responses
- Confirms LaunchRequest handling works as expected
- Useful for logic testing before real-device validation

**Concepts involved:**
- LaunchRequest lifecycle
- SSML-based speech responses
- Conversational session handling

---

## 5. Alexa Developer Console – Skill Listing

![alt text](<Images/WhatsApp Image 2026-01-08 at 12.31.59.jpeg>)

**What this image shows:**
- Alexa Developer Console skill dashboard
- Skill status marked as “In Development”
- Language support including English (India)

**Why this matters:**
- Confirms skill is registered correctly in the developer account
- Shows active development state
- Verifies locale configuration at the skill level

**Concepts involved:**
- Skill management lifecycle
- Locale support
- Development vs production stages

---

## Notes on Real-Device Testing

While the simulator is useful for validating logic, final verification
was performed on a **physical Alexa device**.

Several lifecycle and AudioPlayer-related issues only surfaced during
real-device testing, reinforcing the importance of testing beyond the simulator.

---

## Summary

These screenshots collectively demonstrate:
- Correct Alexa skill configuration
- Clean AWS Lambda integration
- Proper S3-based audio hosting
- Realistic testing workflow
- Platform-aware architectural decisions

They serve as visual confirmation of the system described in the README.
