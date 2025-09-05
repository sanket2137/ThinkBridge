# Session 3 - DOM and Events Overview

## 1. Select Elements
- `document.getElementById("id")`
- `document.querySelector(".class")`
- `document.querySelectorAll("tag")`

## 2. Listen to Events
- `element.addEventListener("click", function() { ... })`
- Common events: `click`, `mouseover`, `keydown`, `submit`

## 3. Update Text
- `element.textContent = "New Text";`
- `element.innerHTML = "<b>Bold Text</b>";`

## 4. Update Classes
- `element.classList.add("classname")`
- `element.classList.remove("classname")`
- `element.classList.toggle("classname")`

---

### Example
```html
<button id="btn">Click Me</button>
<p id="message">Hello!</p>
