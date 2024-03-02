# To-Do List Application

The To-Do List application is a simple yet powerful tool designed to help users organize their tasks efficiently. With features including user authentication, task management, and data persistence, this application provides a seamless experience for users to manage their daily tasks effortlessly.

## Key Features:

- **User Authentication:** Users can create an account, log in securely, and log out when necessary. Authentication tokens are securely stored to ensure a smooth and secure user experience.

- **Task Management:** Users can easily add, edit, delete, and mark tasks as completed. The application provides a user-friendly interface for managing tasks effectively.

- **Data Persistence:** All user data, including tasks and user information, is securely stored in a database. This ensures that users can access their tasks from anywhere and on any device.

## How to Use:

1. **Registration:** New users can create an account by providing their email address and a secure password.

2. **Login:** Registered users can log in securely using their email address and password.

3. **Task Management:** Once logged in, users can add new tasks, edit existing ones, mark tasks as completed, and delete tasks as needed.

4. **Logout:** Users can securely log out of their accounts to protect their privacy and ensure data security.

## Technologies Used:

- **Frontend:** Vue.js, HTML, CSS
- **Backend:** Laravel (PHP)
- **Database:** MySQL
- **Authentication:** JWT (JSON Web Tokens)

## Installation

### Backend (Laravel)

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd <project-directory>/backend`
3. Install dependencies: `composer install`
4. Create a copy of the `.env.example` file and rename it to `.env`
5. Generate application key: `php artisan key:generate`
6. Set up your database connection in the `.env` file
7. Run migrations: `php artisan migrate`
8. Start the development server: `php artisan serve`

### Frontend (Vue.js)

1. Navigate to the project directory: `cd <project-directory>/frontend`
2. Install dependencies: `npm install`
3. Start the development server: `npm run serve`

## Usage

### Backend (Laravel)

- Access the API endpoints at: `http://localhost:8000/api/`

### Frontend (Vue.js)

- Access the Vue.js application at: `http://localhost:8080/`

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the [MIT License](LICENSE).
