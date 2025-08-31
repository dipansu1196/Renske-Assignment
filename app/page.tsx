'use client';

import { useState, useEffect } from 'react';
import Chart from '../components/Chart';
import BollingerSettings from '../components/BollingerSettings';
import { OHLCV, BollingerBandsOptions, BollingerBandsStyle } from '../lib/types';

/**
 * Main application component for Bollinger Bands visualization
 * Features: Interactive candlestick chart, configurable Bollinger Bands, real-time settings
 */

// Default configuration for Bollinger Bands calculation
const defaultBollingerOptions: BollingerBandsOptions = {
  length: 20,              // Period for moving average
  source: 'close',         // Price source
  stdDevMultiplier: 2,     // Standard deviation multiplier
  offset: 0                // Indicator offset
};

const defaultBollingerStyle: BollingerBandsStyle = {
  basis: {
    visible: true,
    color: '#2196F3',
    lineWidth: 1,
    lineStyle: 'solid'
  },
  upper: {
    visible: true,
    color: '#2196F3',
    lineWidth: 1,
    lineStyle: 'solid'
  },
  lower: {
    visible: true,
    color: '#2196F3',
    lineWidth: 1,
    lineStyle: 'solid'
  },
  background: {
    visible: true,
    opacity: 0.1
  }
};

export default function Home() {
  const [data, setData] = useState<OHLCV[]>([]);
  const [showBollinger, setShowBollinger] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [bollingerOptions, setBollingerOptions] = useState(defaultBollingerOptions);
  const [bollingerStyle, setBollingerStyle] = useState(defaultBollingerStyle);

  // Load OHLCV data from JSON file on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/data/ohlcv.json');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Failed to load chart data:', error);
      }
    };
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Bollinger Bands Indicator</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setShowBollinger(!showBollinger)}
              className={`px-4 py-2 rounded ${
                showBollinger 
                  ? 'bg-blue-600 hover:bg-blue-700' 
                  : 'bg-gray-600 hover:bg-gray-700'
              } transition-colors`}
            >
              {showBollinger ? 'Hide' : 'Add'} Bollinger Bands
            </button>
            {showBollinger && (
              <button
                onClick={() => setShowSettings(true)}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded transition-colors"
              >
                Settings
              </button>
            )}
          </div>
        </div>
        
        {/* Main chart container */}
        <div className="bg-gray-800 rounded-lg p-4" style={{ height: '600px' }}>
          <Chart
            data={data}
            showBollinger={showBollinger}
            bollingerOptions={bollingerOptions}
            bollingerStyle={bollingerStyle}
          />
        </div>
      </div>

      {showSettings && (
        <BollingerSettings
          options={bollingerOptions}
          style={bollingerStyle}
          onOptionsChange={setBollingerOptions}
          onStyleChange={setBollingerStyle}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
}