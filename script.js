const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-lettes');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['apps', 'programming', 'web', 'chatGPT', 'code']

let selectedWord = words[Math.floor(Math.random() * words.length)]

const correctLetters = [];
const wrongLetters = [];

function displayWord() {
  wordEl.innerHTML = `
    ${selectedWord.split('').map(letter => 
      `<span class="letter">
        ${correctLetters.includes(letter) ? letter : ''}
      </span>`
  ).join('')
    }
  `
  const innerWord = wordEl.innerText.replace(/\n/g, '')

  if(innerWord === selectedWord) {
    finalMessage.innerText =  'Congratulation!! You won!'
    popup.style.display = 'flex'
  }

}

//Update wrong letters
function updateWrongLettersEl () {
  wrongLettersEl.innerHTML =  `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
  `

  // Display Parts
  figureParts.forEach((part, index) => {
    const errors =  wrongLetters.length;

    if(index < errors) {
      part.style.display = 'block'
    } else {
      part.style.display = 'none'
    }
  })

  // Display if lost
  if(wrongLetters.length === figureParts.length) {
    finalMessage.innerText = "Unfortunately you lost the game! 😕 Play again."

    popup.style.display = 'flex'
  }
}

//Notification
function showNotification () {
  notification.classList.add('show')

  setTimeout(() => {
    notification.classList.remove('show')
  }, 2000)
}


// Keydown Letter press

window.addEventListener("keydown", e => {
  if(e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key

    if(selectedWord.includes(letter)) {
      if(!correctLetters.includes(letter)){
        correctLetters.push(letter)

        displayWord()
      } else {
         showNotification()
      }
    } else {
      if(!wrongLetters.includes(letter)){
        wrongLetters.push(letter)

        updateWrongLettersEl()
      } else {
        showNotification()
      }
    }
  }
}) 

playAgainBtn.addEventListener('click', () => {
  correctLetters.splice(0)
  wrongLetters.splice(0)

  selectedWord = words[Math.floor(Math.random() * words.length)]

  displayWord()

  updateWrongLettersEl()

  popup.style.display = 'none'
})

displayWord()