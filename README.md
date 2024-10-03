

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

## Contributing Guidelines

We welcome contributions from the community! Here’s how you can get involved:

1. **Star the repository**:  
   If you find this project useful, please consider starring the repository to show your support and help others discover it!

2. **Fork the repository**:  
   Create a personal copy of the project by clicking the "Fork" button.

3. **Clone the forked repository**:
   ```bash
   git clone https://github.com/your-username/INSPIRE-Bus-Poll.git
   cd INSPIRE-Bus-Poll
   ```

4. **Create a new branch**:  
   Use a descriptive name for your branch.
   ```bash
   git checkout -b feature-name
   ```

5. **Make your changes**:  
   Follow our coding standards and ensure your code is well-documented.

6. **Submit a Pull Request**:  
   Push your changes to your forked repository and open a Pull Request (PR) to the main repository with a detailed description of your changes.

7. **Report Issues**:  
   If you encounter any bugs or have suggestions for improvements, please open an issue [here](https://github.com/your-username/INSPIRE-Bus-Poll/issues).

### Coding Standards:
- Follow [JavaScript Standard Style](https://standardjs.com/).
- Keep code modular and reusable.
- Write meaningful commit messages.

---

## License

This project is licensed under the [MIT License](LICENSE). You’re free to use, modify, and distribute this project under the terms of this license.
