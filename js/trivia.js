const DATA = [
  {
    question: "What was the theme for 78th Independence Day?",
    options: [
      "Viksit Bharat",
      "Promote India's culture",
      "Nation First, Always First",
      "None of the above"
    ],
    answer: "Viksit Bharat"
  },
  {
    question: "When did British come to India?",
    options: [
      "1611",
      "1600",
      "1609",
      "1608"
    ],
    answer: "1608"
  },
  {
    question: "Which of the following is/are true regarding the ratio of the national flag?",
    options: [
      "The ratio of the length to the height of the flag shall be 3:2",
      "The ratio of the length to the width of the flag shall be 3:2",
      "The ratio of the length to the height of the flag shall be 2:3",
      "Both (a) and (b)"
    ],
    answer: "Both (a) and (b)"
  },
  {
    question: "For how many years was India under British Rule?",
    options: [
      "200 years",
      "89 years",
      "190 years",
      "100 years"
    ],
    answer: "200 years"
  },
  {
    question: "On Independence Day, the Prime Minister of India hoists our tricolour flag at:",
    options: [
      "the Purana Qila, Delhi",
      "the Red Fort, Old Delhi",
      "the Red Fort, Agra",
      "the India Gate, New Delhi"
    ],
    answer: "the Red Fort, Old Delhi"
  }
];


const quiz = document.getElementById('quiz');
const answeredCountEl = document.getElementById('answeredCount');
const totalEl = document.getElementById('total');
const progressFill = document.getElementById('progressFill');
const secondaryFill = document.getElementById('secondaryProgressFill');
const submitBtn = document.getElementById('btnSubmit');

totalEl.textContent = DATA.length;

// Render quiz
DATA.forEach((item, idx) => {
  const card = document.createElement('article');
  card.className = 'card';
  card.innerHTML = `<div class="q">${idx + 1}. ${item.question}</div><div class="options"></div>`;
  const optsDiv = card.querySelector('.options');

  item.options.forEach(opt => {
    const label = document.createElement('label');
    label.className = 'opt';
    label.innerHTML = `
      <input type="radio" name="q${idx}" value="${opt}">
      <div class="label">${opt}</div>
      <span class="material-symbols-rounded check">check_circle</span>
      <span class="material-symbols-rounded close">cancel</span>
    `;

    const input = label.querySelector('input');
    // Highlight selection on change
    input.addEventListener('change', () => {
      optsDiv.querySelectorAll('.opt').forEach(o => o.classList.remove('selected'));
      label.classList.add('selected');
      handleSelect();
    });

    optsDiv.appendChild(label);
  });

  quiz.appendChild(card);
});

function handleSelect() {
  const answered = document.querySelectorAll('.opt input:checked').length;
  answeredCountEl.textContent = answered;
  const progress = (answered / DATA.length) * 100;
  progressFill.style.width = `${progress}%`;
  secondaryFill.style.width = `${progress}%`;
  submitBtn.disabled = answered < DATA.length;
}

submitBtn.addEventListener('click', () => {
  const cards = document.querySelectorAll('.card');
  cards.forEach((card, idx) => {
    const correct = DATA[idx].answer;

    // find and mark correct answer first
    const correctOpt = [...card.querySelectorAll('.opt')]
      .find(o => o.querySelector('input').value === correct);
    if (correctOpt) correctOpt.classList.add('correct');

    // now check selected answer
    card.querySelectorAll('.opt').forEach(o => {
      o.classList.remove('selected'); // remove highlight
      const val = o.querySelector('input').value;
      if (o.querySelector('input').checked && val !== correct) {
        o.classList.add('wrong');
      }
    });
  });
});

// Reset
document.getElementById('btnReset').addEventListener('click', () => {
  document.querySelectorAll('.opt input').forEach(i => i.checked = false);
  document.querySelectorAll('.opt').forEach(o => o.classList.remove('correct', 'wrong', 'selected'));
  answeredCountEl.textContent = '0';
  progressFill.style.width = '0%';
  secondaryFill.style.width = '0%';
  submitBtn.disabled = true;
});

// Drawer toggle
const drawer = document.getElementById('drawer');
document.getElementById('openDrawer').addEventListener('click', () => {
  drawer.classList.toggle('open');
});
document.getElementById('scrim').addEventListener('click', () => drawer.classList.remove('open'));

// Secondary progress bar observer
const headerCard = document.getElementById('headerCard');
const secondaryProgress = document.getElementById('secondaryProgress');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      secondaryProgress.classList.remove('show');
    } else {
      secondaryProgress.classList.add('show');
    }
  });
}, { rootMargin: "-10px 0px 0px 0px", threshold: 0 });
observer.observe(headerCard);
