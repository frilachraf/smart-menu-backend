Restaurant Menu API

This is the backend API for the Digital Restaurant Menu project.
The API handles authentication and menu management. Frontend applications can consume these endpoints to allow restaurants to digitize their menus.

🚀 Getting Started
1. Clone the repository
git clone https://github.com/your-username/restaurant-menu-api.git
cd restaurant-menu-api

2. Install dependencies
npm install

3. Configure environment variables

Create a .env file in the project root with the following keys (replace values with yours):

PORT=4000
DATABASE_URL=postgres://user:password@localhost:5432/restaurant_db
JWT_SECRET=your-secret-key


⚠️ Never commit your .env file to GitHub.

4. Run the server
npm run dev


The API will be running at:

http://localhost:4000
