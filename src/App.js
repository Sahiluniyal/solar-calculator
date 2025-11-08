import React, { useState, useEffect } from 'react';
import './App.css';

/**
 * SIMPLE SOLAR CALCULATOR - CALCULATION FORMULAS
 * 
 * 1. Estimated System Size (kW):
 *    Formula: size = monthlyBill / (sunlightHours × 30 days × ₹6 per kWh)
 *    Assumption: Average electricity tariff is ₹6 per kWh (unit)
 *    Logic: Calculate how much power generation is needed to offset the monthly bill
 * 
 * 2. Number of Solar Panels:
 *    Formula: panels = Math.ceil((size × 1000 W) / 350 W per panel)
 *    Each panel is 350 Watts
 *    Rounded up to get whole number of panels
 * 
 * 3. Total System Cost:
 *    Formula: cost = size (kW) × 1000 × cost per watt (₹/W)
 *    Default cost per watt: ₹55/W
 *    User can modify this value
 */

function App() {
  // Input states
  const [monthlyBill, setMonthlyBill] = useState('');
  const [sunlightHours, setSunlightHours] = useState('');
  const [costPerWatt, setCostPerWatt] = useState(55);
  
  // Output states
  const [systemSize, setSystemSize] = useState(0);
  const [numberOfPanels, setNumberOfPanels] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  
  // Constants
  const PANEL_WATTAGE = 350; // Watts per panel (not editable)
  const TARIFF_PER_KWH = 6; // ₹6 per kWh (assumed average tariff)
  const DAYS_PER_MONTH = 30;

  // Calculate results whenever inputs change
  useEffect(() => {
    if (monthlyBill && sunlightHours && monthlyBill > 0 && sunlightHours > 0) {
      // Calculate system size in kW
      // Formula: size = monthlyBill / (sunlightHours × 30 × tariff)
      const calculatedSize = monthlyBill / (sunlightHours * DAYS_PER_MONTH * TARIFF_PER_KWH);
      
      // Calculate number of panels needed
      // Formula: panels = ceil((size in watts) / panel wattage)
      const calculatedPanels = Math.ceil((calculatedSize * 1000) / PANEL_WATTAGE);
      
      // Calculate total system cost
      // Formula: cost = size × 1000 × cost per watt
      const calculatedCost = calculatedSize * 1000 * costPerWatt;
      
      setSystemSize(calculatedSize);
      setNumberOfPanels(calculatedPanels);
      setTotalCost(calculatedCost);
    } else {
      // Reset outputs if inputs are invalid
      setSystemSize(0);
      setNumberOfPanels(0);
      setTotalCost(0);
    }
  }, [monthlyBill, sunlightHours, costPerWatt]);

  // Format currency in Indian format
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>☀️ Simple Solar Calculator</h1>
          <p className="subtitle">Calculate your solar system requirements</p>
        </header>

        <div className="content">
          {/* Input Section */}
          <section className="input-section">
            <h2>Enter Your Details</h2>
            
            <div className="input-group">
              <label htmlFor="monthlyBill">
                Monthly Electricity Bill <span className="required">*</span>
              </label>
              <div className="input-wrapper">
                <span className="input-prefix">₹</span>
                <input
                  type="number"
                  id="monthlyBill"
                  value={monthlyBill}
                  onChange={(e) => setMonthlyBill(e.target.value)}
                  placeholder="e.g., 5000"
                  min="0"
                  required
                />
              </div>
              <small>Your average monthly electricity bill in rupees</small>
            </div>

            <div className="input-group">
              <label htmlFor="sunlightHours">
                Average Sunlight Hours Per Day <span className="required">*</span>
              </label>
              <div className="input-wrapper">
                <input
                  type="number"
                  id="sunlightHours"
                  value={sunlightHours}
                  onChange={(e) => setSunlightHours(e.target.value)}
                  placeholder="e.g., 5.5"
                  min="0"
                  step="0.1"
                  required
                />
                <span className="input-suffix">hrs</span>
              </div>
              <small>Peak sunlight hours in your location (typically 4-6 hours in India)</small>
            </div>

            <div className="input-group">
              <label htmlFor="costPerWatt">
                Cost Per Watt (Optional)
              </label>
              <div className="input-wrapper">
                <span className="input-prefix">₹</span>
                <input
                  type="number"
                  id="costPerWatt"
                  value={costPerWatt}
                  onChange={(e) => setCostPerWatt(e.target.value)}
                  placeholder="55"
                  min="0"
                />
                <span className="input-suffix">/W</span>
              </div>
              <small>Default is ₹55 per watt (including installation)</small>
            </div>

            <div className="info-box">
              <strong>Note:</strong> Panel wattage is set to 350 W per panel (standard size)
            </div>
          </section>

          {/* Output Section */}
          <section className="output-section">
            <h2>Your Solar System Estimate</h2>
            
            {systemSize > 0 ? (
              <>
                <div className="result-cards">
                  <div className="result-card">
                    <div className="result-icon">⚡</div>
                    <div className="result-label">System Size</div>
                    <div className="result-value">{systemSize.toFixed(2)} kW</div>
                  </div>

                  <div className="result-card">
                    <div className="result-icon">📦</div>
                    <div className="result-label">Solar Panels Needed</div>
                    <div className="result-value">{numberOfPanels} panels</div>
                    <div className="result-sub">@ 350W each</div>
                  </div>

                  <div className="result-card highlight">
                    <div className="result-icon">💰</div>
                    <div className="result-label">Estimated Total Cost</div>
                    <div className="result-value">{formatCurrency(totalCost)}</div>
                  </div>
                </div>

                <div className="message-box">
                  <p>
                    ✨ A <strong>{systemSize.toFixed(2)} kW</strong> system can save around{' '}
                    <strong>{formatCurrency(monthlyBill)}</strong> per month.
                  </p>
                  <p className="message-sub">
                    Start reducing your electricity bills and contribute to a greener future!
                  </p>
                </div>
              </>
            ) : (
              <div className="placeholder">
                <p>👆 Fill in the required fields above to see your solar system estimate</p>
              </div>
            )}
          </section>
        </div>

        <footer className="footer">
          <p>Built by <strong>Direct Watts Interns</strong></p>
        </footer>
      </div>
    </div>
  );
}

export default App;
