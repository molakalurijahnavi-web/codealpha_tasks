const defaultFlashcards = [

    {
        question: "What is HTML?",
        answer:
            "HTML stands for HyperText Markup Language. It is used to create and structure the content of web pages."
    },

    {
        question: "What is CSS?",
        answer:
            "CSS stands for Cascading Style Sheets. It is used to style and design web pages."
    },

    {
        question: "What is JavaScript?",
        answer:
            "JavaScript is a programming language used to make web pages interactive and dynamic."
    },

    {
        question: "What is Python?",
        answer:
            "Python is a high-level programming language known for its simple syntax and wide range of applications."
    },

    {
        question: "What is a variable?",
        answer:
            "A variable is a named location used to store a value that can be used by a program."
    },

    {
        question: "What is a function?",
        answer:
            "A function is a reusable block of code designed to perform a particular task."
    },

    {
        question: "What is an array?",
        answer:
            "An array is a data structure that stores multiple values in an ordered collection."
    },

    {
        question: "What is an algorithm?",
        answer:
            "An algorithm is a step-by-step procedure used to solve a problem or perform a task."
    },

    {
        question: "What is a database?",
        answer:
            "A database is an organized collection of data that can be stored, accessed and managed efficiently."
    },

    {
        question: "What is SQL?",
        answer:
            "SQL stands for Structured Query Language. It is used to store, retrieve and manage data in relational databases."
    },

    {
        question: "What is an API?",
        answer:
            "API stands for Application Programming Interface. It allows different software applications to communicate with each other."
    },

    {
        question: "What is GitHub?",
        answer:
            "GitHub is a platform used to store, manage and collaborate on software projects using Git."
    },

    {
        question: "What is Artificial Intelligence?",
        answer:
            "Artificial Intelligence is a field of technology that enables computers to perform tasks that normally require human intelligence."
    },

    {
        question: "What is Data Science?",
        answer:
            "Data Science is the field of collecting, analyzing and interpreting data to find useful information and insights."
    },

    {
        question: "What is a programming language?",
        answer:
            "A programming language is a language used by programmers to write instructions that computers can understand and execute."
    }
];


// NEW STORAGE KEY
// This makes sure the new 15 cards appear
// even if the old version was already saved.

const STORAGE_KEY = "flashcardQuizApp_v2";


let flashcards =
    JSON.parse(
        localStorage.getItem(STORAGE_KEY)
    ) || defaultFlashcards;


let currentIndex = 0;

let answerVisible = false;


// SAVE DATA

function saveCards() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(flashcards)
    );
}


// DISPLAY CURRENT CARD

function displayCard() {

    const question =
        document.getElementById("question");

    const answer =
        document.getElementById("answer");

    const label =
        document.getElementById("card-label");

    const counter =
        document.getElementById("counter");

    const progress =
        document.getElementById("progress-bar");

    const showButton =
        document.getElementById("show-answer");


    // NO CARDS

    if (flashcards.length === 0) {

        question.textContent =
            "No flashcards available.";

        answer.textContent = "";

        label.textContent =
            "EMPTY";

        counter.textContent =
            "Card 0 of 0";

        progress.style.width =
            "0%";

        showButton.style.display =
            "none";

        displayCardsList();

        return;
    }


    showButton.style.display =
        "inline-block";


    const card =
        flashcards[currentIndex];


    question.textContent =
        card.question;


    // SHOW / HIDE ANSWER

    if (answerVisible) {

        answer.textContent =
            card.answer;

        label.textContent =
            "ANSWER";

        showButton.textContent =
            "🙈 Hide Answer";

    } else {

        answer.textContent =
            "";

        label.textContent =
            "QUESTION";

        showButton.textContent =
            "👀 Show Answer";
    }


    // COUNTER

    counter.textContent =
        `Card ${currentIndex + 1} of ${flashcards.length}`;


    // PROGRESS BAR

    const percentage =
        ((currentIndex + 1) /
            flashcards.length) * 100;


    progress.style.width =
        `${percentage}%`;


    // LOAD EDIT FIELDS

    loadEditFields();


    // DISPLAY CARD LIST

    displayCardsList();
}


