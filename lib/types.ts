export interface OHLCV {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface BollingerBandsOptions {
  length: number;
  source: 'close' | 'open' | 'high' | 'low';
  stdDevMultiplier: number;
  offset: number;
}

export interface BollingerBandsResult {
  upper: number;
  basis: number;
  lower: number;
}

export interface BollingerBandsStyle {
  basis: {
    visible: boolean;
    color: string;
    lineWidth: number;
    lineStyle: 'solid' | 'dashed';
  };
  upper: {
    visible: boolean;
    color: string;
    lineWidth: number;
    lineStyle: 'solid' | 'dashed';
  };
  lower: {
    visible: boolean;
    color: string;
    lineWidth: number;
    lineStyle: 'solid' | 'dashed';
  };
  background: {
    visible: boolean;
    opacity: number;
  };
}