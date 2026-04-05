# 🚀 NASA Picture of the Day (APOD) Project

This project is a web application that fetches and displays images from NASA's Astronomy Picture of the Day (APOD) API. Users can search for images by date, view the current image of the day, and save their search history.

---

## 📌 Features

- 🌍 Displays the **current image of the day** on page load  
- 🔍 Allows users to **search images by date**  
- 💾 Saves search history using **Local Storage**  
- 📜 Displays past searches in a clickable list  
- 🔁 Clicking a history item reloads that image  
- 🎥 Supports both **images and videos** from NASA API  
- ⚠️ Error handling for invalid requests  

---

## 🛠️ Technologies Used

- HTML  
- CSS  
- JavaScript (Vanilla JS)  
- NASA APOD API  

---

## 🔗 API Used

NASA Astronomy Picture of the Day API:  
https://api.nasa.gov/planetary/apod

---

## 🧠 How It Works

1. When the page loads, the app fetches today's image using the API.
2. The user selects a date and submits the form.
3. The app fetches the image for that selected date.
4. The searched date is saved in Local Storage.
5. The search history is displayed on the page.
6. Clicking a date in the history reloads that image.

---

## 📂 Project Structure
project-folder/
│
├── index.html
├── style.css
├── script.js
└── README.md


---

## ⚙️ Setup Instructions

1. Clone the repository or download the files  
2. Get your API key from NASA: https://api.nasa.gov/  
3. Replace `YOUR_API_KEY` in `script.js` with your API key  
4. Open `index.html` in your browser  

---

## 🚀 Deployment

You can deploy this project using:

- GitHub Pages  
- Netlify  
- Vercel  