// SHOW / HIDE ANSWER

function toggleAnswer() {

    answerVisible =
        !answerVisible;

    displayCard();
}


// NEXT CARD

function nextCard() {

    if (flashcards.length === 0) {
        return;
    }


    currentIndex++;


    if (
        currentIndex >=
        flashcards.length
    ) {

        currentIndex = 0;
    }


    answerVisible = false;

    displayCard();
}


// PREVIOUS CARD

function previousCard() {

    if (flashcards.length === 0) {
        return;
    }


    currentIndex--;


    if (currentIndex < 0) {

        currentIndex =
            flashcards.length - 1;
    }


    answerVisible = false;

    displayCard();
}


// ADD FLASHCARD

function addCard() {

    const questionInput =
        document.getElementById(
            "question-input"
        );


    const answerInput =
        document.getElementById(
            "answer-input"
        );


    const question =
        questionInput.value.trim();


    const answer =
        answerInput.value.trim();


    // VALIDATION

    if (!question || !answer) {

        alert(
            "Please enter both a question and an answer."
        );

        return;
    }


    // ADD CARD

    flashcards.push({

        question: question,

        answer: answer

    });


    saveCards();


    // CLEAR INPUTS

    questionInput.value =
        "";

    answerInput.value =
        "";


    // OPEN NEW CARD

    currentIndex =
        flashcards.length - 1;


    answerVisible = false;


    displayCard();


    alert(
        "Flashcard added successfully!"
    );
}


// LOAD CURRENT CARD INTO EDIT FORM

function loadEditFields() {

    if (flashcards.length === 0) {
        return;
    }


    const card =
        flashcards[currentIndex];


    document.getElementById(
        "edit-question"
    ).value =
        card.question;


    document.getElementById(
        "edit-answer"
    ).value =
        card.answer;
}


// SAVE EDITED CARD

function saveEdit() {

    if (flashcards.length === 0) {

        alert(
            "There is no flashcard to edit."
        );

        return;
    }


    const question =
        document.getElementById(
            "edit-question"
        ).value.trim();


    const answer =
        document.getElementById(
            "edit-answer"
        ).value.trim();


    // VALIDATION

    if (!question || !answer) {

        alert(
            "Question and answer cannot be empty."
        );

        return;
    }


    // UPDATE CARD

    flashcards[currentIndex] = {

        question: question,

        answer: answer

    };


    saveCards();


    answerVisible = false;


    displayCard();


    alert(
        "Flashcard updated successfully!"
    );
}


// DELETE CURRENT CARD

function deleteCard() {

    if (flashcards.length === 0) {
        return;
    }


    const confirmed =
        confirm(
            "Are you sure you want to delete this flashcard?"
        );


    if (!confirmed) {
        return;
    }


    // DELETE

    flashcards.splice(
        currentIndex,
        1
    );


    // FIX INDEX

    if (
        currentIndex >=
        flashcards.length
    ) {

        currentIndex =
            flashcards.length - 1;
    }


    if (currentIndex < 0) {

        currentIndex = 0;
    }


    answerVisible = false;


    saveCards();


    displayCard();


    alert(
        "Flashcard deleted successfully!"
    );
}


// DISPLAY ALL FLASHCARDS

function displayCardsList() {

    const list =
        document.getElementById(
            "cards-list"
        );


    list.innerHTML =
        "";


    // EMPTY LIST

    if (flashcards.length === 0) {

        list.innerHTML =
            "<p>No flashcards available.</p>";

        return;
    }


    // CREATE LIST ITEMS

    flashcards.forEach(
        (card, index) => {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "card-item";


            // HIGHLIGHT CURRENT CARD

            if (
                index === currentIndex
            ) {

                item.classList.add(
                    "active"
                );
            }


            item.innerHTML = `

                <strong>
                    ${index + 1}. ${card.question}
                </strong>

                <span>
                    Click to open this flashcard
                </span>

            `;


            // OPEN CARD

            item.onclick = function() {

                currentIndex =
                    index;


                answerVisible =
                    false;


                displayCard();


                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });
            };


            list.appendChild(item);
        }
    );
}


// START APPLICATION

displayCard();