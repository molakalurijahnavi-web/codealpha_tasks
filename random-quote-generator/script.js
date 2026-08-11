const quotes = [

    // MOTIVATION

    {
        text: "The future belongs to those who believe in the beauty of their dreams.",
        author: "Eleanor Roosevelt",
        category: "Motivation"
    },

    {
        text: "It always seems impossible until it's done.",
        author: "Nelson Mandela",
        category: "Motivation"
    },

    {
        text: "You miss 100% of the shots you don't take.",
        author: "Wayne Gretzky",
        category: "Motivation"
    },

    {
        text: "The secret of getting ahead is getting started.",
        author: "Mark Twain",
        category: "Motivation"
    },


    // LIFE

    {
        text: "Life is really simple, but we insist on making it complicated.",
        author: "Confucius",
        category: "Life"
    },

    {
        text: "Happiness depends upon ourselves.",
        author: "Aristotle",
        category: "Life"
    },

    {
        text: "In the middle of difficulty lies opportunity.",
        author: "Albert Einstein",
        category: "Life"
    },

    {
        text: "Life is a succession of lessons which must be lived to be understood.",
        author: "Helen Keller",
        category: "Life"
    },


    // SUCCESS

    {
        text: "Success is not final; failure is not fatal.",
        author: "Winston Churchill",
        category: "Success"
    },

    {
        text: "Success is the sum of small efforts, repeated day in and day out.",
        author: "Robert Collier",
        category: "Success"
    },

    {
        text: "The way to get started is to quit talking and begin doing.",
        author: "Walt Disney",
        category: "Success"
    },

    {
        text: "Opportunities don't happen. You create them.",
        author: "Chris Grosser",
        category: "Success"
    },


    // STUDY

    {
        text: "Live as if you were to die tomorrow. Learn as if you were to live forever.",
        author: "Mahatma Gandhi",
        category: "Study"
    },

    {
        text: "The beautiful thing about learning is that nobody can take it away from you.",
        author: "B. B. King",
        category: "Study"
    },

    {
        text: "An investment in knowledge pays the best interest.",
        author: "Benjamin Franklin",
        category: "Study"
    },

    {
        text: "Education is the most powerful weapon which you can use to change the world.",
        author: "Nelson Mandela",
        category: "Study"
    },


    // GROWTH

    {
        text: "We cannot become what we want by remaining what we are.",
        author: "Oprah Winfrey",
        category: "Growth"
    },

    {
        text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
        author: "Nelson Mandela",
        category: "Growth"
    },

    {
        text: "What we think, we become.",
        author: "Buddha",
        category: "Growth"
    },

    {
        text: "The only person you are destined to become is the person you decide to be.",
        author: "Ralph Waldo Emerson",
        category: "Growth"
    },


    // LEARNING

    {
        text: "The more that you read, the more things you will know.",
        author: "Dr. Seuss",
        category: "Learning"
    },

    {
        text: "Learning never exhausts the mind.",
        author: "Leonardo da Vinci",
        category: "Learning"
    },

    {
        text: "Anyone who stops learning is old, whether at twenty or eighty.",
        author: "Henry Ford",
        category: "Learning"
    },

    {
        text: "I am still learning.",
        author: "Michelangelo",
        category: "Learning"
    }
];


let favorites =
    JSON.parse(localStorage.getItem("favoriteQuotes")) || [];

let currentQuoteIndex = 0;


/* GET AVAILABLE QUOTES */

function getAvailableQuotes() {

    const category =
        document.getElementById("category-select").value;

    if (category === "All") {
        return quotes;
    }

    return quotes.filter(
        quote => quote.category === category
    );
}


/* DISPLAY QUOTE */

function generateQuote() {

    const availableQuotes =
        getAvailableQuotes();

    const selectedQuote =
        availableQuotes[currentQuoteIndex];

    const quoteElement =
        document.getElementById("quote");

    const authorElement =
        document.getElementById("author");

    const categoryElement =
        document.getElementById("category");

    quoteElement.style.opacity = "0";
    quoteElement.style.transform =
        "translateY(10px)";

    setTimeout(() => {

        quoteElement.textContent =
            `"${selectedQuote.text}"`;

        authorElement.textContent =
            `— ${selectedQuote.author}`;

        categoryElement.textContent =
            selectedQuote.category;

        document.getElementById(
            "quote-counter"
        ).textContent =
            `Quote ${currentQuoteIndex + 1} of ${availableQuotes.length}`;

        quoteElement.style.opacity = "1";
        quoteElement.style.transform =
            "translateY(0)";

        updateFavoriteButton();

    }, 200);
}


