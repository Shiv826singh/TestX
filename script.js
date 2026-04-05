const API_KEY = "DEMO_KEY"; // replace with your NASA API key

document.addEventListener("DOMContentLoaded", () => {
    getCurrentImageOfTheDay();
    addSearchToHistory();
});

// ✅ Get today's image
function getCurrentImageOfTheDay() {
    const today = new Date().toISOString().split("T")[0];
    fetchImage(today);
}

// ✅ Get image by selected date
function getImageOfTheDay(date) {
    const today = new Date().toISOString().split("T")[0];

    // ❌ Prevent future date
    if (date > today) {
        showError("Future dates are not allowed.");
        return;
    }

    fetchImage(date);
    saveSearch(date);
}

// 🔁 Fetch API
function fetchImage(date) {
    const container = document.getElementById("current-image-container");

    container.innerHTML = "<p>Loading...</p>";

    fetch(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=${API_KEY}`)
        .then(res => res.json())
        .then(data => {
            if (data.code) {
                throw new Error(data.msg);
            }
            displayImage(data);
        })
        .catch(() => {
            showError("Failed to load data. Try another date.");
        });
}

// 🎯 Display result
function displayImage(data) {
    const container = document.getElementById("current-image-container");

    let media = "";

    if (data.media_type === "image") {
        media = `<img src="${data.url}" alt="NASA Image"/>`;
    } else {
        media = `<iframe src="${data.url}" frameborder="0" allowfullscreen></iframe>`;
    }

    container.innerHTML = `
        <h3>${data.title}</h3>
        ${media}
        <p>${data.explanation}</p>
    `;
}

// ❌ Show error
function showError(message) {
    const container = document.getElementById("current-image-container");
    container.innerHTML = `<p>${message}</p>`;
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

// 📜 Display history
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
