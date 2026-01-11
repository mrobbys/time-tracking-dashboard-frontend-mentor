# Frontend Mentor - Time Tracking Dashboard Solution

This is a solution to the [Time tracking dashboard challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/time-tracking-dashboard-UIQ7167Jw). This project focuses on building a dynamic dashboard that fetches data from a local JSON file and allows users to switch between different timeframes seamlessly.

![Design Preview](./preview.jpg)

## Tech Stack

- **HTML5**
- **Tailwind CSS**
- **Vanilla JavaScript**
- **JSON**

## Project Overview

In this project, I built a dashboard that visualizes Jeremy Robson's activity data. The primary focus was on managing the application state and dynamically updating the user interface without page reloads.

### Key Features & Learnings

- **Asynchronous Data Handling**:
    - Used `async/await` functions to fetch data from `data.json`.
    - Implemented `try...catch` blocks to handle potential errors during data fetching.
- **Dynamic DOM Manipulation**:
    - Used the `.map()` method to dynamically generate activity cards based on the JSON data (Work, Play, Study, etc.).
    - Utilized `insertAdjacentHTML` to inject new cards into the `content-wrapper` while preserving the main profile card.
- **Event Delegation & State Management**:
    - Attached a single event listener to the action buttons container (`.action-buttons`) to handle timeframe switching (Daily, Weekly, Monthly).
    - Used HTML `data-timeframe` attributes to identify and manage the currently active state.
- **Responsive Layout**:
    - Leveraged Tailwind's Grid system to adapt from a single-column mobile stack to a four-column desktop grid.
    - Implemented `row-span-2` on the profile card to ensure it aligns perfectly with the two rows of activity cards on desktop.
