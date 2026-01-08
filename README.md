<div align="center">
  <img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

<h1 align="center">Ngarang.in - AI-Powered Internship Report Generator</h1>

<p align="center">
  <strong>Transform your daily internship points into comprehensive reports with the power of AI</strong>
</p>

<p align="center">
  <em>Bikin laporan magang harian jadi gampang banget pake AI. Tinggal masukin poin, jadi deh paragraf panjang.</em>
</p>

## 🚀 Overview

Ngarang.in is a sophisticated React-based web application that leverages Google's Gemini AI to automatically generate comprehensive daily internship reports from simple bullet points. The application streamlines the reporting process for interns, transforming brief activity notes into detailed, well-structured paragraphs.

### ✨ Key Features

- **AI-Powered Generation**: Automatically converts brief points into detailed paragraphs using advanced AI
- **Three Core Sections**: Organizes reports into Activities, Learnings, and Obstacles
- **Multiple Writing Styles**: Choose between formal and informal writing tones
- **Responsive Design**: Works seamlessly across all devices
- **Modern UI**: Clean, intuitive interface with dark mode
- **Real-time Processing**: Instant report generation with loading indicators
- **Custom Modal System**: Enhanced user experience with custom alerts and confirmations
- **Brand Identity**: Professional logo integration throughout the application

## 🛠️ Tech Stack

- **Frontend**: React 19.x with TypeScript
- **Styling**: Tailwind CSS with custom Inter font integration
- **Icons**: Lucide React icon library
- **AI Integration**: Google Gemini API
- **Build Tool**: Vite
- **Package Manager**: npm

## 📋 Prerequisites

- Node.js (version 16 or higher)
- Google Gemini API Key

## 🚀 Quick Start

### 1. Clone and Setup

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd ngarang.in

# Install dependencies
npm install
```

### 2. Environment Configuration

Create a `.env.local` file in the root directory with your Gemini API key:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Run the Application

```bash
# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173`

## 🔧 Configuration

### Writing Styles

The application supports multiple writing styles:

- **Formal**: Professional, academic tone suitable for official reports
- **Informal**: Casual, conversational tone for personal reflection

### Input Sections

The application processes three core sections:

1. **Daily Activities**: What you did during the day
2. **Key Learnings**: Important lessons and insights gained
3. **Obstacles/Challenges**: Difficulties and challenges encountered

Each section can be processed independently, allowing for flexible report creation.

## 🏗️ Project Structure

```
ngarang.in/
├── public/                 # Static assets
│   ├── logo.png           # Main application logo
│   ├── logo2.png          # Header logo
│   └── logo3.png          # Favicon
├── components/            # React components
│   ├── InputCard.tsx      # Input form component
│   ├── OutputCard.tsx     # Output display component
│   └── CustomModal.tsx    # Custom modal implementation
├── services/              # External service integrations
├── types.ts               # Type definitions
├── App.tsx                # Main application component
├── index.html             # HTML template
├── index.tsx              # Entry point
├── package.json           # Dependencies and scripts
└── vite.config.ts         # Vite configuration
```

## 🎨 UI Components

### Header
- Custom logo integration
- Writing style selector
- Responsive design for all screen sizes

### Input Section
- Three-column layout for activities, learnings, and obstacles
- Clear visual indicators and placeholders
- Real-time character feedback

### Action Buttons
- Reset functionality with confirmation modal
- Generate button with loading states
- Animated hover effects

### Output Section
- Structured display of AI-generated content
- Copy functionality for generated text
- Responsive card layout

## 🤖 AI Integration

The application uses Google's Gemini API to:

1. Transform brief bullet points into comprehensive paragraphs
2. Maintain context and coherence across sections
3. Adapt writing style based on user preference
4. Generate minimum 100-word paragraphs per section

## 📱 Responsive Design

The application is fully responsive and adapts to:

- Desktop screens (1200px+)
- Tablet devices (768px - 1199px)
- Mobile devices (< 768px)

## 🛡️ Error Handling

- Network error detection and user-friendly messages
- API key validation
- Input validation and user guidance
- Graceful degradation for offline scenarios

## 🚀 Deployment

### Building for Production

```bash
# Create production build
npm run build
```

### Preview Production Build

```bash
# Serve production build locally
npm run preview
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/ngarang.in/issues) section
2. Create a new issue with detailed information
3. Ensure your API key is correctly configured

## 🙏 Acknowledgments

- Google Gemini for the powerful AI capabilities
- React and Vite for the modern development experience
- Tailwind CSS for the elegant styling solution
- Lucide React for the beautiful iconography

---
