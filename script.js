const API_KEY = "DEMO_KEY"; // 👉 Replace with your NASA API key for better performance

// Run when page loads
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

    // 🚫 Prevent future date
    if (date > today) {
        showError("Future dates are not allowed.");
        return;
    }

    // 🚫 Check correct format
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        showError("Invalid date format. Use YYYY-MM-DD.");
        return;
    }

    fetchImage(date);
    saveSearch(date);
}

// 🔁 Fetch image from NASA API
function fetchImage(date) {
    const container = document.getElementById("current-image-container");

    container.innerHTML = "<p>Loading...</p>";

    fetch(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=${API_KEY}`)
        .then(res => res.json())
        .then(data => {
            console.log("API Response:", data);

            // ❌ Handle API error
            if (data.code || data.error) {
                throw new Error(data.msg || data.error.message);
            }

            displayImage(data);
        })
        .catch((err) => {
            console.error("Fetch Error:", err);
            showError("Failed to load data. Try another valid date.");
        });
}

// 🎯 Display image or video
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

// ❌ Show error message
function showError(message) {
    const container = document.getElementById("current-image-container");
    container.innerHTML = `<p>${message}</p>`;
}

// 💾 Save search date
function saveSearch(date) {
    let searches = JSON.parse(localStorage.getItem("searches")) || [];

    if (!searches.includes(date)) {
        searches.push(date);
        localStorage.setItem("searches", JSON.stringify(searches));
    }

    addSearchToHistory();
}

// 📜 Display search history
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

    if (!date) {
        showError("Please select a date.");
        return;
    }

    getImageOfTheDay(date);
});
