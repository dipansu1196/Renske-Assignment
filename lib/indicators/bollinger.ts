import { OHLCV, BollingerBandsOptions, BollingerBandsResult } from '../types';

/**
 * Bollinger Bands Technical Indicator Implementation
 * 
 * Bollinger Bands consist of three lines:
 * - Upper Band: SMA + (Standard Deviation × Multiplier)
 * - Middle Band (Basis): Simple Moving Average
 * - Lower Band: SMA - (Standard Deviation × Multiplier)
 * 
 * Used for identifying overbought/oversold conditions and volatility
 */

/**
 * Calculates Simple Moving Average for given period
 * @param values Array of numerical values
 * @param period Number of periods for averaging
 * @returns Array of SMA values (NaN for insufficient data points)
 */
function sma(values: number[], period: number): number[] {
  const result: number[] = [];
  
  for (let i = 0; i < values.length; i++) {
    if (i < period - 1) {
      result.push(NaN);
    } else {
      const sum = values.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0);
      result.push(sum / period);
    }
  }
  
  return result;
}

/**
 * Calculates sample standard deviation for given period
 * Uses n-1 denominator (Bessel's correction) for unbiased estimation
 * @param values Array of numerical values
 * @param period Number of periods for calculation
 * @returns Array of standard deviation values
 */
function standardDeviation(values: number[], period: number): number[] {
  const result: number[] = [];
  
  for (let i = 0; i < values.length; i++) {
    if (i < period - 1) {
      result.push(NaN);
    } else {
      const slice = values.slice(i - period + 1, i + 1);
      const mean = slice.reduce((a, b) => a + b, 0) / period;
      const variance = slice.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / (period - 1);
      result.push(Math.sqrt(variance));
    }
  }
  
  return result;
}

/**
 * Main function to compute Bollinger Bands indicator
 * 
 * Algorithm:
 * 1. Calculate Simple Moving Average (basis line)
 * 2. Calculate standard deviation for the same period
 * 3. Create upper/lower bands using: basis ± (stdDev × multiplier)
 * 4. Apply offset if specified
 * 
 * @param data Array of OHLCV candlestick data
 * @param options Configuration object with calculation parameters
 * @returns Array of Bollinger Bands results (upper, basis, lower)
 */
export function computeBollingerBands(
  data: OHLCV[],
  options: BollingerBandsOptions
): BollingerBandsResult[] {
  const { length, source, stdDevMultiplier, offset } = options;
  
  // Step 1: Extract price values based on selected source (close, open, high, low)
  const sourceValues = data.map(candle => candle[source]);
  
  // Step 2: Calculate Simple Moving Average (middle band/basis)
  const basisValues = sma(sourceValues, length);
  
  // Step 3: Calculate standard deviation for volatility measurement
  const stdDevValues = standardDeviation(sourceValues, length);
  
  // Step 4: Compute upper and lower bands
  const result: BollingerBandsResult[] = [];
  
  for (let i = 0; i < data.length; i++) {
    const basis = basisValues[i];
    const stdDev = stdDevValues[i];
    
    if (isNaN(basis) || isNaN(stdDev)) {
      result.push({
        upper: NaN,
        basis: NaN,
        lower: NaN
      });
    } else {
      result.push({
        upper: basis + (stdDevMultiplier * stdDev),
        basis: basis,
        lower: basis - (stdDevMultiplier * stdDev)
      });
    }
  }
  
  // Step 5: Apply time offset if specified (shifts indicator forward/backward)
  if (offset !== 0) {
    const offsetResult: BollingerBandsResult[] = new Array(data.length).fill({
      upper: NaN,
      basis: NaN,
      lower: NaN
    });
    
    // Shift each calculated value by the offset amount
    for (let i = 0; i < result.length; i++) {
      const targetIndex = i + offset;
      if (targetIndex >= 0 && targetIndex < data.length) {
        offsetResult[targetIndex] = result[i];
      }
    }
    
    return offsetResult;
  }
  
  return result;
}