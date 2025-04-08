# Language Flashcard App

## Setup Instructions

### Prerequisites
- Node.js and npm installed
- MongoDB Atlas URI and Google Translate API Key

### Steps
1. Clone or unzip the project.
2. In the `backend/` folder, run:
   ```bash
   npm install
   node server.js
   ```
3. Open `frontend/index.html` in a browser.

### Features
- Role-based login (admin, member, guest)
- Google Translate API integration
- Flashcard creation, update, delete (admin only), view (all roles)
- Accountable request logging to MongoDB
