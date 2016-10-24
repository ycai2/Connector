Connector
==
### Live Demo
[Link](http://ycai2.github.io/connector/game.html)

### Introduction
Connector is a html-based game inspired by Dots.

### MVP
- [ ] Start or Restart a game
- [ ] Populate a board of dots
- [ ] Eliminate same colored dots when connected
- [ ] Calculate score accordingly
- [ ] A modal explaining rules
- [ ] Production README

### Wireframes

![wireframes](wireframes.png)

### Architecture & Technologies
- Vanilla JavaScript and jQuery for overall board logic
- Canvas and WebGL to handle rendering

### Timeline & Code Modules
- Day 1
  - _Board:_ Displaying and re-rendering dots
  - _Dot:_ Event handlers

- Day 2
  - _Board:_ Handle more complex connections (rectangles)
  - _Dot:_ Increment scores according to complexity of elimination

- Day 3
  - _Game:_ Implement levels
  - _Level:_ Implement turns

- Day 4 **BONUS**
  - _Backend:_ Leader board
  - _Level:_ More levels with new types of dots
