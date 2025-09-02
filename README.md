# Match & Bill - Brand-Creator Platform

A full-stack web application that connects brands with content creators through intelligent matching algorithms and provides comprehensive billing management.

## 🚀 Features

### 1. Brand-Creator Matching
- **Intelligent Scoring Algorithm**: Multi-factor scoring system with weighted criteria
- **Advanced Filtering**: Filter by location, vertical, platform, and score
- **Real-time Results**: Instant matching with detailed explanations
- **Diversification Logic**: Ensures variety in top recommendations

### 2. Billing & Payout Management
- **Two-step Form Flow**: Separate brand billing and creator payout forms
- **Comprehensive Validation**: Real-time validation with detailed error messages
- **Tax Calculation**: Automatic GST calculation (18%)
- **Summary Generation**: Print and save billing summaries

## 🛠️ Tech Stack

**Backend:**
- Node.js with Express
- Zod for validation
- CORS for cross-origin requests

**Frontend:**
- React with Vite
- Material-UI (MUI) for components
- React Hook Form for form management
- Zod for client-side validation
- Axios for API calls
- React Router for navigation

## 📁 Project Structure

```
taag/
├── backend/                 # Backend API server
│   ├── controllers/         # Request handlers
│   ├── routes/             # API routes
│   ├── services/           # Business logic
│   ├── db.js              # In-memory data storage
│   ├── index.js           # Server entry point
│   └── package.json       # Backend dependencies
├── src/                    # Frontend React app
│   ├── components/         # Reusable components
│   ├── pages/             # Page components
│   ├── services/          # API service layer
│   └── App.js             # Main app component
├── public/                 # Static assets
└── package.json           # Frontend dependencies
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd taag
   ```

2. **Install Frontend Dependencies**
   ```bash
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   cd ..
   ```

4. **Start the Backend Server**
   ```bash
   cd backend
   npm run dev
   # Server runs on http://localhost:5000
   ```

5. **Start the Frontend Development Server**
   ```bash
   # In a new terminal, from the root directory
   npm start
   # App runs on http://localhost:3000
   ```

6. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - Health Check: http://localhost:5000/health

## 🎯 Matching Algorithm Explained

### Overview
The core matching algorithm evaluates brand-creator compatibility using a weighted scoring system that considers multiple factors to ensure the best possible matches.

### Scoring Formula
```
Total Score = (Relevance × 0.4) + (Audience Fit × 0.3) + (Performance × 0.2) + (Constraints × 0.1)
```

### 1. Eligibility Filtering (Pre-Scoring)
Before scoring, creators are filtered based on:
- **Budget Constraint**: Creator's base price ≤ Brand's budget
- **Platform Availability**: Creator uses at least one required platform
- **Content Safety**: Respects no-adult-content constraints

### 2. Relevance Scoring (40% weight)
Measures how well the creator's experience aligns with the brand's category:

- **Perfect Match (100 points)**: Brand category in creator's `pastBrandCategories`
  - *Reason: "Proven experience in [Category]"*
- **Good Match (70 points)**: Brand category in creator's `verticals`
  - *Reason: "Relevant Vertical: [Vertical]"*
- **No Match (0 points)**: No category alignment

### 3. Audience Fit Scoring (30% weight)
Evaluates demographic alignment between brand targets and creator audience:

**Location Score:**
- Sums percentages of creator's audience in brand's target locations
- Example: If brand targets Mumbai (creator has 42% Mumbai audience) = 42 points

**Age Score:**
- Calculates overlap between brand's target age range and creator's audience age buckets
- Uses proportional overlap calculation for accuracy
- Example: Brand targets 18-30, creator has 55% in 18-24 and 35% in 25-34

**Final Score:** Average of location and age scores
- *Reason: "[XX]% audience match in target cities"*

### 4. Performance Scoring (20% weight)
Assesses value-for-money and engagement metrics:

**Cost Per View (CPV) Analysis:**
- Calculates CPV = basePriceINR ÷ avgViews
- Normalizes across all creators (lower CPV = higher score)
- Contributes 50% of performance score

