# CaseFlow CRM

A modern, case-driven compliance CRM built for visa, education, property, and recruitment consultancies.

![CaseFlow CRM](https://img.shields.io/badge/React-18.2-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8) ![Vite](https://img.shields.io/badge/Vite-5.0-646cff)

## Features

### Core Modules
- **Dashboard** - Real-time metrics, recent cases, tasks, and financial overview
- **Client Management** - Full CRUD with GDPR compliance tracking
- **Case Management** - Multi-service support (Visa, Education, Property, Recruitment)
- **Timeline** - Immutable audit trail for all activities
- **Finance** - Invoice creation, payment tracking, financial reports
- **Tasks** - Task management with priority and deadline tracking

### New in v2.0
- **Admin Panel** - User management, roles, activity logs
- **Settings** - Company, invoice, email, and integration configuration
- **Email System** - Template-based emails with automated welcome messages
- **Jotform Integration** - Webhook support for automatic client creation
- **Enhanced UI** - Collapsible sidebar, improved typography, animations

## Tech Stack

- **React 18** - UI framework
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **DM Sans** - Typography

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
caseflow-crm/
├── src/
│   ├── App.jsx          # Main CRM application
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── public/
│   └── favicon.svg      # App icon
├── index.html           # HTML template
├── package.json         # Dependencies
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind configuration
├── postcss.config.js    # PostCSS configuration
└── README.md            # Documentation
```

## Configuration

### Jotform Integration

1. Go to Settings → Jotform Integration
2. Enable the integration
3. Enter your Jotform API key
4. Generate a webhook secret
5. Copy the webhook URL to your Jotform form settings

### Email Configuration

1. Go to Settings → Email
2. Configure SMTP settings
3. Enable automated emails as needed
4. Customize email templates

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
# Upload the 'dist' folder to Netlify
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## License

MIT License - feel free to use for your own projects.

## Support

For questions or issues, please open a GitHub issue.
