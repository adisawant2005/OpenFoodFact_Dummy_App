# 🍏 OpenFoodFact Dummy App

This repository is a minimal demo/dummy client for **OpenFoodFacts.org**. Its purpose is to provide a small, self-contained example showing how a **React Native** app can query product data by barcode through a lightweight **Express** server. It's intended for testing, demos, and developer learning — **not production use**.

The app performs simple product lookups using the **OpenFoodFacts public API** and displays the returned **JSON** in the mobile UI.

Screenshot (app UI):



---

## 🛠️ Technology Stack

This project utilizes a simple **client-server architecture**:

* **Client:** **React Native** (`0.82.1`) using **React Navigation** for the mobile user interface and handling barcode input.
* **Server:** **Node.js** with **Express** (`^5.1.0`) as a minimal intermediary API to manage requests to the OpenFoodFacts API, using **Axios** (`^1.5.0`) for HTTP requests.
* **Utilities:** **Concurrenty** (`^9.2.1`) is used to run the client and server simultaneously during development.

---

## ✨ Features

* **Barcode Scanning/Input:** Users can enter a product barcode (EAN-13, UPC, etc.).
* **API Lookup:** The React Native client calls the Express server, which then fetches product data from the official **OpenFoodFacts API**.
* **Raw Data Display:** The app displays the **raw JSON response** from the API for easy inspection.
* **Security Headers:** The Express server includes **Helmet** (`^6.0.1`) for basic security hardening.

---

## 🚀 Getting Started

### Prerequisites

* **Node.js** (Version **>=20**)
* **npm** or **yarn**
* **React Native environment setup** (including Metro, JDK, Android Studio/Xcode)

### 1. Clone the Repository

```bash
git clone [https://github.com/your-username/openfoodfact-dummy-app.git](https://github.com/your-username/openfoodfact-dummy-app.git)
cd openfoodfact-dummy-app