**Engagement Rate:**
- Scaled engagement rate contributing 50% of performance score
- Higher engagement = better score

**Reasoning:**
- High engagement: "High [X]% Engagement"
- Good value: "Great value for money (Low CPV)"

### 5. Constraints Scoring (10% weight)
Ensures compliance with brand requirements:
- **Full Compliance (100 points)**: Meets all constraints
- **Violation (0 points)**: Violates any constraint
- *Reason: "Meets all constraints" or "Violates content guidelines"*

### 6. Diversification Rule
After initial scoring and ranking:
1. Examines top 3 results
2. If all have the same primary vertical:
   - Finds next highest-scoring creator from different vertical
   - Swaps with 3rd position
   - Adds reason: "Promoted for diversification"

### Example Calculation

**Brand Brief:**
- Category: Fashion
- Budget: ₹500,000
- Target: Mumbai, Delhi
- Age: 18-30

**Creator: @fitwithria**
- Past Categories: [Fashion, Wellness]
- Audience: Mumbai 42%, Delhi 20%
- Age: 18-24 (55%), 25-34 (35%)
- Price: ₹80,000
- Engagement: 4.7%

**Scoring:**
1. **Relevance**: 100 (Fashion in past categories)
2. **Audience Fit**: 62 (Mumbai 42% + Delhi 20% = 62% location match)
3. **Performance**: 75 (Good engagement + reasonable CPV)
4. **Constraints**: 100 (Meets all requirements)

**Final Score**: (100×0.4) + (62×0.3) + (75×0.2) + (100×0.1) = **86**

## 📊 API Endpoints

### Matching API
- **POST** `/api/match` - Find matching creators
  ```json
  {
    "category": "Fashion",
    "targetLocations": ["Mumbai", "Delhi"],
    "targetAges": [18, 30],
    "platforms": ["Instagram", "YouTube"],
    "budgetINR": 500000,
    "noAdultContent": true
  }
  ```

### Billing APIs
- **POST** `/api/billing/brand` - Submit brand billing details
- **POST** `/api/billing/creator` - Submit creator payout details

### Health Check
- **GET** `/health` - API health status

## 🎨 UI Components

### Pages
- **BriefForm**: Brand brief submission with validation
- **MatchConsole**: Results display with filtering options
- **BillingPage**: Two-step billing and payout forms

### Components
- **CreatorCard**: Individual creator result display
- **API Service**: Centralized API communication

## 🔧 Configuration

### Environment Variables
Create `.env` file in the root directory:
```
REACT_APP_API_URL=http://localhost:5000/api
```

### Backend Configuration
The backend server configuration can be modified in `backend/index.js`:
- Port: Default 5000
- CORS: Configured for local development

## 🧪 Testing the Application

### Test Scenarios

1. **Basic Matching**
   - Create a brief for Fashion category with ₹500,000 budget
   - Expect to see @fitwithria with high relevance score

2. **Budget Filtering**
   - Set budget to ₹50,000
   - Expect fewer results due to budget constraints

3. **Platform Filtering**
   - Select only LinkedIn platform
   - Expect to see @techbyraj prominently

4. **Billing Flow**
   - Complete brand billing with valid GSTIN
   - Complete creator payout with valid PAN and bank details
   - Generate and save summary

### Sample Data
The application includes sample data for:
- 5 creators across different verticals
- 2 sample brand briefs
- Various platforms, locations, and demographics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🚨 Known Issues & Future Enhancements

### Current Limitations
- In-memory data storage (no persistence)
- No user authentication
- Limited to predefined categories and locations

### Planned Features
- Database integration (MongoDB/PostgreSQL)
- User authentication and authorization
- Creator profile management
- Campaign tracking and analytics
- Payment gateway integration
- Advanced filtering and search
- Real-time notifications

## 📞 Support

For questions or issues, please create an issue in the repository or contact the development team.

---

**Built with ❤️ using React, Node.js, and Material-UI**

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
