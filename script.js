const input = document.getElementById('searchInput');
const button = document.getElementById('searchBtn');
const result = document.getElementById('result');
const themeToggle = document.getElementById('themeToggle');
const fontSelector = document.getElementById('fontSelector');

button.addEventListener('click', () => {
  const word = input.value.trim();
  if (word) {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      .then(res => res.json())
      .then(data => displayResult(data[0]))
      .catch(() => {
        result.innerHTML = "<p>Word not found.</p>";
      });
  }
});

function displayResult(data) {
  const { word, phonetics, meanings, sourceUrls } = data;
  const audio = phonetics.find(p => p.audio);

  result.innerHTML = `
    <div class="pronounce">
      <h1>${word}</h1>
      <audio controls src="${audio?.audio || ''}"></audio>
    </div>
    <p>/${phonetics[0]?.text || ''}/</p>
    ${meanings.map(m => `
      <h3>${m.partOfSpeech}</h3>
      <strong>Meaning</strong>
      <ul>
        ${m.definitions.map(d => `<li>${d.definition}</li>`).join('')}
      </ul>
      ${m.synonyms.length ? `<strong>Synonyms:</strong> ${m.synonyms.join(', ')}` : ''}
    `).join('')}
    <p><strong>Source:</strong> <a href="${sourceUrls[0]}" target="_blank">${sourceUrls[0]}</a></p>
  `;
}

themeToggle.addEventListener('change', () => {
  document.body.classList.toggle('dark', themeToggle.checked);
});

fontSelector.addEventListener('change', () => {
  document.body.style.fontFamily = fontSelector.value;
});
