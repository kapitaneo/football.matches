# Football Matches - Native Stats

Welcome to the Football Matches Native Stats project! This project provides a web interface to view recent and upcoming football matches from popular leagues.

## Table of Contents
- [Project Overview](#project-overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Project](#running-the-project)
- [Additional Information](#additional-information)

## Project Overview
The Football Matches Native Stats is a web application that allows users to track recent and upcoming football matches. The application is built using **Node.js**, **Express**, and **EJS** for server-side rendering, while also utilizing **Football Data API** to provide real-time match data.

## Prerequisites
Before setting up and running the project, ensure you have the following dependencies installed:
- **Node.js** (v18 or higher)
- **npm** (Node Package Manager)

## Installation
1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/football-matches.git
   cd football-matches
   ```

2. **Install Dependencies**
   In the project root directory, install the required npm packages:
   ```bash
   npm install
   ```

## Configuration
1. **Environment Variables**
   - Create a `.env` file in the root of your project.
   - Add your Football Data API key to the `.env` file as follows:
     ```
     FOOTBALL_DATA_API_KEY=your_api_key_here
     ```

2. **Project Structure**
   The main components of the project are:
   - `src/server.mjs`: The main server file.
   - `public/`: Contains static files, such as CSS and JavaScript.
   - `views/`: Contains the EJS templates for rendering the HTML.

## Running the Project
1. **Start the Server**
   - To run the server locally, use the following command:
     ```bash
     npm run start
     ```
   - The server will start running on [http://localhost:3000](http://localhost:3000).

2. **Access the Application**
   - Open your browser and navigate to `http://localhost:3000` to use the Football Matches Native Stats application.

## Additional Information
- **Dependencies**
  - `express`: Web framework for Node.js.
  - `ejs`: Template engine for rendering HTML pages.
  - `node-fetch`: Used for making API requests to the Football Data API.
  - `dotenv`: Used for managing environment variables.

- **Scripts**
  - `npm run start`: Starts the server using the script defined in `package.json`.

- **Notes**
  - Ensure your Football Data API key is active and has enough quota to handle the requests.
  - Make sure that the `.env` file is not committed to your version control system, as it contains sensitive information.