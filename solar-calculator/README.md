# Simple Solar Calculator

A fully responsive Single Page Application (SPA) built with React for calculating solar system requirements for Indian users.

## Features

- 📱 Fully responsive design (mobile and desktop)
- ⚡ Real-time calculations as you type
- 💰 Indian currency formatting (₹)
- 🎨 Modern, gradient-based UI
- 📊 Clear visual representation of results

## How to Run

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation & Setup

1. Open a terminal in the project directory
2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Calculation Formulas

### 1. System Size (kW)
```
size = monthlyBill (₹) / (sunlightHours × 30 days × ₹6 per kWh)
```
Assumes ₹6 per kWh as average electricity tariff

### 2. Number of Panels
```
panels = Math.ceil((size × 1000 W) / 350 W per panel)
```
Uses 350W panels (standard size, not editable)

### 3. Total System Cost
```
cost = size (kW) × 1000 × costPerWatt (₹/W)
```
Default cost per watt: ₹55/W (user can modify)

## Usage

1. Enter your monthly electricity bill in rupees
2. Enter average sunlight hours per day in your location (typically 4-6 hours in India)
3. Optionally adjust the cost per watt (default ₹55/W)
4. Results update automatically showing:
   - Recommended system size in kW
   - Number of solar panels needed
   - Total estimated cost
   - Monthly savings message

## Technology Stack

- React 18 (Functional Components with Hooks)
- CSS3 (Flexbox & Grid)
- No external dependencies

## Project Structure

```
solar-calculator/
├── public/
│   └── index.html
├── src/
│   ├── App.js        # Main application component
│   ├── App.css       # Styles
│   └── index.js      # Entry point
├── package.json
└── README.md
```

## Built By

**Direct Watts Interns**

---

Ready to copy-paste and run in VSCode or CodeSandbox!
