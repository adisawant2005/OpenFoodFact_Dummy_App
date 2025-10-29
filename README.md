# 🍏 OpenFoodFact Dummy App

This repository is a minimal demo/dummy client for **OpenFoodFacts.org**. Its purpose is to provide a small, self-contained example showing how a **React Native** app can query product data by barcode through a lightweight **Express** server. It's intended for testing, demos, and developer learning — **not production use**.

The app performs simple product lookups using the **OpenFoodFacts public API** and displays the returned **JSON** in the mobile UI.

Screenshot (app UI):

<img width="377" height="801" alt="Screenshot 2025-10-29 085515" src="https://github.com/user-attachments/assets/84eff384-99f1-491f-8806-c7ae3068cabe" />

<img width="380" height="805" alt="Screenshot 2025-10-29 085350" src="https://github.com/user-attachments/assets/13b43bcf-c16e-48bd-a384-4d833ef5a2d9" />

<img width="378" height="808" alt="Screenshot 2025-10-29 085200" src="https://github.com/user-attachments/assets/0e52c20b-a2bb-4918-ae15-44121a1b7b48" />

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
