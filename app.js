const wordEl = document.getElementById('word');
const wrongEl = document.getElementById('wrong');
const finalMessage = document.getElementById('final-message');
const playAgain = document.getElementById('play-button');
const popup = document.getElementById('popup');
const notification = document.getElementById('notification');
const figureParts = document.querySelectorAll('.figure-part');

const words = [ 'applications', 'programming', 'interface', 'wizard', 'compile', 'hangman' ];

let selected = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

// Show word
function displayWord() {
	wordEl.innerHTML = `
        ${selected
			.split('')
			.map(
				(letter) => `
            <span class="letter">
        ${correctLetters.includes(letter) ? letter : ''}
        </span>
        `
			)
			.join('')}
`;

	const innerWord = wordEl.innerText.replace(/\n/g, '');
	if (innerWord === selected) {
		finalMessage.innerText = 'Congratulations! You Won!! 😄';
		popup.style.display = 'flex';
	}
}

// !Update wrong
function updateWrongLetters() {
	wrongEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
    `;

	figureParts.forEach((part, index) => {
		const errors = wrongLetters.length;

		if (index < errors) {
			part.style.display = 'block';
		} else {
			part.style.display = 'none';
		}
	});
	if (wrongLetters.length === figureParts.length) {
		finalMessage.innerText = 'Unfortunately you lost. 😕 \nThe word was ' + selected + '.';
		popup.style.display = 'flex';
	}
}

function showNotification() {
	notification.classList.add('show');
	setTimeout(() => {
		notification.classList.remove('show');
	}, 2000);
}
//  !Keydown
window.addEventListener('keydown', (e) => {
	if (e.keyCode >= 65 && e.keyCode <= 90) {
		const letter = e.key;

		if (selected.includes(letter)) {
			if (!correctLetters.includes(letter)) {
				correctLetters.push(letter);

				displayWord();
			} else {
				showNotification();
			}
		} else {
			if (!wrongLetters.includes(letter)) {
				wrongLetters.push(letter);

				updateWrongLetters();
			} else {
				showNotification();
			}
		}
	}
});
// Restart game and play again
playAgain.addEventListener('click', () => {
	//  Empty arrays
	correctLetters.splice(0);
	wrongLetters.splice(0);

	selected = words[Math.floor(Math.random() * words.length)];

	displayWord();

	updateWrongLetters();

	popup.style.display = 'none';
});

displayWord();
