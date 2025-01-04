# Trump Tweet Guesser

Welcome to **Trump Tweet Guesser**, an interactive web app where users can test their ability to identify whether a tweet was authored by former President Donald Trump or someone else. 

This codebase is the original version that was used from October-December 2024 before we (the developers) changed the architecture and started using a different repository. 

## 🚀 Live Website

**[trumptweetguesser.com](https://trumptweetguesser.com)**  
Click the link to play the game!

## 🖥️ Tech Stack

The project was built using:

- **Frontend:** React (deployed as a static site on Azure with HTTPS)
- **Backend:** Django (hosted on an Azure VM) serving APIs for tweet data. The VM used Django, Gunicorn, and WSGI. 
- **Database:** SQLite for tweet storage and management
- **Deployment Tools:** GitHub, and Azure Virtual Machines

## 🛠️ Features

- **Interactive Gameplay:** Guess whether a tweet is real or fake.
- **Responsive Design:** Optimized for both desktop and mobile devices.
- **Dynamic Content:** Tweets were fetched from the backend API in real-time.
- **Search Engine Optimization (SEO):** Custom metadata for better visibility.

## 🔒 Security

- The backend server was protected using an Azure Network Security Group (NSG), ensuring access is restricted to requests originating from the static frontend (along with CORS headers).
- HTTPS is enabled on the frontend to secure user interactions.

## 📂 Repository Structure

- **/frontend:** React app source code
- **/backend:** Django app source code, including APIs for tweet management
- **/static:** Static assets like images and CSS
- **/scripts:** Deployment and utility scripts

## 🧑‍💻 Authors

- **[Connor](https://github.com/Connor-H-Bot)** - Creator 
- **[Pablo](https://github.com/ThespDev)** - Creator 
