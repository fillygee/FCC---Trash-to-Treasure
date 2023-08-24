
# Florin County Council - Trash to Treasure

Trash to Treasure is a web app devised by the Florin County Chillers to assist the county council in addressing their issues with recycling reusable items.

Trash to Treasure enables Florin County citizens to make posts and share items they are willing to give away for reuse which saves them going to waste at the recycling centre. Users can also comment on posts and contact the item owners to arrange item pick up or delivery. 

## Installation & Usage

To run the application locally, follow these steps:

1. Clone the repository: `git clone https://github.com/fillygee/FCC---Trash-to-Treasure.git`
2. Navigate to the project directory: `cd FCC---Trash-to-Treasure/trashtotreasure`
3. Install the dependencies: `npm install`
4. Set up and populate the database: `npm run setup_db`
5. Start the development server: `npm run start`
6. Open your web browser and go to http://localhost:3000 to access the application.

Or just visit https://trashtotreasure.onrender.com/


## Tech Stack

Trash to Treasure is built using the following technologies:

**Frontend:** HTML, CSS/Bootstrap, Javascript

**Backend:** Node.js, Express.js , PostgresSQL


## Process

- Project Planning: Reading the project brief and discussing ideas.

-  UI/UX Design: Created hi-fi wireframes with Figma to visualize the application's layout and user interface.

- Backend Development: Implemented the server using Node.js and Express.js to handle user requests and interact with the APIs. Created databases using PostSQL to hold post, user and comment data.

- Frontend Development: Developed the user interface using HTML, CSS and Javascript and integrated with the backend APIs.

- Testing: Performed unit testing  to identify and fix issues.

- Deployment: Deployed the application to a web server (Render).
  

## Features

### 1. Item Listings

Easily create and browse posts for items you want to give away. Users can provide detailed descriptions and upload images of the items. Each item listing displays relevant information, making it simple for others to find items they're interested in.

### 2. Comment

Trash to Treasure encourages interaction among users through the comment system. Users can leave comments on item listings to ask questions, express interest, or share their thoughts.

### 3. Contact and Arrangement
   
When users find an item they want, they can easily reach out to the item owner by clicking the "Contact Owner" button. Whether it's arranging a pickup time or discussing delivery options, the platform makes communication convenient and efficient. This feature ensures that item exchanges are smooth and hassle-free.

### 4. Secure Authentication
   
Trash to Treasure prioritizes user security. Our robust login and registration system ensures that only legitimate users have access to the platform. Your information is protected, and you can confidently engage with others in the community.

### 5. Mobile Responsive 

Access Trash to Treasure from various devices, including smartphones and tablets. The web app is designed to provide a seamless experience, regardless of the device you're using, so you can engage with the platform anytime, anywhere.


## Wins and Challenges


### Wins
- Successfully implemented a user-friendly and visually appealing interface.
- Integrated authentication features like cookies and tokens
- Achieved responsiveness to provide an optimal user experience on different devices.


### Challenges
- Adding comments, individual page functionality, authentication
- Working with modals
