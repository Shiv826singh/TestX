const API_KEY = "YOUR_API_KEY";

// Run on page load
document.addEventListener("DOMContentLoaded", () => {
    getCurrentImageOfTheDay();
    addSearchToHistory();
});

// ✅ Get today's image
function getCurrentImageOfTheDay() {
    const currentDate = new Date().toISOString().split("T")[0];
    fetchImage(currentDate);
}

// ✅ Get image by date
function getImageOfTheDay(date) {
    fetchImage(date);
    saveSearch(date);
}

// 🔁 Common API function
function fetchImage(date) {
    const container = document.getElementById("current-image-container");

    container.innerHTML = "<p>Loading...</p>";

    fetch(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=${API_KEY}`)
        .then(res => {
            if (!res.ok) throw new Error("API Error");
            return res.json();
        })
        .then(data => displayImage(data))
        .catch(() => {
            container.innerHTML = "<p>Failed to load data. Try another date.</p>";
        });
}

// 🎯 Display data
function displayImage(data) {
    const container = document.getElementById("current-image-container");

    let mediaContent = "";

    if (data.media_type === "image") {
        mediaContent = `<img src="${data.url}" alt="NASA Image"/>`;
    } else {
        mediaContent = `<iframe src="${data.url}" frameborder="0" allowfullscreen></iframe>`;
    }

    container.innerHTML = `
        <h3>${data.title}</h3>
        ${mediaContent}
        <p>${data.explanation}</p>
    `;
}

// 💾 Save search
function saveSearch(date) {
    let searches = JSON.parse(localStorage.getItem("searches")) || [];

    if (!searches.includes(date)) {
        searches.push(date);
        localStorage.setItem("searches", JSON.stringify(searches));
    }

    addSearchToHistory();
}

// 📜 Show history
function addSearchToHistory() {
    const list = document.getElementById("search-history");
    list.innerHTML = "";

    let searches = JSON.parse(localStorage.getItem("searches")) || [];

    searches.forEach(date => {
        const li = document.createElement("li");
        li.textContent = date;

        li.addEventListener("click", () => {
            getImageOfTheDay(date);
        });

        list.appendChild(li);
    });
}

// 📝 Form submit
document.getElementById("search-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const date = document.getElementById("search-input").value;

    if (!date) return;

    getImageOfTheDay(date);
});
