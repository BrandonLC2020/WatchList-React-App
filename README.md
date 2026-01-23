# WatchList React App

A comprehensive mobile application for discovering movies and managing a personal watchlist. This project features a modern **React Native (Expo)** frontend and a robust **.NET 9.0 Web API** backend, utilizing **Google Cloud Firestore** for persistence and **The Movie Database (TMDB)** for data.

## 🚀 Tech Stack

### Frontend

* **Framework:** [React Native](https://reactnative.dev/) with [Expo SDK 54](https://expo.dev/)
* **Language:** TypeScript
* **Routing:** [Expo Router](https://docs.expo.dev/router/introduction/) (File-based routing)
* **State Management/Data Fetching:** [TanStack Query (React Query)](https://tanstack.com/query/latest)
* **Styling:** Expo Themed Components (Dark/Light mode support)
* **Authentication:** Firebase Auth (Client-side)

### Backend

* **Framework:** ASP.NET Core Web API (.NET 9.0)
* **Language:** C#
* **Database:** Google Cloud Firestore (NoSQL)
* **Authentication:** JWT Bearer (Firebase Admin SDK integration)
* **Documentation:** Swagger / OpenAPI
* **External API:** [TMDbLib](https://github.com/LordMike/TMDbLib) (Wrapper for The Movie Database)

---

## 📋 Prerequisites

Before running the project, ensure you have the following installed:

1. **Node.js** (LTS version recommended)
2. **To run the Backend:** [.NET 9.0 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/9.0)
3. **To run the Frontend:** [Expo Go](https://expo.dev/go) app on your physical device, or an Android/iOS Simulator.
4. **API Keys:**
* **TMDB API Key:** Get one at [themoviedb.org](https://www.themoviedb.org/documentation/api).
* **Firebase Project:** Create a project at [console.firebase.google.com](https://console.firebase.google.com/) (Enable Firestore and Authentication).



---

## 🛠️ Backend Setup

The backend serves as the bridge between the frontend, the Firestore database, and the TMDB API.

1. **Navigate to the backend directory:**
```bash
cd backend/src/WatchListApi

```


2. **Configure Application Settings:**
Open (or create) `appsettings.Development.json` and configure your keys. You need your Firebase Project ID and your TMDB API Key.
```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "Firebase": {
    "ProjectId": "YOUR_FIREBASE_PROJECT_ID",
    "CredentialPath": "path/to/your/firebase-adminsdk.json" 
  },
  "Tmdb": {
    "ApiKey": "YOUR_TMDB_API_KEY"
  }
}

```


*Note: For `CredentialPath`, you must generate a Service Account private key JSON file from the Firebase Console (Project Settings > Service accounts) and save it locally.*
3. **Restore Dependencies:**
```bash
dotnet restore

```


4. **Run the API:**
```bash
dotnet run

```


The API will typically start on `https://localhost:7198` (or similar). You can view the Swagger documentation at `https://localhost:7198/swagger`.

---

## 📱 Frontend Setup

The frontend is a cross-platform mobile app built with Expo.

1. **Navigate to the frontend directory:**
```bash
cd frontend

```


2. **Install Dependencies:**
```bash
npm install

```


3. **Environment Configuration:**
Ensure your API client is pointing to your running .NET backend. Check `frontend/api/client.ts` (or equivalent configuration file) and update the `baseURL` to your machine's IP address if running on a physical device, or `localhost` if using a simulator.
*Example:*
```typescript
// If using Android Emulator
const baseURL = 'http://10.0.2.2:5xxx/api'; 
// If using Physical Device
const baseURL = 'http://192.168.1.XX:5xxx/api';

```


4. **Start the Expo Server:**
```bash
npx expo start

```


5. **Run the App:**
* **Physical Device:** Scan the QR code with the Expo Go app.
* **iOS Simulator:** Press `i`.
* **Android Emulator:** Press `a`.



---

## ✨ Features

* **Discover Movies:** Browse trending lists and discover new content via the TMDB integration.
* **Search:** Multi-search functionality to find movies and TV shows.
* **Movie Details:** View deep details, including description, cast, and where to watch (Watch Providers).
* **Watchlist Management:**
* Add movies to your personal watchlist.
* Remove movies when watched.
* Data is synced in real-time via the backend to Google Firestore.


* **Secure Auth:** User authentication handled via Firebase, with secure JWT token validation on the backend.

---

## 📂 Project Structure

```text
.
├── backend/
│   ├── src/WatchListApi/
│   │   ├── Controllers/       # API Endpoints (Movies, WatchList)
│   │   ├── Models/            # Data Transfer Objects & Domain Models
│   │   ├── Services/          # Business Logic (TMDB integration)
│   │   └── Program.cs         # App Entry, DI & Config
│   └── ...
├── frontend/
│   ├── app/                   # Expo Router screens (Tabs, Modals)
│   ├── api/                   # API Client definitions
│   ├── components/            # Reusable UI components
│   ├── constants/             # Theme and Type definitions
│   └── hooks/                 # Custom React hooks (Theme, Layout)
└── ...

```

## 🤝 Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes.
4. Push to the branch.
5. Open a Pull Request.

## 📄 License

[MIT](https://www.google.com/search?q=LICENSE)