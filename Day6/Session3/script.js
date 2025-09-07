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

const htmlList = document.getElementById('htmlList');
const cssList = document.getElementById('cssList');
const jsList = document.getElementById('jsList');
const searchInput = document.getElementById('searchInput');

function renderKeywords(filter = '') {
    const lowerFilter = filter.toLowerCase();

    function createKeywordItem(item) {
        return `
            <div class="keyword-item bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm hover:bg-white transition-all duration-200">
                <h3 class="font-semibold text-lg text-gray-800">${item.name}</h3>
                <p class="mt-1 text-sm text-gray-600">${item.description}</p>
            </div>
        `;
    }

    htmlList.innerHTML = keywords.html
        .filter(item => item.name.toLowerCase().includes(lowerFilter) || item.description.toLowerCase().includes(lowerFilter))
        .map(createKeywordItem)
        .join('');

    cssList.innerHTML = keywords.css
        .filter(item => item.name.toLowerCase().includes(lowerFilter) || item.description.toLowerCase().includes(lowerFilter))
        .map(createKeywordItem)
        .join('');

    jsList.innerHTML = keywords.js
        .filter(item => item.name.toLowerCase().includes(lowerFilter) || item.description.toLowerCase().includes(lowerFilter))
        .map(createKeywordItem)
        .join('');
}

searchInput.addEventListener('input', (e) => {
    renderKeywords(e.target.value);
});

// Initial render
renderKeywords();
