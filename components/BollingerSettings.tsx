'use client';

import { useState } from 'react';
import { BollingerBandsOptions, BollingerBandsStyle } from '../lib/types';

interface BollingerSettingsProps {
  options: BollingerBandsOptions;
  style: BollingerBandsStyle;
  onOptionsChange: (options: BollingerBandsOptions) => void;
  onStyleChange: (style: BollingerBandsStyle) => void;
  onClose: () => void;
}

export default function BollingerSettings({
  options,
  style,
  onOptionsChange,
  onStyleChange,
  onClose
}: BollingerSettingsProps) {
  const [activeTab, setActiveTab] = useState<'inputs' | 'style'>('inputs');

  const handleOptionsChange = (key: keyof BollingerBandsOptions, value: any) => {
    onOptionsChange({ ...options, [key]: value });
  };

  const handleStyleChange = (
    band: keyof BollingerBandsStyle,
    key: string,
    value: any
  ) => {
    onStyleChange({
      ...style,
      [band]: { ...style[band], [key]: value }
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg w-96 max-h-80vh overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold">Bollinger Bands Settings</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="flex border-b border-gray-700">
          <button
            onClick={() => setActiveTab('inputs')}
            className={`flex-1 py-2 px-4 ${
              activeTab === 'inputs'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Inputs
          </button>
          <button
            onClick={() => setActiveTab('style')}
            className={`flex-1 py-2 px-4 ${
              activeTab === 'style'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Style
          </button>
        </div>

        <div className="p-4 max-h-96 overflow-y-auto">
          {activeTab === 'inputs' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Length</label>
                <input
                  type="number"
                  value={options.length}
                  onChange={(e) => handleOptionsChange('length', parseInt(e.target.value))}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
                  min="1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Source</label>
                <select
                  value={options.source}
                  onChange={(e) => handleOptionsChange('source', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
                >
                  <option value="close">Close</option>
                  <option value="open">Open</option>
                  <option value="high">High</option>
                  <option value="low">Low</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">StdDev Multiplier</label>
                <input
                  type="number"
                  value={options.stdDevMultiplier}
                  onChange={(e) => handleOptionsChange('stdDevMultiplier', parseFloat(e.target.value))}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
                  step="0.1"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Offset</label>
                <input
                  type="number"
                  value={options.offset}
                  onChange={(e) => handleOptionsChange('offset', parseInt(e.target.value))}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          )}

          {activeTab === 'style' && (
            <div className="space-y-6">
              {/* Upper Band */}
              <div>
                <h3 className="text-sm font-medium mb-3">Upper Band</h3>
                <div className="space-y-3 pl-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={style.upper.visible}
                      onChange={(e) => handleStyleChange('upper', 'visible', e.target.checked)}
                      className="mr-2"
                    />
                    <label className="text-sm">Visible</label>
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Color</label>
                    <input
                      type="color"
                      value={style.upper.color}
                      onChange={(e) => handleStyleChange('upper', 'color', e.target.value)}
                      className="w-full h-8 bg-gray-700 border border-gray-600 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Line Width</label>
                    <input
                      type="number"
                      value={style.upper.lineWidth}
                      onChange={(e) => handleStyleChange('upper', 'lineWidth', parseInt(e.target.value))}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
                      min="1"
                      max="5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Line Style</label>
                    <select
                      value={style.upper.lineStyle}
                      onChange={(e) => handleStyleChange('upper', 'lineStyle', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
                    >
                      <option value="solid">Solid</option>
                      <option value="dashed">Dashed</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Basis Band */}
              <div>
                <h3 className="text-sm font-medium mb-3">Basis (Middle Band)</h3>
                <div className="space-y-3 pl-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={style.basis.visible}
                      onChange={(e) => handleStyleChange('basis', 'visible', e.target.checked)}
                      className="mr-2"
                    />
                    <label className="text-sm">Visible</label>
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Color</label>
                    <input
                      type="color"
                      value={style.basis.color}
                      onChange={(e) => handleStyleChange('basis', 'color', e.target.value)}
                      className="w-full h-8 bg-gray-700 border border-gray-600 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Line Width</label>
                    <input
                      type="number"
                      value={style.basis.lineWidth}
                      onChange={(e) => handleStyleChange('basis', 'lineWidth', parseInt(e.target.value))}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
                      min="1"
                      max="5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Line Style</label>
                    <select
                      value={style.basis.lineStyle}
                      onChange={(e) => handleStyleChange('basis', 'lineStyle', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
                    >
                      <option value="solid">Solid</option>
                      <option value="dashed">Dashed</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Lower Band */}
              <div>
                <h3 className="text-sm font-medium mb-3">Lower Band</h3>
                <div className="space-y-3 pl-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={style.lower.visible}
                      onChange={(e) => handleStyleChange('lower', 'visible', e.target.checked)}
                      className="mr-2"
                    />
                    <label className="text-sm">Visible</label>
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Color</label>
                    <input
                      type="color"
                      value={style.lower.color}
                      onChange={(e) => handleStyleChange('lower', 'color', e.target.value)}
                      className="w-full h-8 bg-gray-700 border border-gray-600 rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Line Width</label>
                    <input
                      type="number"
                      value={style.lower.lineWidth}
                      onChange={(e) => handleStyleChange('lower', 'lineWidth', parseInt(e.target.value))}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
                      min="1"
                      max="5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Line Style</label>
                    <select
                      value={style.lower.lineStyle}
                      onChange={(e) => handleStyleChange('lower', 'lineStyle', e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
                    >
                      <option value="solid">Solid</option>
                      <option value="dashed">Dashed</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Background Fill */}
              <div>
                <h3 className="text-sm font-medium mb-3">Background Fill</h3>
                <div className="space-y-3 pl-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={style.background.visible}
                      onChange={(e) => handleStyleChange('background', 'visible', e.target.checked)}
                      className="mr-2"
                    />
                    <label className="text-sm">Visible</label>
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Opacity</label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={style.background.opacity}
                      onChange={(e) => handleStyleChange('background', 'opacity', parseFloat(e.target.value))}
                      className="w-full"
                    />
                    <div className="text-xs text-gray-400 mt-1">
                      {Math.round(style.background.opacity * 100)}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-700 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}