/* NEW QUOTE */

function nextQuote() {

    const availableQuotes =
        getAvailableQuotes();

    currentQuoteIndex++;

    if (
        currentQuoteIndex >=
        availableQuotes.length
    ) {
        currentQuoteIndex = 0;
    }

    generateQuote();
}


/* CATEGORY CHANGE */

function filterQuotes() {

    currentQuoteIndex = 0;

    generateQuote();
}


/* COPY QUOTE */

function copyQuote() {

    const quote =
        document.getElementById("quote").textContent;

    const author =
        document.getElementById("author").textContent;

    navigator.clipboard.writeText(
        `${quote} ${author}`
    );

    const message =
        document.getElementById("copy-message");

    message.textContent =
        "✓ Quote copied!";

    setTimeout(() => {
        message.textContent = "";
    }, 2000);
}


/* FAVORITE */

function toggleFavorite() {

    const quoteText =
        document.getElementById("quote").textContent;

    const author =
        document.getElementById("author").textContent;

    const category =
        document.getElementById("category").textContent;

    const existingIndex =
        favorites.findIndex(
            favorite =>
                favorite.text === quoteText
        );

    if (existingIndex === -1) {

        favorites.push({
            text: quoteText,
            author: author,
            category: category
        });

    } else {

        favorites.splice(existingIndex, 1);
    }

    localStorage.setItem(
        "favoriteQuotes",
        JSON.stringify(favorites)
    );

    updateFavoriteButton();
    updateFavoritesButton();
    displayFavorites();
}


/* UPDATE FAVORITE BUTTON */

function updateFavoriteButton() {

    const quoteText =
        document.getElementById("quote").textContent;

    const button =
        document.getElementById("favorite-btn");

    const isFavorite =
        favorites.some(
            favorite =>
                favorite.text === quoteText
        );

    if (isFavorite) {

        button.textContent =
            "💖 Favorited";

    } else {

        button.textContent =
            "❤️ Favorite";
    }
}


/* UPDATE FAVORITES BUTTON */

function updateFavoritesButton() {

    const button =
        document.getElementById("view-favorites");

    if (favorites.length > 0) {

        button.style.display = "block";

        button.textContent =
            `❤️ Favorites (${favorites.length})`;

    } else {

        button.style.display = "none";
    }
}


/* SHOW / HIDE FAVORITES */

function toggleFavorites() {

    const section =
        document.querySelector(".favorites-section");

    if (section.style.display === "block") {

        section.style.display = "none";

    } else {

        section.style.display = "block";

        displayFavorites();
    }
}


/* DISPLAY FAVORITES */

function displayFavorites() {

    const list =
        document.getElementById("favorites-list");

    list.innerHTML = "";

    favorites.forEach(
        (favorite, index) => {

            const item =
                document.createElement("div");

            item.className =
                "favorite-item";

            item.innerHTML = `
                <p>${favorite.text}</p>

                <p>
                    <strong>${favorite.author}</strong>
                </p>

                <span>
                    ${favorite.category}
                </span>

                <button
                    class="remove-btn"
                    onclick="removeFavorite(${index})">
                    ×
                </button>
            `;

            list.appendChild(item);
        }
    );
}


/* REMOVE FAVORITE */

function removeFavorite(index) {

    favorites.splice(index, 1);

    localStorage.setItem(
        "favoriteQuotes",
        JSON.stringify(favorites)
    );

    updateFavoritesButton();
    displayFavorites();
    updateFavoriteButton();
}


/* DARK MODE */

function toggleTheme() {

    document.body.classList.toggle(
        "dark-mode"
    );

    const button =
        document.getElementById("theme-toggle");

    if (
        document.body.classList.contains(
            "dark-mode"
        )
    ) {

        button.textContent =
            "☀️ Light Mode";

    } else {

        button.textContent =
            "🌙 Dark Mode";
    }
}


/* START APP */

generateQuote();

updateFavoritesButton();