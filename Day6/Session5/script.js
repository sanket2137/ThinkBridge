// Keywords Data
const keywords = {
    html: [
        { name: 'div', description: 'Defines a generic container for content.' },
        { name: 'p', description: 'Defines a paragraph.' },
        { name: 'h1', description: 'Defines the most important heading.' },
        { name: 'a', description: 'Defines a hyperlink.' },
        { name: 'img', description: 'Embeds an image in the document.' },
        { name: 'ul', description: 'Defines an unordered list.' },
        { name: 'li', description: 'Defines a list item.' },
        { name: 'button', description: 'Defines a clickable button.' },
    ],
    css: [
        { name: 'color', description: 'Sets the text color.' },
        { name: 'background-color', description: 'Sets background color.' },
        { name: 'font-family', description: 'Specifies the font.' },
        { name: 'margin', description: 'Sets margin (outside spacing).' },
        { name: 'padding', description: 'Sets padding (inside spacing).' },
    ],
    js: [
        { name: 'const', description: 'Declares a block-scoped constant.' },
        { name: 'let', description: 'Declares a block-scoped variable.' },
        { name: 'function', description: 'Defines a function.' },
        { name: 'if...else', description: 'Conditional statement.' },
        { name: 'for', description: 'Loop statement.' },
    ]
};

// DOM Elements
const htmlList = document.getElementById('htmlList');
const cssList = document.getElementById('cssList');
const jsList = document.getElementById('jsList');
const searchInput = document.getElementById('searchInput');
const tooltip = document.getElementById('tooltip');
const darkToggle = document.getElementById('darkModeToggle');

// Render Keywords
function renderKeywords(filter = '', category = 'all') {
    const lowerFilter = filter.toLowerCase();

    function createKeywordItem(item) {
        return `
            <div class="keyword-item bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm">
                <h3 class="font-semibold text-lg text-gray-800">${item.name}</h3>
                <p class="mt-1 text-sm text-gray-600">${item.description}</p>
            </div>
        `;
    }

    const cats = { html: htmlList, css: cssList, js: jsList };
    
    Object.keys(cats).forEach(cat => {
        if(category === 'all' || category === cat){
            cats[cat].innerHTML = keywords[cat]
                .filter(item => item.name.toLowerCase().includes(lowerFilter) || item.description.toLowerCase().includes(lowerFilter))
                .map(createKeywordItem)
                .join('');
        } else {
            cats[cat].innerHTML = '';
        }
    });

    attachTooltip(); // Reattach tooltip events
}

// Filter by Category
function filterCategory(category) {
    renderKeywords(searchInput.value, category);
}

// Tooltip Functionality
function attachTooltip() {
    document.querySelectorAll('.keyword-item').forEach(item => {
        item.addEventListener('mouseenter', e => {
            tooltip.textContent = item.querySelector('p').textContent;
            tooltip.classList.remove('hidden');
        });
        item.addEventListener('mouseleave', e => {
            tooltip.classList.add('hidden');
        });
    });
}

document.addEventListener('mousemove', e => {
    tooltip.style.left = e.pageX + 15 + 'px';
    tooltip.style.top = e.pageY + 15 + 'px';
});

// Dark Mode Toggle
darkToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
});

// Search Functionality
searchInput.addEventListener('input', e => renderKeywords(e.target.value));

// Initial Render
renderKeywords();
