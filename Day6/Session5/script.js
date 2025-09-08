// DevKey Cheat Sheet JavaScript

// Keywords Data (includes examples)
const keywords = {
  html: [
    { name:'div', description:'Generic container for flow content.', example:'<div class="card">...</div>' },
    { name:'p', description:'Paragraph of text.', example:'<p>This is a paragraph.</p>' },
    { name:'h1', description:'Top-level heading.', example:'<h1>Title</h1>' },
    { name:'a', description:'Anchor / hyperlink.', example:'<a href="https://example.com">Example</a>' },
    { name:'img', description:'Image element; use alt attribute for accessibility.', example:'<img src="/img.jpg" alt="Description">' },
    { name:'ul', description:'Unordered list.', example:'<ul><li>Item</li></ul>' },
    { name:'li', description:'List item inside ul/ol.', example:'<li>List item</li>' },
    { name:'button', description:'Clickable button element.', example:'<button type="button">Click me</button>' },
    { name:'span', description:'Inline container for text.', example:'<span class="highlight">word</span>' },
    { name:'input', description:'Form input element.', example:'<input type="text" placeholder="Enter text">' },
    { name:'form', description:'Form container.', example:'<form action="/submit" method="post">...</form>' },
    { name:'label', description:'Label for form control.', example:'<label for="username">User</label>' },
    { name:'table', description:'Table container.', example:'<table><tr><td>Cell</td></tr></table>' },
    { name:'tr', description:'Table row.', example:'<tr><td>Data</td></tr>' },
    { name:'td', description:'Table cell.', example:'<td>Value</td>' }
  ],
  css: [
    { name:'color', description:'Sets text color.', example:'color: #334155;' },
    { name:'background-color', description:'Sets element background color.', example:'background-color: #f8fafc;' },
    { name:'font-family', description:'Specifies font stack.', example:'font-family: Inter, system-ui, sans-serif;' },
    { name:'margin', description:'Outside spacing.', example:'margin: 16px 0;' },
    { name:'padding', description:'Inside spacing.', example:'padding: 12px;' },
    { name:'display', description:'How an element is displayed (block/inline/grid/flex).', example:'display: flex; align-items: center;' },
    { name:'border', description:'Defines border width, style, and color.', example:'border: 1px solid #000;' },
    { name:'border-radius', description:'Rounds corners of an element.', example:'border-radius: 8px;' },
    { name:'width', description:'Sets the width of an element.', example:'width: 200px;' },
    { name:'height', description:'Sets the height of an element.', example:'height: 100px;' },
    { name:'font-size', description:'Sets text size.', example:'font-size: 1.25rem;' },
    { name:'position', description:'Specifies positioning method.', example:'position: absolute; top: 10px;' },
    { name:'z-index', description:'Sets stacking order.', example:'z-index: 10;' },
    { name:'overflow', description:'Specifies how to handle overflowed content.', example:'overflow: scroll;' },
    { name:'opacity', description:'Sets element transparency.', example:'opacity: 0.5;' }
  ],
  js: [
    { name:'const', description:'Block-scoped constant (immutable binding).', example:'const x = 42;' },
    { name:'let', description:'Block-scoped mutable variable.', example:'let i = 0;' },
    { name:'function', description:'Defines a function.', example:'function greet(name){ return `Hi ${name}` }' },
    { name:'if...else', description:'Conditional branching.', example:'if(cond){...} else {...}' },
    { name:'for', description:'Loop with index.', example:'for(let i=0;i<10;i++) console.log(i);' },
    { name:'while', description:'Loop until condition is false.', example:'while(x < 5){ x++; }' },
    { name:'switch', description:'Multi-branch conditional.', example:'switch(value){case 1: break;}' },
    { name:'try...catch', description:'Error handling block.', example:'try{ risky() } catch(e){ console.error(e) }' },
    { name:'return', description:'Ends function and returns value.', example:'return result;' },
    { name:'import', description:'Imports modules.', example:'import fs from "fs";' },
    { name:'export', description:'Exports functions/variables.', example:'export function add(a,b){return a+b}' },
    { name:'class', description:'Defines a class.', example:'class User { constructor(name){ this.name=name; } }' },
    { name:'new', description:'Creates instance of a class.', example:'const u = new User("Sam");' },
    { name:'this', description:'Refers to current object.', example:'this.name = "value";' },
    { name:'await', description:'Waits for a Promise inside async function.', example:'await fetch(url);' }
  ]
};

// DOM references - Wait for DOM to load
let htmlList, cssList, jsList, searchInput, tooltip, darkToggle, filterButtons, addForm;
let nameInput, categoryInput, descInput, exampleInput;

