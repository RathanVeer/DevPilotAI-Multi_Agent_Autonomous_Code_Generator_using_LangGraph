# SimpleWebApp

## Title & Description

**SimpleWebApp** is a minimal full‑stack guestbook application that demonstrates how a web front‑end can interact with a back‑end API to create, read, and delete guest entries. It showcases a clear separation of concerns by using a lightweight **Node.js/Express** server for the API and a plain **HTML/CSS/JavaScript** front‑end for the user interface. The purpose of the project is educational – to provide a concise example of CRUD operations, CORS handling, and basic front‑end integration without any heavy frameworks.

---

## Prerequisites

- **Python 3.8+** – required only for the optional documentation generation scripts (the core app runs on Node.js).
- **Node.js (v14 or later)** – the runtime for the back‑end server.
- **npm** – Node package manager (comes with Node.js).
- **Virtual environment tool** (`venv`) – for isolating any Python‑based tooling.
- **pip** – Python package installer (used to install optional dev tools).

---

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/simple-webapp.git
   cd simple-webapp
   ```

2. **Create and activate a Python virtual environment** (optional, for documentation tools)
   ```bash
   python -m venv venv
   # On macOS/Linux
   source venv/bin/activate
   # On Windows PowerShell
   .\venv\Scripts\Activate.ps1
   ```

3. **Install Python‑side dependencies** (if you plan to run the optional scripts)
   ```bash
   pip install -r requirements.txt  # file may be empty for now
   ```

4. **Install Node.js dependencies**
   ```bash
   cd backend
   npm install
   cd ../frontend
   # No dependencies for the static front‑end, but you can install a static server if you like
   # npm install -g serve   # optional
   ```

---

## Running the App

1. **Start the back‑end API**
   ```bash
   cd backend
   # Production mode
   npm start
   # Or development mode with hot‑reloading
   npm run dev
   ```
   The server will listen on **http://localhost:3000** by default.

2. **Open the front‑end**
   - The simplest way is to open `frontend/index.html` directly in a browser.
   - For a more realistic experience (CORS handling, proper MIME types), serve the folder with a static server:
     ```bash
     cd frontend
     npx serve .
     ```
     This will usually expose the UI at **http://localhost:5000** (or another port shown by the tool).

3. **Interact with the application**
   - Navigate to the front‑end URL.
   - Submit a name and a short message using the form.
   - The entry will be posted to the back‑end API and displayed in the guest list.

---

## Project Structure

```
simple-webapp/
├─ backend/                # Node.js/Express API
│   ├─ package.json        # Project metadata & scripts
│   ├─ server.js           # Main server file (exposes /api/entries)
│   └─ ...                 # Other backend source files
├─ frontend/               # Static front‑end assets
│   ├─ index.html          # Main HTML page
│   ├─ css/
│   │   └─ styles.css      # Basic styling
│   └─ js/
│       └─ app.js          # JavaScript that talks to the API
├─ README.md               # This documentation file
├─ requirements.txt        # (Optional) Python dependencies for docs/tools
└─ .gitignore              # Git ignore rules
```

- **backend/** – Contains the Express server that stores guest entries **in memory** and provides a JSON REST API.
- **frontend/** – Holds the static HTML page, CSS, and vanilla JavaScript that renders the UI and calls the API.
- **requirements.txt** – Placeholder for any Python packages you may need for auxiliary scripts (e.g., documentation generation).

---

## Usage

1. **Submit a name** – Fill in the "Name" and "Message" fields on the front‑end form and click **Submit**. The data is sent via a `POST /api/entries` request.
2. **View the guest list** – All entries are displayed below the form. The list is refreshed automatically after each successful submission.
3. **Delete an entry** – (Optional) Each entry includes a **Delete** button that issues a `DELETE /api/entries/:id` request.
4. **Data persistence** – All entries are stored **only in memory** on the server. Restarting the back‑end will clear the guest list.

---

## Future Improvements

- **Persist data** – Replace the in‑memory array with a lightweight database such as SQLite, MongoDB, or a JSON file.
- **User authentication** – Add login/registration so only registered users can post or delete entries.
- **Input validation & sanitisation** – Prevent XSS and enforce length limits on names/messages.
- **Styling & UI enhancements** – Use a CSS framework (e.g., Tailwind or Bootstrap) for a more polished look.
- **Testing** – Add unit and integration tests for both the API (using Jest or Mocha) and the front‑end logic.
- **Dockerisation** – Provide Dockerfiles and a `docker-compose.yml` to spin up the whole stack with a single command.

---

*Happy coding!*