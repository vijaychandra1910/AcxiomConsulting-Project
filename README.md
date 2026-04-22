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

## 💡 Detailed Functionalities

### 1. Authentication & Role Security
- **Multi-Role Support:** Distinct dashboards for Admin, Vendor, and User roles.
- **Session Persistence:** Users remain logged in securely throughout their session using `express-session`.
- **Security Standards:** Password inputs are masked (`type="password"`) on all login and registration screens.

### 2. User Experience (The "Customer" Flow)
- **Smart Shopping:** Users can filter vendors by specialty (e.g., Florist, Catering) and view high-quality item catalogs with real pricing.
- **Cart Logic:** A dynamic shopping cart that calculates individual item totals and a grand total in real-time.
- **Guest Management:** A dedicated "Guest List" tool allowing users to track their event attendees with private Update/Delete controls.
- **Check Status:** A simplified, read-only tracking table where users see their order's journey from "Received" to "Out for Delivery".

### 3. Vendor Operations (The "Business" Flow)
- **Catalog Control:** Vendors have full CRUD power over their product list, including image uploads and price management.
- **Status Console:** A powerful modal-driven interface allowing vendors to update order states. These changes propagate instantly to the user's view.
- **Transaction History:** Vendors can monitor all incoming requests and user interactions in a unified module.

### 4. Admin Oversight (The "Maintenance" Flow)
- **Membership Engine:** A strict logic-driven system for managing vendor subscriptions. Supports adding memberships (default 6 months) and extending them (default 6-month extension).
- **System Maintenance:** Exclusive access to the Maintenance Menu, which is the mandatory foundation for creating system-wide reports and transactions.
- **User/Vendor Management:** A centralized console for onboarding or managing all platform participants.

---

## 🛠️ Key Technical Features
- **Real-time Data Polling:** Automated 5-second refreshes on status pages for "live" tracking without page reloads.
- **High-Contrast Design:** A premium Blue-on-White aesthetic designed for professional clarity and modern appeal.
- **Backend Validations:** Every form submission is validated both on the client (required fields) and server (Mongoose schemas).

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