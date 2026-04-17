# QMA Frontend

A modern frontend application for QMA (Quality Management App).

## Overview

This is the frontend interface for the QMA system, providing a user-friendly dashboard for quality management operations.

## Deployment

**Live URL:** [http://3.26.17.95:8080/](http://3.26.17.95:8080/)

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

## Project Structure

```
QMA/
├── eslint.config.js
├── index.html
├── package.json
├── README.md
├── vite.config.js
├── public/
└── src/
    ├── App.css
    ├── App.jsx
    ├── index.css
    ├── main.jsx
    ├── components/
    │   ├── CategorySelector.jsx
    │   ├── Footer.jsx
    │   ├── HistoryPanel.jsx
    │   ├── Home.jsx
    │   ├── Login.jsx
    │   ├── Navbar.jsx
    │   ├── OperationSelector.jsx
    │   ├── OperationsPage.jsx
    │   ├── Profile.jsx
    │   ├── ScrollToTop.jsx
    │   ├── Signup.jsx
    │   └── ToastContainer.jsx
    └── store/
        ├── authSlice.js
        ├── modalSlice.js
        ├── quantitySlice.js
        ├── store.js
        └── toastSlice.js
```


## Features

- Responsive user interface
- Real-time quality management dashboard
- Data visualization and reporting
- User authentication

## Technologies

- React
- Tailwind CSS
- Axios for API calls