// Initialize DOM references when page loads
document.addEventListener('DOMContentLoaded', function() {
  htmlList = document.getElementById('htmlList');
  cssList = document.getElementById('cssList');
  jsList = document.getElementById('jsList');
  searchInput = document.getElementById('searchInput');
  tooltip = document.getElementById('tooltip');
  darkToggle = document.getElementById('darkModeToggle');
  filterButtons = document.querySelectorAll('[data-cat]');
  addForm = document.getElementById('addKeywordForm');
  nameInput = document.getElementById('keywordName');
  categoryInput = document.getElementById('keywordCategory');
  descInput = document.getElementById('keywordDescription');
  exampleInput = document.getElementById('keywordExample');

  // Initialize the app
  initializeApp();
});

// Render helpers
function createKeywordItem(item, cat) {
  const safeName = item.name.replace(/</g,'&lt;');
  const safeDesc = item.description.replace(/</g,'&lt;');
  const safeExample = (item.example||'').replace(/</g,'&lt;');

  return `
    <div class="keyword-item card p-4 rounded-lg border border-gray-200 shadow-sm" tabindex="0" role="article" data-cat="${cat}" data-name="${item.name}">
      <div class="flex items-start justify-between gap-3">
        <div class="flex-1">
          <h3 class="font-semibold text-lg">${safeName}</h3>
          <p class="mt-1 text-sm text-gray-600 dark:text-gray-300">${safeDesc}</p>
        </div>
        <div class="flex-shrink-0 flex gap-1">
          <button class="edit-btn text-xs px-2 py-1 rounded bg-blue-500 text-white hover:bg-blue-600" title="Edit keyword">✏️</button>
          <button class="delete-btn text-xs px-2 py-1 rounded bg-red-500 text-white hover:bg-red-600" title="Delete keyword">🗑️</button>
          <button class="copy-btn text-xs px-3 py-1 rounded-full border">Copy</button>
        </div>
      </div>

      <div class="extra hidden-by-js mt-3 text-sm text-gray-700 dark:text-gray-200">
        <pre class="rounded"><code>${safeExample}</code></pre>
      </div>
    </div>
  `;
}

function renderKeywords(filter = '', category = 'all') {
  const q = filter.trim().toLowerCase();

  function fill(cat, container) {
    const list = keywords[cat]
      .filter(k => {
        if(!q) return true;
        return k.name.toLowerCase().includes(q) || k.description.toLowerCase().includes(q) || (k.example||'').toLowerCase().includes(q);
      });

    if(list.length === 0) {
      container.innerHTML = '<p class="text-gray-500 italic">No results found.</p>';
      return;
    }

    container.innerHTML = list.map(k => createKeywordItem(k, cat)).join('');
  }

  if(category === 'all' || category === 'html') fill('html', htmlList); else htmlList.innerHTML = '';
  if(category === 'all' || category === 'css') fill('css', cssList); else cssList.innerHTML = '';
  if(category === 'all' || category === 'js') fill('js', jsList); else jsList.innerHTML = '';

  attachInteractions();
}

// Tooltip positioning & events
function setupTooltip() {
  document.addEventListener('mousemove', e => {
    tooltip.style.left = e.pageX + 14 + 'px';
    tooltip.style.top = e.pageY + 14 + 'px';
  });
}

function attachInteractions() {
  document.querySelectorAll('.keyword-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
      const desc = item.querySelector('p').textContent;
      tooltip.textContent = desc;
      tooltip.classList.remove('hidden');
      tooltip.classList.add('show');
    });
    item.addEventListener('mouseleave', () => {
      tooltip.classList.add('hidden');
      tooltip.classList.remove('show');
    });

    // toggle details on click / keyboard
    item.addEventListener('click', (e) => {
      if(e.target.closest('.copy-btn') || e.target.closest('.edit-btn') || e.target.closest('.delete-btn')) return;
      const extra = item.querySelector('.extra');
      extra.classList.toggle('hidden-by-js');
    });
    item.addEventListener('keydown', (e) => {
      if(e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        item.click();
      }
    });

    // copy button functionality
    const copyBtn = item.querySelector('.copy-btn');
    copyBtn.addEventListener('click', (ev) => {
      ev.stopPropagation();
      const code = item.querySelector('pre code').textContent;
      navigator.clipboard.writeText(code).then(() => {
        copyBtn.textContent = 'Copied!';
        setTimeout(() => copyBtn.textContent = 'Copy', 1200);
      }).catch(() => {
        copyBtn.textContent = 'Failed';
        setTimeout(() => copyBtn.textContent = 'Copy', 1200);
      });
    });

    // Edit button functionality
    const editBtn = item.querySelector('.edit-btn');
    editBtn.addEventListener('click', (ev) => {
      ev.stopPropagation();
      const keywordName = item.dataset.name;
      const category = item.dataset.cat;
      editKeyword(keywordName, category);
    });

    // Delete button functionality
    const deleteBtn = item.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', (ev) => {
      ev.stopPropagation();
      const keywordName = item.dataset.name;
      const category = item.dataset.cat;
      deleteKeyword(keywordName, category);
    });
  });
}

