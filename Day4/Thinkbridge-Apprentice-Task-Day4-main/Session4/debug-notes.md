# Session 4 - Debugging Notes (Real-time Example)

## Scenario
We built a simple login form:
- Correct credentials → `username = admin`, `password = 1234`.

## Bug
In `debug-example.js`, the condition was:
```js
if (username === "admin" || password === "1234") { ... }
