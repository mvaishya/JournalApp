# Trading Journal Application

A comprehensive React-based trading journal application with Google OAuth authentication and full CRUD operations for managing trading entries.

## 🚀 Features

### ✅ Completed
- **Google OAuth Authentication** with Cross-Origin-Opener-Policy fixes for Docker
- **Responsive Trading Journal UI** with modern design
- **Full CRUD Operations** for journal entries
- **Real-time form validation** and error handling
- **Responsive grid layout** for displaying entries
- **Logout functionality** that properly clears session and returns to login

### 📊 Journal Entry Fields
Based on your backend POJO, the application supports:

- **UserId**: Automatically populated from Google OAuth (user.sub)
- **Entry Time**: DateTime picker for trade entry time
- **Symbol**: Stock/crypto symbol (e.g., AAPL, MSFT)
- **Entry Price**: Entry price of the position
- **Stop Loss**: Stop loss price
- **Position Size**: Number of shares/units
- **Target Price**: Target exit price
- **Trailing Stop**: Trailing stop price
- **Exit Time**: DateTime picker for trade exit time
- **Exit Price**: Actual exit price
- **P&L**: Profit/Loss calculation
- **Setup**: Free text field for trading strategy notes

## 🎯 User Flow

1. **Login**: User signs in with Google OAuth
2. **Journal Dashboard**: View all trading entries in a responsive card layout
3. **Create Entry**: Click "New Entry" to add a new trade
4. **Edit Entry**: Click "Edit" on any existing entry to modify
5. **Delete Entry**: Click "Delete" with confirmation dialog
6. **Logout**: Returns to login page with cleared session

## 🔧 Backend API Requirements

Your Spring Boot backend should implement these endpoints:

### Base URL: `http://localhost:8080/api/journal`

```java
// GET /api/journal/user/{userId} - Get all entries for a user
// POST /api/journal - Create new entry
// PUT /api/journal/{entryId} - Update existing entry
// DELETE /api/journal/{entryId} - Delete entry

@RestController
@RequestMapping("/api/journal")
@CrossOrigin(origins = "http://localhost:3000")
public class JournalController {
    
    @GetMapping("/user/{userId}")
    public List<JournalEntry> getUserEntries(@PathVariable String userId) {
        // Return all entries for the user
    }
    
    @PostMapping
    public JournalEntry createEntry(@RequestBody JournalEntry entry) {
        // Create new entry (UserId will be provided by frontend)
    }
    
    @PutMapping("/{entryId}")
    public JournalEntry updateEntry(@PathVariable UUID entryId, @RequestBody JournalEntry entry) {
        // Update existing entry
    }
    
    @DeleteMapping("/{entryId}")
    public void deleteEntry(@PathVariable UUID entryId) {
        // Delete entry
    }
}
```

### Expected Request/Response Format

**Create/Update Entry Request:**
```json
{
    "userId": "user_google_id_here",
    "entryTime": "2025-01-20T10:30:00",
    "symbol": "AAPL",
    "entry": 150.25,
    "stopLoss": 145.00,
    "positionSize": 100,
    "target": 160.00,
    "trailingStop": 148.00,
    "exitTime": "2025-01-20T14:30:00",
    "exit": 158.75,
    "pnl": 850.00,
    "setup": "Breakout strategy on daily resistance"
}
```

**Response:**
```json
{
    "id": "uuid-here",
    "userId": "user_google_id_here",
    "entryTime": "2025-01-20T10:30:00",
    "symbol": "AAPL",
    "entry": 150.25,
    "stopLoss": 145.00,
    "positionSize": 100,
    "target": 160.00,
    "trailingStop": 148.00,
    "exitTime": "2025-01-20T14:30:00",
    "exit": 158.75,
    "pnl": 850.00,
    "setup": "Breakout strategy on daily resistance"
}
```

## 🐳 Docker Setup

### Build and Run
```bash
# Build the Docker image
docker build -t my-react-journal-app .

# Run the container
docker run -p 3000:80 my-react-journal-app

# Access the application
open http://localhost:3000
```

## 📁 Project Structure

```
src/
├── components/
│   ├── LoginPage.js          # Google OAuth login
│   ├── HomePage.js           # Simple welcome page
│   ├── Journal.js            # Main journal dashboard
│   ├── JournalEntryForm.js   # Create/Edit form modal
│   └── JournalEntryList.js   # Display entries grid
├── App.js                    # Main routing
└── index.js                  # Google OAuth provider setup
```

## 🔐 OAuth Configuration

Make sure your Google Cloud Console is configured with:

**Authorized JavaScript origins:**
- `http://localhost:3000`
- `http://localhost`

**Authorized redirect URIs:**
- `http://localhost:3000`
- `http://localhost`

## 🎨 UI Features

- **Modern Design**: Clean, professional interface
- **Responsive Layout**: Works on desktop and mobile
- **Color-coded P&L**: Green for profits, red for losses
- **Loading States**: Visual feedback during API calls
- **Error Handling**: User-friendly error messages
- **Form Validation**: Required field validation
- **Modal Forms**: Non-intrusive editing experience

## 🔄 State Management

- **User Authentication**: Managed in App.js
- **Journal Entries**: Fetched from backend on page load
- **Form State**: Local state in form components
- **Auto-refresh**: List refreshes after create/update/delete

## 🚀 Running the Application

1. **Start Backend**: Ensure your Spring Boot app is running on `http://localhost:8080`
2. **Start Frontend**: Run the Docker container on `http://localhost:3000`
3. **Login**: Use Google OAuth to authenticate
4. **Create Entries**: Start tracking your trades!

## 📝 Notes

- **User ID Mapping**: The app uses `user.sub` from Google OAuth as the userId
- **DateTime Format**: Uses ISO 8601 format for date/time fields
- **CORS**: Backend needs CORS configuration for `http://localhost:3000`
- **Validation**: Frontend validates required fields before API calls
- **Error Handling**: Comprehensive error handling for network issues

The application is now ready for full trading journal functionality with your Spring Boot backend!
