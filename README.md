# 🌤️ ClearSky - Weather App

## 🚀 Overview

ClearSky is a modern web application that provides **real-time weather updates** for any location. Built with **Node.js, TypeScript, Angular, and MongoDB**, it ensures fast, reliable, and user-friendly weather forecasting.

---

## ✨ Features

### 🌍 Backend

-   **Weather API Integration**: Fetches live weather data from **OpenWeatherMap**.
-   **MongoDB Caching**: Stores weather data to **reduce API calls** and improve performance.
-   **RESTful API Endpoints**:
    -   `GET /api/weather/:location` → Retrieves weather for a given location.
-   **Automated Data Updates**:
    -   **Cron Job** runs **every 6 hours** to refresh stored weather data.
-   **Robust Error Handling**:
    -   Handles API failures and database errors gracefully.

### 🎨 Frontend

-   **User Authentication & Authorization**:
    -   Users can **sign up, log in, and save favorite locations**.
    -   Guests can view weather without logging in.
-   **Intuitive Weather Display**:
    -   Search and view **temperature, humidity, wind speed, and conditions**.
-   **User Features**:
    -   🌍 **Save Places** - Quick access to preferred locations.
    -   🎭 **Dark/Light Mode** - Choose your theme.
    -   🌡️ **Unit Conversion** - Switch between **Celsius and Fahrenheit**.
    -   ⚡ **Smooth UI** - Loaders for a seamless experience.
-   **Error Handling & Alerts**:
    -   Displays meaningful error messages when needed.

---

## 🛠️ Setup & Installation

### ⚡ Prerequisites

-   **Node.js & npm** installed
-   **MongoDB** (Atlas or local instance)
-   **Angular CLI** installed

### 🔧 Backend Setup

1. **Clone the repository**:
    ```sh
    git clone https://github.com/Dimdivanov/ClearSky.git
    ```
2. **Navigate to the backend folder**:
    ```sh
    cd server
    ```
3. **Install dependencies**:
    ```sh
    npm install
    ```
4. **Start the server**:
    ```sh
    npm start
    ```
5. **Start the Cronjob**:
    ```sh
    npm run debug
    ```

### 🎨 Frontend Setup

1. **Navigate to the frontend folder**:
    ```sh
    cd client/clearsky/src/app
    ```
2. **Install dependencies**:
    ```sh
    npm install
    ```
3. **Start the Angular development server**:
    ```sh
    ng serve
    ```
4. **Open the app**:
    ```
    http://localhost:4200
    ```

---

## 🔜 Roadmap

### ✅ Completed Tasks:

-   [x] Weather API Integration (OpenWeatherMap)
-   [x] MongoDB Caching & Updates
-   [x] Cron Job (6-hour refresh)
-   [x] REST API Endpoints
-   [x] Error Handling Enhancements
-   [x] User Authentication & Authorization
-   [x] Saved Places Feature
-   [x] Guest Weather Access
-   [x] UI Enhancements (Loaders, Themes, Unit Conversion)

---

## 🤝 Contribution

Want to contribute? Feel free to submit a **pull request**! Make sure to follow best practices and document your changes properly. 🙌

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 📬 Contact

For questions or feedback, open an issue on [GitHub Issues](https://github.com/Dimdivanov/ClearSky/issues).

> > > > > > > d416c95 (Initial commit)
