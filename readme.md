# Higher or Lower – Card Game 

A browser based Higher or Lower drinking game built using HTML, CSS, and JavaScript.  
Designed for casual play with 1 human player and 3 bot players, featuring a dynamic animated background and simple turn based logic.


## Game Overview

Uses a standard card deck (values 2–14, four suits)

Players guess whether the next card is higher or lower

Wrong guess = lose a shot (life)

Each player starts with 5 shots

Players are eliminated at 0 shots

Bots simulate thinking with random delays

Last player remaining wins

## Technologies Used & Why

### HTML
Provides a simple, semantic structure for the game UI

Easy to modify and understand

Runs in any modern browser without setup

### CSS
Handles layout, styling, and animations

Animated blob style gradient background with a vignette effect to keep focus on the game

No external libraries -> lightweight and fast

### JavaScript
Manages game logic, turns, deck handling, and bots

Event driven for user interaction

Keeps state in memory for simplicity and clarity

Why vanilla HTML/CSS/JS?

-No build tools required

-Cross platform and cross browser compatible

-Easy to run, share, and extend


## How to Run

1. Clone or download the repository
2. Ensure all files are in the same directory:
    index.html
    style.css
    script.js
3. Open index.html in any modern web browser (Chrome, Firefox, Edge, Safari)

No installation, server, or dependencies required.

## Design Decisions

Simple object-based player model  
-Each player is represented by an object (`shots`, `isBot`, `out`) to keep logic readable and scalable.

Deck rebuilt automatically  
-If the deck runs out, it rebuilds and reshuffles to avoid edge cases.

Randomised bot delay (1–4s)  
-Makes bots feel more human and prevents instant turns.

CSS-only animated background  
-Avoids performance heavy canvas/WebGL while still providing a lively visual effect.

Clear UI state updates  
-Active players, eliminated players, and remaining shots are visually highlighted for clarity.

## Possible Improvements & Ideas

Add restart / new game button

Improve bot logic (probability based decisions)

Card flip animations

Sound effects for guesses and eliminations

Mobile responsive layout

Multiplayer support (local or online)

Configurable rules (number of shots, players, deck size)


## Note
This game references alcohol purely for entertainment.  
Please drink responsibly :)