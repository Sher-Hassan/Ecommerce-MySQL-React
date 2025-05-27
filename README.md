# GIZMO FASHION E-Commerce Platform

## Overview
GIZMO FASHION is a user-centric e-commerce platform specializing in clothing, accessories, and footwear. Designed with scalability, performance, and intuitive navigation in mind, this project demonstrates the effective integration of modern web technologies with robust database management.

## Features
- **User-Friendly Interface:** Intuitive navigation and advanced filtering options.
- **Product Catalog:** Browse products with detailed views and high-quality images.
- **Cart Management:** Add, update, and clear cart items, with seamless database integration.
- **Secure Authentication:** User and admin roles with distinct functionalities.
- **Admin Panel:** Manage products, categories, and track user activities.

## Tech Stack
- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Additional Tools:** Axios, CORS, JWT Authentication, Google OAuth

## System Architecture
The platform is designed using the MVC (Model-View-Controller) architectural pattern:
- **Model:** Handles data and database operations with MySQL.
- **View:** Implements a responsive user interface with React.js.
- **Controller:** Manages business logic and API endpoints using Node.js and Express.js.

## Database Schema
The project adheres to 3NF (Third Normal Form) for optimized data storage and relationships:
- **Users:** User credentials and registration details.
- **Admin:** Admin role and privileges.
- **Categories:** Product categories with descriptions.
- **Products:** Details including price, stock, and category linkage.
- **Cart:** Tracks user-selected products, sizes, quantities, and prices.

## Key Functionalities
### User Registration and Login
- Secure authentication for users and admins.
- Google OAuth integration.

### Product Management
- CRUD operations for admins.
- Advanced product filtering (by category, size, price range).

### Cart Management
- Persistent cart stored in the database.
- Ability to add, remove, and clear cart items.

### Admin Panel
- Manage categories and inventory.
- Monitor sales and user activity.

## How to Run
### Clone the Repository:
```bash
git clone https://github.com/your-username/gizmo-fashion.git
cd gizmo-fashion
```

### Set Up Backend:
1. Navigate to the `/api` folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and configure the database credentials:
   ```ini
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=ecommerce
   JWT_SECRET=your_jwt_secret
   ```
4. Start the server:
   ```bash
   npm start
   ```

### Set Up Frontend:
1. Navigate to the `/api` and `/client` folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

## Future Enhancements
- **Payment Integration:** Add payment gateways for transactions.
- **Mobile App:** Develop native iOS and Android applications.
- **AI-Driven Recommendations:** Personalize user experience with machine learning.
- **Real-Time Notifications:** Email and SMS updates for order status.


## Contributors
- **Sher Hassan**
- **Haider Jangir**
