const books = [
    { title: "1984", author: "George Orwell", year: 1949, genre: "Антиутопія", rating: 4.9 },
    { title: "Майстер і Маргарита", author: "Михайло Булгаков", year: 1967, genre: "Роман", rating: 4.8 },
    { title: "Гаррі Поттер і філософський камінь", author: "Джоан Роулінг", year: 1997, genre: "Фентезі", rating: 4.7 },
    { title: "Тарас Бульба", author: "Микола Гоголь", year: 1835, genre: "Історія", rating: 4.1 },
    { title: "Кобзар", author: "Тарас Шевченко", year: 1840, genre: "Поезія", rating: 4.9 },
    { title: "Лісова пісня", author: "Леся Українка", year: 1911, genre: "Драма", rating: 4.6 },
    { title: "Захар Беркут", author: "Іван Франко", year: 1883, genre: "Історія", rating: 4.4 }
];

const output = document.getElementById("output");

function renderBooks(bookArray, title = "Список книг") {
    if (!Array.isArray(bookArray) || bookArray.length === 0) {
        output.innerHTML = `<div class="section-title">${title}</div><p>Нічого не знайдено.</p>`;
        return;
    }

    output.innerHTML = `
        <div class="section-title">${title}</div>
        ${bookArray.map(book => `
            <div class="book-card">
                <strong>Назва:</strong> ${book.title}<br>
                <strong>Автор:</strong> ${book.author}<br>
                <strong>Рік:</strong> ${book.year}<br>
                <strong>Жанр:</strong> ${book.genre}<br>
                <strong>Рейтинг:</strong> ${book.rating}
            </div>
        `).join("")}
    `;
}

function showBooks() {
    renderBooks(books, "Усі книги");
}

function searchBooks() {
    const query = prompt("Введіть назву книги або автора:");
    if (query === null) return;

    const normalizedQuery = query.trim().toLowerCase();

    if (normalizedQuery === "") {
        output.innerHTML = "<p>Пошуковий запит порожній.</p>";
        return;
    }

    const foundBooks = books.filter(book =>
        book.title.toLowerCase().includes(normalizedQuery) ||
        book.author.toLowerCase().includes(normalizedQuery)
    );

    renderBooks(foundBooks, `Результати пошуку: "${query}"`);
}

function filterBooks() {
    const genreInput = prompt("Введіть жанр для фільтрації (наприклад: Історія, Поезія, Фентезі):");
    if (genreInput === null) return;

    const ratingInput = prompt("Введіть мінімальний рейтинг (наприклад: 4.5):");
    if (ratingInput === null) return;

    const genre = genreInput.trim().toLowerCase();
    const minRating = Number(ratingInput);

    if (Number.isNaN(minRating)) {
        output.innerHTML = "<p>Некоректно введено рейтинг.</p>";
        return;
    }

    const filteredBooks = books.filter(book =>
        book.genre.toLowerCase().includes(genre) &&
        book.rating >= minRating
    );

    renderBooks(filteredBooks, `Фільтр: жанр "${genreInput}", рейтинг від ${minRating}`);
}

function showTopBooks() {
    const topBooks = [...books]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 5);

    renderBooks(topBooks, "Топ-5 книг за рейтингом");
}

function showStatistics() {
    const averageRating = (
        books.reduce((sum, book) => sum + book.rating, 0) / books.length
    ).toFixed(2);

    const genreStats = books.reduce((acc, book) => {
        acc[book.genre] = (acc[book.genre] || 0) + 1;
        return acc;
    }, {});

    const topBook = [...books].sort((a, b) => b.rating - a.rating)[0];

    output.innerHTML = `
        <div class="section-title">Статистика бібліотеки</div>
        <p><strong>Кількість книг:</strong> ${books.length}</p>
        <p><strong>Середній рейтинг:</strong> ${averageRating}</p>
        <p><strong>Книга з найвищим рейтингом:</strong> ${topBook.title} (${topBook.rating})</p>
        <div class="section-title">Розподіл за жанрами:</div>
        ${Object.entries(genreStats).map(([genre, count]) => `
            <p>${genre}: ${count}</p>
        `).join("")}
    `;
}

function union(a, b) {
    return [...new Set([...a, ...b])];
}

function intersection(a, b) {
    return a.filter(item => b.includes(item));
}

function difference(a, b) {
    return a.filter(item => !b.includes(item));
}

function showSetOperations() {
    const author1Genres = ["Антиутопія", "Роман", "Фентезі", "Історія"];
    const author2Genres = ["Поезія", "Історія", "Драма", "Роман"];

    const unionResult = union(author1Genres, author2Genres);
    const intersectionResult = intersection(author1Genres, author2Genres);
    const differenceResult = difference(author1Genres, author2Genres);

    output.innerHTML = `
        <div class="section-title">Операції з множинами</div>

        <p><strong>Жанри автора 1:</strong> ${author1Genres.join(", ")}</p>
        <p><strong>Жанри автора 2:</strong> ${author2Genres.join(", ")}</p>

        <div class="section-title">union(a, b)</div>
        <p>${unionResult.join(", ")}</p>

        <div class="section-title">intersection(a, b)</div>
        <p>${intersectionResult.join(", ")}</p>

        <div class="section-title">difference(a, b)</div>
        <p>${differenceResult.join(", ")}</p>
    `;
}

function resetOutput() {
    output.innerHTML = "Натисни кнопку для виконання операції.";
}