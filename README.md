# 🚘 Rideridar Frontend

**Rideridar** is a private, luxury ride-booking app for senior executives in Singapore.  
This repository contains the **React-based frontend** of the application.

---

## 📌 Project Overview

Rideridar allows clients to:

- Submit ride booking requests via an online form (no login required)
- Receive booking confirmation messages
- Communicate with admins via WhatsApp/discord after submission

Admins:

- Get notified of bookings via Discord
- Confirm booking details with clients
- Assign drivers via a dashboard (planned)

---

## 📌 Screenshots

Landing Page:
![Landing Page image](../rideridar-frontend/src/assets/images/Screenshots/Screenshot%202025-07-17%20at%208.21.33%20PM.png)

Car Selection Page:
![Car Selection image](../rideridar-frontend/src/assets/images/Screenshots/Screenshot%202025-07-17%20at%208.22.31%20PM.png)

Booking Form:
![Booking Form image](../rideridar-frontend/src/assets/images/Screenshots/Screenshot%202025-07-17%20at%208.24.59%20PM.png)

Confirmation Page:
![Confirmation Page image](../rideridar-frontend/src/assets/images/Screenshots/Screenshot%202025-07-17%20at%208.25.44%20PM.png)

---

## Tech Stack

Frontend: React, Chakra UI

Backend: Node.js, Express

Database: MongoDB (Mongoose)

APIs: OneMap for address auto-suggestions

---

## Getting started:

```bash

# Clone the repository
git clone https://github.com/Josephdeepu1982/rideridar-frontend.git
cd rideridar-frontend

# Install dependencies
npm install

# Set up your environment
# Create a .env file at the root of the project and add:
DATABASE_URL = link_to_mongodb
SECRET = your_key_here

# Start the development server
npm start

```

Use http://localhost:3000 to test the server response.

---

## Next Steps

- Incorporate flight Api for flight data retrieval
- Telegram/Discord bot integration
- Booking status page and role assignment by admins
- Payment gateway for customer to complete upon booking

---

## Refrences & Credits

- Png images from Pixabay.com
- www.onemap.gov.sg/apidocs
- Hosted DB: [MongoDB](https://cloud.mongodb.com/)

Designed and developed by **Vinny Valeria and Deepu Joseph**

---

## Presentation Materials

Link to slides: https://docs.google.com/presentation/d/1qTJx_fJKscW8RMCBjVIQO3zogr1L4iHekHaT_XjQi1U/edit?usp=sharing

---

## 📚 License

This project is for personal and educational use. All assets and source code are owned by the developer unless otherwise stated.
