# MoviesAPI

## Overview

This project is a backend application for a film-related service, developed using the NestJS framework. It provides a structured and scalable architecture for handling various features related to films, users, and playlists. The project leverages modern web technologies and design patterns to ensure high performance, security, and maintainability.

## Features

### Authentication and Authorization

- **JWT Authentication**: Secure authentication using JSON Web Tokens (JWT).
- **Role-Based Access Control**: Different user roles with specific permissions.
- **Guards**: Custom guards for protecting routes based on roles and ownership.

### User Management

- **User Registration and Login**: Users can register and log in to the system.
- **User Profile Management**: Users can update their profile information.

### Film Management

- **CRUD Operations for Films**: Create, read, update, and delete film records.
- **Genres**: Manage film genres, including creation, updating, and listing genres.
- **Directors**: Manage director information associated with films.

### Playlists

- **Create and Manage Playlists**: Users can create playlists of films.
- **Add/Remove Films in Playlists**: Add films to or remove films from playlists.

### Reporting

- **Generate Reports**: Generate various reports related to films and user activities.

### Email Notifications

- **Email Sending**: Send email notifications using predefined templates and configurations.

## Technologies Used

### Backend Framework

- **NestJS**: A progressive Node.js framework for building efficient and scalable server-side applications.

### Programming Language

- **TypeScript**: A statically typed superset of JavaScript that enhances code quality and maintainability.

### Database

- **Mongoose**: An Object Data Modeling (ODM) library for MongoDB and Node.js, providing a straightforward, schema-based solution to model application data.

### Authentication

- **PassportJS**: Middleware for handling authentication.
- **JWT**: JSON Web Tokens for secure authentication.

### Email

- **Nodemailer**: A module for sending emails from Node.js applications.

### Testing

- **Jest**: A delightful JavaScript testing framework with a focus on simplicity.

### Other Tools

- **ESLint**: A tool for identifying and reporting on patterns in JavaScript/TypeScript.
- **Prettier**: An opinionated code formatter.
