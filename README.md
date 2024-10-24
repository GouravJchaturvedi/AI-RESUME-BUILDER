# AI Resume Builder

The **AI Resume Builder** is a web application designed to help users create and manage their resumes effortlessly. Built using **React** and **Vite**, this project provides a modern, fast, and efficient environment for developing web applications.

## Features

- **User Authentication**: Secure login and registration using Clerk.
- **Resume Creation**: Intuitive UI for users to input and edit their resume details.
- **Preview & Download**: Users can preview their resumes and download them in a printable format.
- **Share Functionality**: Easy sharing of resumes via a shareable link.
- **Responsive Design**: Fully responsive layout for a seamless experience across devices.

## Technologies Used

- **Frontend**: React, Vite
- **Styling**: Tailwind CSS
- **State Management**: Context API
- **API Integration**: Axios for making API calls to a backend server
- **Authentication**: Clerk for user management
- **Rich Text Editor**: For formatting job descriptions and other text fields

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/GouravJchaturvedi/AI-RESUME-BUILDER.git
Navigate to the project directory:

bash
Copy code
cd AI-RESUME-BUILDER
Install the dependencies:

bash
Copy code
npm install
or

bash
Copy code
yarn install
Set up environment variables:

Create a .env file in the root directory and add the following:

plaintext
Copy code
VITE_STRAPI_API_KEY=your_api_key
VITE_BASE_URL=http://localhost:3000
Running the Application
To start the development server, run:

bash
Copy code
npm run dev
or

bash
Copy code
yarn dev
Open your browser and navigate to http://localhost:5173 to view the application.

Building for Production
To build the application for production, use the following command:

bash
Copy code
npm run build
or

bash
Copy code
yarn build
This will create a dist folder containing the production-ready files.

Plugins
This project uses Vite with the following plugins for enhanced functionality:

React Plugin:
@vitejs/plugin-react - This plugin uses Babel for Fast Refresh.
@vitejs/plugin-react-swc - An alternative that uses SWC for Fast Refresh, providing improved performance.
Contributing
Contributions are welcome! If you have suggestions for improvements or features, please create an issue or submit a pull request.

License
This project is licensed under the MIT License. See the LICENSE file for details.

Acknowledgements
Vite for providing a fast development environment.
React for building user interfaces.
Clerk for user authentication.
Tailwind CSS for utility-first CSS styling.