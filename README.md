# 💕 Saranie & Lorvens Wedding Website

A beautiful, interactive wedding website featuring a menu display and digital guest book for Saranie & Lorvens' special day on July 11th, 2025.

## ✨ Features

### 🏠 Main Page

- Elegant welcome interface with the couple's names and wedding date
- Two main options: Wedding Menu and Guest Book
- Beautiful gradient backgrounds and animations
- Responsive design for all devices

### 🍽️ Wedding Menu

- Displays the complete wedding menu organized by categories:
  - **Apéritif**: Selection of delightful starters
  - **Main Courses**: Including Riz noir, Riz Jaune, Dinde, Poulet, Saumon, Gratiné de Macaroni, Gratiné de Pomme de terre, Lasagne, and Salade Russe
  - **Dessert**: Gâteau de Vanille (Vanilla cake)
- Clean, organized layout with hover effects

### 📝 Digital Guest Book

- Interactive guest cards for 61 wedding guests
- Search functionality to quickly find specific guests
- Message saving with both local storage and Google Sheets integration
- Real-time status updates for message saving
- Edit functionality for previously saved messages
- Visual indicators for guests who have already left messages

## 🛠️ Technical Stack

- **Frontend**: Pure HTML5, CSS3, and JavaScript
- **Styling**: Custom CSS with gradients, animations, and responsive design
- **Data Storage**: Google Sheets integration via Google Apps Script
- **Guest Data**: JavaScript array with predefined guest names

## 📁 Project Structure

```
saranie/
├── index.html          # Main HTML file with all page content
├── css/
│   └── styles.css      # All styling and responsive design
├── data/
│   └── guests.js       # Guest names array
└── js/
    └── script.js       # Main functionality and Google Sheets integration
```

## 🚀 Setup Instructions

### Prerequisites

- A web browser (Chrome, Firefox, Safari, Edge)
- Optional: A web server for local development

### Basic Setup

1. Clone or download the project files
2. Open `index.html` in a web browser
3. The website will work locally with all features except Google Sheets saving

### Google Sheets Integration Setup (Optional)

To enable message saving to Google Sheets:

1. **Create a Google Sheet**:

   - Create a new Google Sheet
   - Add headers: `Timestamp`, `Guest Name`, `Message`

2. **Set up Google Apps Script**:

   - Go to [Google Apps Script](https://script.google.com)
   - Create a new project
   - Replace the default code with a script to handle form submissions
   - Deploy as a web app with permissions for anyone to access

3. **Update the Configuration**:
   - In `js/script.js`, replace the `GOOGLE_SHEETS_URL` variable with your deployed script URL:
   ```javascript
   const GOOGLE_SHEETS_URL = "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE";
   ```

### Local Development

For local development with a web server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (with http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## 🎨 Customization

### Adding/Removing Guests

Edit the `guestNames` array in `data/guests.js`:

```javascript
const guestNames = [
  "Guest Name 1",
  "Guest Name 2",
  // Add more names here
];
```

### Modifying the Menu

Update the menu items in `index.html` within the `#menuPage` section.

### Styling Changes

All visual customization can be done in `css/styles.css`. The CSS uses:

- CSS Grid for responsive layouts
- CSS animations and transitions
- Linear gradients for backgrounds
- Custom hover effects

### Colors and Themes

Main color variables used throughout:

- Primary: `#ff6b6b` (coral red)
- Secondary: `#feca57` (golden yellow)
- Accent: `#4ecdc4` (teal)
- Background: `#667eea` to `#764ba2` (blue-purple gradient)

## 📱 Browser Compatibility

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Features Breakdown

### Page Navigation

- Single-page application with JavaScript-controlled page switching
- Smooth transitions between sections
- Consistent navigation with back buttons

### Search Functionality

- Real-time search filtering in the guest book
- Case-insensitive matching
- Automatic prioritization of exact matches

### Message Management

- Local storage backup for all messages
- Optimistic UI updates
- Error handling with user feedback
- Edit functionality for existing messages

### Responsive Design

- Mobile-first approach
- Flexible grid layouts
- Optimized for screens from 320px to 1200px+
- Touch-friendly interface elements

## 🚀 Deployment

### GitHub Pages

1. Push the code to a GitHub repository
2. Enable GitHub Pages in repository settings
3. Your site will be available at `https://username.github.io/repository-name`

### Netlify

1. Drag and drop the project folder to [Netlify](https://netlify.com)
2. Your site will be automatically deployed

### Traditional Web Hosting

Upload all files to your web hosting provider's public directory.

## 📝 License

This project is created for personal use for Saranie & Lorvens' wedding. Feel free to use as a template for your own events.

## 🤝 Contributing

This is a personal wedding website, but if you find bugs or have suggestions for improvements, feel free to open an issue or submit a pull request.

## 📞 Support

For questions about this website, please contact the wedding couple or the developer who created this site.

---

**Made with 💕 for Saranie & Lorvens' Wedding Day**  
_July 11th, 2025_
