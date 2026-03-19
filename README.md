
---

# I.N.S.P.I.R.E. Bus Poll System

## Project Overview
The **I.N.S.P.I.R.E. Bus Poll System** is a web-based application that allows users to participate in a time-based poll to determine the most convenient bus departure time. Users can select their preferred departure time from the available options, and once they submit their choice, they receive a token (or ticket). The token includes the date and time of submission as well as the chosen departure time, and users are required to carry a screenshot of the token for verification.

### Key Features:
- Poll system with various bus departure time options.
- Time-limited polls for user participation.
- Token generation upon submission with details of choice and timestamp.
- Simple and intuitive interface for ease of use.

---

## Getting Started

### Prerequisites:
Before running the project locally, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14.x or higher)
- [Git](https://git-scm.com/)

### Installation:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/INSPIRE-Bus-Poll.git
   cd INSPIRE-Bus-Poll
   ```

2. **Install dependencies**:  
   Navigate to the project directory and install the required Node.js packages:
   ```bash
   npm install
   ```

3. **Create your enviornment variables**:
   
   Required environment variables:
      - `MONGO_URL`: Connection string to establish connection to the MongoDB server.
      - `JWT_KEY`: A secure key for jsonwebtoken. Can be created by running `openssl rand -base64 32` in the terminal.
  
   Create a `.env` file and store the values of the above mentioned environment variables.


4. **Run the project locally**:  
   Start the development server:
   ```bash
   npm start
   ```

5. **Access the application**:  
   Open your browser and visit:
   ```
   http://localhost:3000
   ```

---

## Usage Instructions

1. **Access the Poll**:  
   Once the application is running, users will see a list of time options for bus departure.

2. **Select a Time**:  
   Choose your preferred departure time from the available options.

3. **Submit Your Choice**:  
   After selecting a time, click the "Submit" button. You will receive a token that includes:
   - The date and time of your submission.
   - The bus departure time you selected.

4. **Save Your Token**:  
   Take a screenshot of your token, as it will be required to verify your choice at the bus station.

---

## REST API Endpoints

Yes, this project exposes **14 REST API endpoints** built with Next.js App Router route handlers.

### Authentication

| # | Method | Endpoint | Description |
|---|--------|----------|-------------|
| 1 | `POST` | `/api/login` | Authenticate a user with email and password; returns a JWT in an HttpOnly cookie |
| 2 | `POST` | `/api/logout` | Clear the authentication cookie and log the user out |
| 3 | `POST` | `/api/signup` | Register a new user account |
| 4 | `GET` | `/api/verify-auth` | Verify the current user's authentication token |

### Polls

| # | Method | Endpoint | Description |
|---|--------|----------|-------------|
| 5 | `GET` | `/api/polls` | Retrieve all polls |
| 6 | `POST` | `/api/polls` | Create a new poll |
| 7 | `DELETE` | `/api/polls/[id]` | Delete a poll by ID |
| 8 | `PATCH` | `/api/polls/[id]` | Update the status of a poll by ID |
| 9 | `PUT` | `/api/polls/[id]` | Cast a vote in a poll by ID |

### Projects

| # | Method | Endpoint | Description |
|---|--------|----------|-------------|
| 10 | `GET` | `/api/projects` | Retrieve all projects |
| 11 | `POST` | `/api/projects` | Create a new project |
| 12 | `PATCH` | `/api/projects/[id]/edit` | Edit an existing project by ID |

### Demo Data

| # | Method | Endpoint | Description |
|---|--------|----------|-------------|
| 13 | `GET` | `/api/seed-demo` | Get demo seeding information and sample credentials |
| 14 | `POST` | `/api/seed-demo` | Seed the database with demo data |

---

## Contributing Guidelines

We welcome contributions from the community! Here’s how you can get involved:

Checkout [Guideline](https://github.com/sandeshlavshetty/I.N.S.P.I.R.E/discussions/41)


### Coding Standards:
- Follow [JavaScript Standard Style](https://standardjs.com/).
- Keep code modular and reusable.
- Write meaningful commit messages.

---

## License

This project is licensed under the [MIT License](LICENSE). You’re free to use, modify, and distribute this project under the terms of this license.

---

