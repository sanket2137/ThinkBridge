// Storage
let notes = JSON.parse(localStorage.getItem("notes")) || [];

// Elements
const notesList = document.getElementById("notesList");
const noteTitle = document.getElementById("noteTitle");
const noteContent = document.getElementById("noteContent");
const saveNoteBtn = document.getElementById("saveNote");
const searchEl = document.getElementById("search");
const themeToggle = document.getElementById("themeToggle");

// Render Notes
function renderNotes(filter = "") {
  notesList.innerHTML = "";
  notes
    .filter(n => 
      n.title.toLowerCase().includes(filter.toLowerCase()) ||
      n.content.toLowerCase().includes(filter.toLowerCase())
    )
    .forEach((note, index) => {
      const div = document.createElement("div");
      div.className = "note";
      div.innerHTML = `
        <h3>${note.title}</h3>
        <p>${note.content}</p>
        <button onclick="deleteNote(${index})">❌</button>
      `;
      notesList.appendChild(div);
    });
}

// Save Note
saveNoteBtn.addEventListener("click", () => {
  const title = noteTitle.value.trim();
  const content = noteContent.value.trim();
  if (title && content) {
    notes.push({ title, content });
    localStorage.setItem("notes", JSON.stringify(notes));
    noteTitle.value = "";
    noteContent.value = "";
    renderNotes();
  }
});

// Delete Note
function deleteNote(index) {
  notes.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  renderNotes(searchEl.value);
}

// Search
searchEl.addEventListener("input", e => renderNotes(e.target.value));

// Dark/Light Mode
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent = 
    document.body.classList.contains("dark") ? "☀️ Light Mode" : "🌙 Dark Mode";
});

// Initial Render
renderNotes();
