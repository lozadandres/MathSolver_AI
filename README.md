# MathSolver AI - Mathematical Assistant

MathSolver AI is an interactive web application that serves as your personal mathematical assistant. Using artificial intelligence, it provides detailed solutions and explanations for various mathematical problems, from basic arithmetic to complex calculus.

## Features

- Interactive chat interface for mathematical queries
- Real-time responses with detailed explanations
- Support for various mathematical topics:
  - Equation solving
  - Algebraic concepts
  - Calculus problems
  - Geometric calculations
  - Step-by-step solutions
  - Theorem explanations

## Tech Stack

- Frontend: React + Vite
- Backend: Node.js
- AI Integration: OpenAI API

## Project Structure

```
├── frontend/           # React frontend application
│   ├── src/           # Source files
│   ├── public/        # Public assets
│   └── package.json   # Frontend dependencies
├── app.js             # Backend server
├── package.json       # Backend dependencies
└── .env              # Environment variables (not tracked in git)
```

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd mathsolver-ai
   ```

2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

4. Create a `.env` file in the root directory with your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

5. Start the backend server:
   ```bash
   node app.js
   ```

6. Start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

7. Open your browser and navigate to `http://localhost:5173`

## Usage

1. Open the application in your web browser
2. Type your mathematical question in the input field
3. Press Enter or click the Send button
4. Receive detailed explanations and solutions

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.