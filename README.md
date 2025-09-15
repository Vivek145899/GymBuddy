# 💪 GymBuddy - Fitness Tracker

A modern, responsive fitness tracking application built with React, featuring user authentication, activity tracking, progress visualization, and goal setting.

## ✨ Features

- **🔐 User Authentication**: Secure login and registration with localStorage
- **📊 Activity Tracking**: Log workouts, cardio, strength training, yoga, etc.
- **📈 Progress Visualization**: Interactive charts using Chart.js
- **🎯 Goal Setting**: Set and track fitness milestones
- **🌙 Dark/Light Theme**: Beautiful teal-themed UI with theme switching
- **📱 Responsive Design**: Works perfectly on all devices
- **💾 Data Persistence**: All data saved in localStorage
- **🎨 Modern UI**: Clean, modern design with glassmorphism effects

## 🚀 Getting Started

### Prerequisites

- Node.js (>= 16.0.0)
- npm (>= 8.0.0)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd gymbuddy
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm run security:audit` - Run security audit
- `npm run security:fix` - Fix security vulnerabilities

## 🔒 Security Features

- **Password Hashing**: Simple hash function for password storage
- **Input Sanitization**: All user inputs are sanitized
- **Rate Limiting**: Login attempt limiting (5 attempts max)
- **Error Boundaries**: Graceful error handling
- **Input Validation**: Comprehensive form validation
- **XSS Protection**: HTML tag removal from inputs

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── ActivityForm.jsx
│   ├── ActivityList.jsx
│   ├── Dashboard.jsx
│   ├── ErrorBoundary.jsx
│   ├── Footer.jsx
│   ├── LandingPage.jsx
│   ├── Login.jsx
│   ├── MotivationalQuote.jsx
│   ├── Navbar.jsx
│   ├── ProgressChart.jsx
│   ├── Register.jsx
│   ├── StatsCards.jsx
│   └── ThemeToggle.jsx
├── contexts/           # React contexts
│   └── ThemeContext.jsx
├── styles/             # Global styles
│   └── GlobalStyles.js
├── utils/              # Utility functions
│   └── helpers.js
├── App.jsx             # Main app component
└── main.jsx            # App entry point
```

## 🎨 Theme System

The application uses a beautiful teal/cyan color scheme with:

- **Light Mode**: Teal blue (#17a2b8) primary, light sea green (#20b2aa) secondary
- **Dark Mode**: Light sea green (#20b2aa) primary, dark turquoise (#00ced1) secondary
- **CSS Custom Properties**: Dynamic theming with CSS variables
- **Smooth Transitions**: All theme changes are animated

## 📊 Data Management

- **localStorage**: All user data persists across sessions
- **User Isolation**: Each user's data is properly isolated
- **Data Validation**: All stored data is validated before saving
- **Error Handling**: Graceful handling of storage errors

## 🔧 Performance Optimizations

- **React.memo**: Prevents unnecessary re-renders
- **useCallback**: Optimizes function references
- **useMemo**: Memoizes expensive calculations
- **Code Splitting**: Lazy loading of components
- **Debouncing**: Optimized input handling

## 🧪 Testing

```bash
# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Security audit
npm run security:audit
```

## 🚀 Deployment

1. Build the project:
```bash
npm run build
```

2. The `dist` folder contains the production build ready for deployment.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Vivek Kumar Yadav**
- Created with ❤️ for fitness enthusiasts

## 🔮 Future Enhancements

- [ ] Backend integration with proper authentication
- [ ] Social features and sharing
- [ ] Advanced analytics and insights
- [ ] Workout templates and plans
- [ ] Nutrition tracking
- [ ] Mobile app development
- [ ] Offline support with service workers

---

**Note**: This is a frontend-only application using localStorage for data persistence. For production use, consider implementing a proper backend with database storage and enhanced security measures.
