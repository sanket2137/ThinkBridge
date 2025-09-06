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

// DOM references
const htmlList = document.getElementById('htmlList');
const cssList = document.getElementById('cssList');
const jsList = document.getElementById('jsList');
const searchInput = document.getElementById('searchInput');
const tooltip = document.getElementById('tooltip');
const darkToggle = document.getElementById('darkModeToggle');
const filterButtons = document.querySelectorAll('[data-cat]');

// Render helpers
function createKeywordItem(item, cat) {
  const safeName = item.name.replace(/</g,'&lt;');
  const safeDesc = item.description.replace(/</g,'&lt;');
  const safeExample = (item.example||'').replace(/</g,'&lt;');

  return `
    <div class="keyword-item card p-4 rounded-lg border border-gray-200 shadow-sm" tabindex="0" role="article" data-cat="${cat}">
      <div class="flex items-start justify-between gap-3">
        <div>
          <h3 class="font-semibold text-lg">${safeName}</h3>
          <p class="mt-1 text-sm text-gray-600 dark:text-gray-300">${safeDesc}</p>
        </div>
        <div class="flex-shrink-0">
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
document.addEventListener('mousemove', e => {
  tooltip.style.left = e.pageX + 14 + 'px';
  tooltip.style.top = e.pageY + 14 + 'px';
});

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
      if(e.target.closest('.copy-btn')) return;
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
  });
}

// Filter buttons
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('filter-active'));
    btn.classList.add('filter-active');
    const cat = btn.getAttribute('data-cat');
    renderKeywords(searchInput.value, cat);
  });
});

// Dark mode
darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  darkToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

// Search
searchInput.addEventListener('input', e => renderKeywords(e.target.value));

// Keyboard shortcuts
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

// Initial render & set default filter active
document.querySelector('[data-cat="all"]').classList.add('filter-active');
renderKeywords();