// Edit keyword function
function editKeyword(keywordName, category) {
  const keywordIndex = keywords[category].findIndex(
    k => k.name.toLowerCase() === keywordName.toLowerCase()
  );
  
  if (keywordIndex === -1) return;
  
  const keyword = keywords[category][keywordIndex];
  
  // Fill the form with existing data
  nameInput.value = keyword.name;
  categoryInput.value = category;
  descInput.value = keyword.description;
  exampleInput.value = keyword.example;
  
  // Scroll to form and focus on name field
  addForm.scrollIntoView({ behavior: 'smooth' });
  setTimeout(() => nameInput.focus(), 300);
  
  // Change submit button text to indicate edit mode
  const submitBtn = addForm.querySelector('button[type="submit"]');
  submitBtn.textContent = 'Update Keyword';
  submitBtn.style.backgroundColor = '#f59e0b';
}

// Delete keyword function
function deleteKeyword(keywordName, category) {
  const confirmDelete = confirm(
    `Are you sure you want to delete the keyword "${keywordName}" from ${category.toUpperCase()}? This action cannot be undone.`
  );
  
  if (!confirmDelete) return;
  
  const keywordIndex = keywords[category].findIndex(
    k => k.name.toLowerCase() === keywordName.toLowerCase()
  );
  
  if (keywordIndex !== -1) {
    keywords[category].splice(keywordIndex, 1);
    
    // Re-render with current active filter
    const activeCatBtn = document.querySelector('.filter-active');
    const catFilter = activeCatBtn ? activeCatBtn.getAttribute('data-cat') : 'all';
    renderKeywords(searchInput.value, catFilter);
    
    // Show success message
    showMessage('Keyword deleted successfully!', 'success');
  }
}

// Utility function to show messages
function showMessage(message, type = 'info') {
  const messageDiv = document.createElement('div');
  messageDiv.className = `fixed top-20 right-4 px-4 py-2 rounded shadow-lg text-white z-50 message-slide-in ${
    type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500'
  }`;
  messageDiv.textContent = message;
  
  document.body.appendChild(messageDiv);
  
  setTimeout(() => {
    messageDiv.remove();
  }, 3000);
}

// Filter buttons setup
function setupFilters() {
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('filter-active'));
      btn.classList.add('filter-active');
      const cat = btn.getAttribute('data-cat');
      renderKeywords(searchInput.value, cat);
    });
  });
}

// Dark mode setup
function setupDarkMode() {
  darkToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    darkToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
  });
}

// Search setup
function setupSearch() {
  searchInput.addEventListener('input', e => renderKeywords(e.target.value));
}

// Keyboard shortcuts setup
function setupKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    if(e.key === '/') {
      const active = document.activeElement;
      if(active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.isContentEditable)) return;
      e.preventDefault();
      searchInput.focus();
      searchInput.select();
    }
    if(e.key === 'Escape') {
      if(document.activeElement === searchInput) {
        searchInput.value = '';
        renderKeywords();
        searchInput.blur();
      }
    }
  });
}

// Form handler setup
function setupFormHandler() {
  addForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const cat = categoryInput.value.trim();
    const keywordName = nameInput.value.trim();
    const newKeyword = {
      name: keywordName,
      description: descInput.value.trim(),
      example: exampleInput.value.trim()
    };

    if (!cat || !newKeyword.name || !newKeyword.description) {
      alert('Please fill in all required fields.');
      return;
    }

    // Check if keyword already exists (case-insensitive)
    const existingIndex = keywords[cat]?.findIndex(
      k => k.name.trim().toLowerCase() === keywordName.toLowerCase()
    );

    if (existingIndex !== -1) {
      // Found existing keyword → ask for update
      const confirmUpdate = confirm(
        `The keyword "${keywordName}" already exists in ${cat.toUpperCase()}. Do you want to update it?`
      );
      if (confirmUpdate) {
        keywords[cat][existingIndex] = newKeyword; // Update existing
      } else {
        return; // Cancel operation
      }
    } else {
      // Add new keyword at the beginning (so it appears first)
      keywords[cat].unshift(newKeyword);
    }

    // Re-render with current active filter
    const activeCatBtn = document.querySelector('.filter-active');
    const catFilter = activeCatBtn ? activeCatBtn.getAttribute('data-cat') : 'all';
    renderKeywords(searchInput.value, catFilter);

    // Reset form
    addForm.reset();
    
    // Reset submit button
    const submitBtn = addForm.querySelector('button[type="submit"]');
    const originalText = 'Add Keyword';
    submitBtn.textContent = existingIndex !== -1 ? 'Updated!' : 'Added!';
    submitBtn.style.backgroundColor = '#10b981';
    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.style.backgroundColor = '';
    }, 2000);
    
    // Show success message
    showMessage(
      existingIndex !== -1 ? 'Keyword updated successfully!' : 'Keyword added successfully!', 
      'success'
    );
  });
}

// Initialize the application
function initializeApp() {
  // Set up all event listeners
  setupTooltip();
  setupFilters();
  setupDarkMode();
  setupSearch();
  setupKeyboardShortcuts();
  setupFormHandler();
  
  // Set default active filter and render
  document.querySelector('[data-cat="all"]').classList.add('filter-active');
  renderKeywords();
}