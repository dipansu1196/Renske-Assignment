# Bollinger Bands Trading Indicator

A professional-grade web application for visualizing Bollinger Bands technical indicator on candlestick charts. Built with Next.js, TypeScript, and KLineCharts for high-performance financial data visualization.

## 🚀 Features

- **Interactive Candlestick Charts**: Professional trading charts with zoom, pan, and crosshair functionality
- **Bollinger Bands Indicator**: Configurable technical analysis tool with real-time calculations
- **Customizable Settings**: Adjust period, multiplier, source price, and visual styling
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark Theme**: Professional trading interface with optimal contrast
- **Real-time Updates**: Dynamic recalculation when parameters change

## 📊 Technical Implementation

### Bollinger Bands Algorithm
- **Upper Band**: SMA + (Standard Deviation × Multiplier)
- **Middle Band**: Simple Moving Average (SMA)
- **Lower Band**: SMA - (Standard Deviation × Multiplier)

### Key Components
- `Chart.tsx`: Main chart component using KLineCharts library
- `BollingerSettings.tsx`: Configuration panel for indicator parameters
- `bollinger.ts`: Core mathematical calculations for the indicator
- `types.ts`: TypeScript definitions for data structures

## 🛠️ Technology Stack

- **Framework**: Next.js 14 (React 18)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: KLineCharts library
- **Build Tool**: Webpack (via Next.js)

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Renske_Assignment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🎯 Usage Guide

### Basic Operations
1. **View Chart**: The application loads with sample OHLCV data
2. **Add Indicator**: Click "Add Bollinger Bands" to enable the indicator
3. **Customize Settings**: Use the "Settings" button to adjust parameters
4. **Interactive Features**: Zoom, pan, and hover for detailed price information

### Configuration Options

#### Calculation Parameters
- **Length**: Period for moving average calculation (default: 20)
- **Source**: Price source - Close, Open, High, or Low (default: Close)
- **StdDev Multiplier**: Standard deviation multiplier (default: 2.0)
- **Offset**: Time offset for shifting the indicator (default: 0)

#### Visual Styling
- **Line Colors**: Customizable colors for upper, middle, and lower bands
- **Line Width**: Adjustable thickness (1-5 pixels)
- **Line Style**: Solid or dashed lines
- **Background Fill**: Optional area fill with adjustable opacity

## 📁 Project Structure

```
Renske_Assignment/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main application page
├── components/
│   ├── Chart.tsx            # Chart visualization component
│   └── BollingerSettings.tsx # Settings configuration panel
├── lib/
│   ├── indicators/
│   │   └── bollinger.ts     # Bollinger Bands calculations
│   └── types.ts             # TypeScript type definitions
├── public/
│   └── data/
│       └── ohlcv.json       # Sample market data
├── next.config.js           # Next.js configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Project dependencies
```

## 🔧 Configuration Files

### PostCSS Configuration
```javascript
// postcss.config.js
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}
```

### Tailwind Configuration
```javascript
// tailwind.config.js
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## 🚀 Deployment on Vercel

### Method 1: GitHub Integration (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign in with GitHub account
   - Click "New Project"
   - Import your repository
   - Configure settings (use defaults)
   - Click "Deploy"

### Method 2: Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy project**
   ```bash
   vercel
   ```

4. **Follow prompts**
   - Set up and deploy? Yes
   - Which scope? (Select your account)
   - Link to existing project? No
   - Project name? (Use default or custom)
   - Directory? ./
   - Override settings? No

### Environment Configuration

Create `vercel.json` for advanced configuration:
```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

### Build Optimization

The project is optimized for production with:
- **Static Generation**: Pre-built pages for faster loading
- **Code Splitting**: Automatic bundle optimization
- **Image Optimization**: Next.js built-in image optimization
- **CSS Optimization**: Tailwind CSS purging for smaller bundles

## 📈 Performance Features

- **Lazy Loading**: Components load on demand
- **Memoization**: Optimized re-renders with React hooks
- **Bundle Splitting**: Separate chunks for better caching
- **Tree Shaking**: Unused code elimination

## 🐛 Troubleshooting

### Common Issues

1. **Chart not displaying**
   - Check browser console for errors
   - Ensure data is loading correctly
   - Verify KLineCharts compatibility

2. **Build failures**
   - Clear `.next` folder: `rm -rf .next`
   - Reinstall dependencies: `npm ci`
   - Check Node.js version compatibility

3. **Styling issues**
   - Verify Tailwind CSS configuration
   - Check PostCSS setup
   - Clear browser cache

## 📝 License

This project is developed for educational purposes. Please ensure compliance with any applicable licenses when using third-party libraries.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For technical issues or questions:
- Check the troubleshooting section
- Review Next.js documentation
- Consult KLineCharts documentation
- Open an issue in the repository