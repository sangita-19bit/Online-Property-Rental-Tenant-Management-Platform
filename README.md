# Online Property Rental Tenant Management Platform

A full-stack web application designed to streamline the property rental and tenant management process. It features a robust backend built with Spring Boot and a dynamic, responsive frontend using Next.js.

## System Overview

The platform provides features to:
* Manage properties, units, and leases.
* Facilitate rent payments and track rent history.
* Track maintenance requests.
* Provide authentication and personalized dashboards for tenants and admins.

## Architecture

This project is organized into two main parts:

### 1. Backend (`/backend`)
* **Technology**: Java, Spring Boot, Spring Security
* **Responsibility**: Exposes RESTful APIs, handles business logic, database transactions, and user authentication.
* **Database**: MongoDB (via Spring Data MongoDB).

### 2. Frontend (`/frontend`)
* **Technology**: Next.js, React, JavaScript, Tailwind CSS
* **Responsibility**: Provides the user interface for administrators and tenants, consumes the backend APIs.

## Prerequisites

* **Java**: JDK 17 or higher
* **Node.js**: Node 18 or higher
* **Database**: MongoDB instance

## Getting Started

### Setting up the Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Build the Spring Boot application using Maven:
   ```bash
   mvn clean install
   ```
3. Run the application:
   ```bash
   mvn spring-boot:run
   ```
   *The backend will typically start on `http://localhost:8080`.*

### Setting up the Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install the Node package dependencies:
   ```bash
   npm install
   ```
3. Start the Next.js development server:
   ```bash
   npm run dev
   ```
   *The frontend will typically start on `http://localhost:3000`.*

## License

This project is proprietary and intended for demonstration purposes.
