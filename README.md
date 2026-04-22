# Acxiom Consulting Project Assignment - Event Management System

![Acxiom Consulting Logo](./frontend/public/logo.png)

## Overview
This Event Management System is a full-stack application developed as part of the Acxiom Consulting project assignment. It provides a robust platform for Users, Vendors, and Admins to interact seamlessly, managing everything from product listings to event guest lists and real-time order tracking.

---

## 🚀 Technology Stack

### Frontend
- **Framework:** React.js (Vite)
- **Styling:** Vanilla CSS (Modern, High-Contrast Design)
- **Animations:** Framer Motion
- **Routing:** React Router DOM

### Backend
- **Environment:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (via Mongoose)
- **Authentication:** Session-based (express-session)
- **File Storage:** Local storage for product images

---

## 📊 System Working Flow

The application strictly follows a hierarchical flow as defined in the project specifications:

### 1. User Portal
- **Vendor Selection:** Browse vendors by category (Catering, Florist, etc.) and shop for items.
- **Cart Management:** Add items, update quantities, and view a detailed total amount.
- **Checkout & Payment:** Integrated payment details with a "Total Amount" summary and "Cancel" capability.
- **Guest List:** Full CRUD management (Add, View, Update, Delete) for event guests.
- **Order Status:** Real-time tracking with status indicators (Recieved, Ready for Shipping, Out For Delivery).

### 2. Vendor Portal
- **Your Item:** Dedicated module for **Insert** and **Delete** operations on products.
- **Add New Item Menu:** 
  - **Product Status:** Manage active orders.
  - **Request Item:** Submit special item requests to the Admin.
  - **View Product:** Catalog overview.
- **Transactions:** Manage and view **User Requests**.

### 3. Admin Portal (Maintenance Menu)
- **Maintenance Module:** (Admin access only) Core engine for managing the platform.
- **Membership Management:**
  - **Add Membership:** Mandatory duration selection (6 months, 1 year, 2 years).
  - **Update Membership:** Extend durations or cancel vendor memberships.
- **User/Vendor Management:** Control and validate platform participants.

---

## 🛠️ Key Features
- **Real-time Status Updates:** Polling mechanism for instant delivery tracking.
- **Membership Validation:** Automated duration logic for vendors.
- **Secure Authentication:** Hidden password inputs and role-protected routes.
- **High-Contrast UI:** Premium Blue-and-White theme for maximum readability and professional aesthetics.

---

## 📂 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/vijaychandra1910/AcxiomConsulting-Project.git
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   npm install
   # Create .env with MONGODB_URI and PORT
   npm start
   ```

3. **Frontend Setup:**
   ```bash
   cd frontend
   npm install
   # Create .env with VITE_API_URL
   npm run dev
   ```

---
*Developed for Acxiom Consulting Assignment*