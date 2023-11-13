# Article Ranker

Article Ranker is a simple web application that allows users to add and rank articles based on votes.

# Backend: Next.js API Routes

This project utilizes [Next.js](https://nextjs.org/) API routes for handling backend functionality. Instead of using a separate backend framework like Express.js, Next.js API routes are integrated directly into the project structure. Here's why:

# Advantages of Next.js API Routes:

1. **Simplified Project Structure:**
    API routes are organized within the project itself, eliminating the need for a separate backend folder or file.

2. **Integrated with Frontend:**
    API routes can seamlessly share code and utilities with frontend components, promoting a unified development experience.

3. **Serverless Deployment:**
    Next.js API routes can be deployed serverlessly, allowing for easy hosting on platforms like Vercel or Netlify without the requirement of a separate server.

**Comparison with Express.js:**

Traditionally, Express.js is a popular choice for backend development. However, in this project, we've opted for Next.js API routes due to the following reasons:

### Integrated Ecosystem:
   - Next.js provides a cohesive ecosystem for both frontend and backend development, reducing the need for separate dependencies and configuration.

### Simplified Configuration:
   - Next.js abstracts away much of the server setup and configuration, making it easier to get started with both frontend and backend development.

## Features

### 1. View Articles

- Upon visiting the application, users can view a list of articles along with their respective points (votes).

### 2. Add a New Article

- Users can add a new article by providing a name and a valid URL link.

### 3. Vote for Articles

- Users can upvote or downvote articles, influencing their ranking.


### Prerequisites

- Node.js installed
- MongoDB database (update the `MONGODB_URI` in the API route)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/adarshdhital007/article-ranker.git
   ```

2. **Install the dependencies:**

   ```bash
   cd article-ranker
   npm install
   ```

3. **Create a `.env` file and add the following configuration variables:**

   ```bash
   MONGODB_URI=YOUR_URI
   ```

### Usage

1. Start the Next.js development server.

2. Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to use the application.

## API Routes

### GET `/api/articles`

- Fetches and returns a list of articles.

### POST `/api/articles`

- Adds a new article to the database.

### PUT `/api/articles`

- Updates the vote count for a specific article.

## Technologies Used

- Next.js
- React
- MongoDB
- Node.js

## Contributors

- Adarsh Dhital Khatri

## License

This project is licensed under the [MIT License](LICENSE).
