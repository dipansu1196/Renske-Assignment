'use client';

import { useEffect, useRef } from 'react';
import { init, dispose } from 'klinecharts';
import type { Chart as KLineChart } from 'klinecharts';
import { OHLCV, BollingerBandsOptions, BollingerBandsStyle } from '../lib/types';
import { computeBollingerBands } from '../lib/indicators/bollinger';

/**
 * Interactive candlestick chart component with Bollinger Bands support
 * Uses KLineCharts library for professional trading chart visualization
 */

interface ChartProps {
  data: OHLCV[];
  showBollinger: boolean;
  bollingerOptions: BollingerBandsOptions;
  bollingerStyle: BollingerBandsStyle;
}

export default function Chart({ data, showBollinger, bollingerOptions, bollingerStyle }: ChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<KLineChart | null>(null);

  // Initialize chart with configuration on component mount
  useEffect(() => {
    if (!chartRef.current) return;
    
    try {
      chartInstance.current = init(chartRef.current, {
        grid: {
          show: true,
          horizontal: {
            show: true,
            size: 1,
            color: '#393939',
            style: 'solid'
          },
          vertical: {
            show: true,
            size: 1,
            color: '#393939',
            style: 'solid'
          }
        },
        candle: {
          margin: {
            bottom: 6,
            top: 6,
            left: 0,
            right: 0
          },
          type: 'candle_solid',
          bar: {
            upColor: '#26a69a',
            downColor: '#ef5350',
            noChangeColor: '#888888'
          },
          tooltip: {
            showRule: 'always',
            showType: 'standard',
            custom: [
              {
                title: 'Time: ',
                value: '{time}'
              },
              {
                title: 'Open: ',
                value: '{open}'
              },
              {
                title: 'High: ',
                value: '{high}'
              },
              {
                title: 'Low: ',
                value: '{low}'
              },
              {
                title: 'Close: ',
                value: '{close}'
              },
              {
                title: 'Volume: ',
                value: '{volume}'
              }
            ]
          }
        },
        xAxis: {
          show: true,
          height: null,
          axisLine: {
            show: true,
            color: '#888888',
            size: 1
          },
          tickText: {
            show: true,
            color: '#D9D9D9',
            size: 12,
            family: 'Helvetica Neue',
            weight: 'normal',
            marginStart: 4,
            marginEnd: 4
          },
          tickLine: {
            show: true,
            size: 1,
            length: 3,
            color: '#888888'
          }
        },
        yAxis: {
          show: true,
          width: null,
          position: 'right',
          type: 'normal',
          inside: false,
          reverse: false,
          axisLine: {
            show: true,
            color: '#888888',
            size: 1
          },
          tickText: {
            show: true,
            color: '#D9D9D9',
            size: 12,
            family: 'Helvetica Neue',
            weight: 'normal',
            marginStart: 8,
            marginEnd: 8
          },
          tickLine: {
            show: true,
            size: 1,
            length: 3,
            color: '#888888'
          }
        },
        separator: {
          size: 1,
          color: '#888888',
          fill: true,
          activeBackgroundColor: 'rgba(230, 230, 230, .15)'
        },
        crosshair: {
          show: true,
          horizontal: {
            show: true,
            line: {
              show: true,
              style: 'dashed',
              dashValue: [4, 2],
              size: 1,
              color: '#888888'
            },
            text: {
              show: true,
              color: '#D9D9D9',
              size: 12,
              family: 'Helvetica Neue',
              weight: 'normal',
              borderStyle: 'solid',
              borderSize: 1,
              borderColor: '#505050',
              borderRadius: 2,
              paddingLeft: 4,
              paddingRight: 4,
              paddingTop: 2,
              paddingBottom: 2,
              backgroundColor: '#505050'
            }
          },
          vertical: {
            show: true,
            line: {
              show: true,
              style: 'dashed',
              dashValue: [4, 2],
              size: 1,
              color: '#888888'
            },
            text: {
              show: true,
              color: '#D9D9D9',
              size: 12,
              family: 'Helvetica Neue',
              weight: 'normal',
              borderStyle: 'solid',
              borderSize: 1,
              borderColor: '#505050',
              borderRadius: 2,
              paddingLeft: 4,
              paddingRight: 4,
              paddingTop: 2,
              paddingBottom: 2,
              backgroundColor: '#505050'
            }
          }
        }
      });

      // Cleanup function to dispose chart instance
      return () => {
        if (chartInstance.current && chartRef.current) {
          dispose(chartRef.current);
          chartInstance.current = null;
        }
      };
    } catch (error) {
      console.error('Failed to initialize chart:', error);
    }
  }, []);

  // Update chart data and indicators when props change
  useEffect(() => {
    if (!chartInstance.current || !data?.length) return;
    
    try {
      // Filter and format data for KLineCharts
      const klineData = data
        .filter(item => item && typeof item.timestamp !== 'undefined')
        .map(item => ({
          timestamp: item.timestamp,
          open: item.open || 0,
          high: item.high || 0,
          low: item.low || 0,
          close: item.close || 0,
          volume: item.volume || 0
        }));

      if (klineData.length > 0) {
        chartInstance.current.applyNewData(klineData);
      }

      // Note: Bollinger Bands temporarily disabled due to klinecharts compatibility
      // Will be re-enabled after resolving indicator rendering issues
    } catch (error) {
      console.error('Failed to update chart data:', error);
    }
  }, [data, showBollinger, bollingerOptions, bollingerStyle]);

  return (
    <div 
      ref={chartRef} 
      className="w-full h-full" 
      style={{ minHeight: '400px' }}
    />
  );
}