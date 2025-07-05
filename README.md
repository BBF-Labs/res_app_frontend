# AI Resume Platform

A modern, AI-powered resume and cover letter builder built with Next.js, React, and TypeScript. Create professional resumes with intelligent suggestions, personalized scoring, and beautiful templates.

## 🚀 Features

- **AI-Powered Writing Assistance**: Get intelligent suggestions to improve your resume content with action verbs and quantified achievements
- **Resume Scoring**: Receive personalized scores and feedback to optimize your resume for specific job descriptions
- **Professional Templates**: Choose from dozens of ATS-friendly templates designed by career experts
- **Cover Letter Builder**: Create compelling cover letters with AI assistance
- **Real-time Preview**: See changes instantly with live preview editor and auto-save functionality
- **Multiple Export Formats**: Download as PDF, HTML, or DOCX with perfect formatting
- **MDX Content Management**: Edit with powerful MDX support for rich formatting and dynamic content
- **Multi-Resume Management**: Create and manage multiple resume versions for different job applications
- **Secure & Private**: Your data is encrypted and secure
- **Dark/Light Mode**: Toggle between themes for comfortable editing

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion for animations
- **UI Components**: Radix UI primitives with shadcn/ui
- **Forms**: React Hook Form with Zod validation
- **Charts**: Recharts for analytics
- **Icons**: Lucide React
- **Package Manager**: pnpm

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ai-resume-platform.git
   cd ai-resume-platform
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Run the development server**
   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
ai-resume-platform/
├── app/                    # Next.js app router pages
│   ├── auth/              # Authentication pages
│   ├── builder/           # Resume and cover letter builders
│   ├── dashboard/         # User dashboard
│   ├── editor/            # Resume editor
│   ├── templates/         # Template gallery
│   └── ...
├── components/            # Reusable React components
│   ├── ai/               # AI-powered features
│   ├── cover-letter/     # Cover letter components
│   ├── editor/           # Editor components
│   ├── landing/          # Landing page components
│   ├── layout/           # Layout components
│   ├── providers/        # Context providers
│   ├── resume/           # Resume-specific components
│   └── ui/               # UI primitives (shadcn/ui)
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── public/               # Static assets
└── styles/               # Global styles
```

## 🎯 Key Components

### Core Features
- **Resume Builder** (`/builder/resume`): Main resume creation interface
- **Cover Letter Builder** (`/builder/cover-letter`): Cover letter creation interface
- **Template Gallery** (`/templates`): Browse and select from available templates
- **Dashboard** (`/dashboard`): Manage your resumes and account
- **Editor** (`/editor/[id]`): Advanced resume editing interface

### AI Features
- **AI Chat Panel**: Get intelligent suggestions and feedback
- **Resume Scoring**: Automated scoring and optimization recommendations
- **Content Enhancement**: AI-powered writing improvements

### Authentication
- **Login/Register**: User authentication system
- **User Management**: Profile and subscription management

## 🔧 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## 🎨 Styling

The project uses Tailwind CSS with a custom design system:
- **CSS Variables**: Custom color scheme supporting dark/light modes
- **Component Library**: shadcn/ui components for consistency
- **Animations**: Framer Motion for smooth transitions
- **Responsive Design**: Mobile-first approach

## 📱 Responsive Design

The application is fully responsive and works seamlessly across:
- **Desktop**: Full-featured experience
- **Tablet**: Optimized layouts
- **Mobile**: Touch-friendly interface

## 🔐 Authentication

The platform includes a mock authentication system:
- **Registration**: Create new accounts
- **Login**: Secure user sessions
- **Profile Management**: User preferences and settings
- **Subscription Tiers**: Free, Pro, and Premium plans

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### Prerequisites
- Node.js 18+ installed
- pnpm package manager
- Git for version control

### Development Setup

1. **Fork the repository**
   - Click the "Fork" button on GitHub
   - Clone your fork locally

2. **Set up your development environment**
   ```bash
   git clone https://github.com/your-username/ai-resume-platform.git
   cd ai-resume-platform
   pnpm install
   ```

3. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Start development**
   ```bash
   pnpm dev
   ```

### Contribution Guidelines

#### Code Style
- Follow TypeScript best practices
- Use ESLint and Prettier for code formatting
- Write meaningful commit messages
- Add comments for complex logic

#### Component Guidelines
- Use functional components with hooks
- Implement proper TypeScript interfaces
- Follow the existing component structure
- Add proper error handling

#### Testing
- Test components in different screen sizes
- Verify accessibility features
- Test dark/light mode compatibility
- Ensure responsive behavior

### Types of Contributions

#### 🐛 Bug Fixes
- Fix UI/UX issues
- Resolve responsive design problems
- Fix TypeScript errors
- Improve performance

#### ✨ New Features
- Add new resume templates
- Implement AI features
- Create new export formats
- Add internationalization

#### 📚 Documentation
- Improve README
- Add code comments
- Create component documentation
- Write user guides

#### 🎨 Design Improvements
- Enhance UI components
- Improve animations
- Add new themes
- Optimize user experience

### Pull Request Process

1. **Before submitting**
   - Test your changes thoroughly
   - Run `pnpm lint` to check code quality
   - Ensure responsive design works
   - Check both light and dark modes

2. **Submit your PR**
   - Write a clear description of changes
   - Include screenshots for UI changes
   - Reference related issues
   - Add reviewers

3. **After submission**
   - Address review feedback
   - Keep your branch updated
   - Be responsive to comments

### Code Review Guidelines

When reviewing PRs:
- Check for code quality and best practices
- Verify responsive design
- Test accessibility features
- Ensure TypeScript compliance
- Review component architecture

## 📋 Feature Roadmap

- [ ] Backend API integration
- [ ] Real AI integration (OpenAI/GPT)
- [ ] Advanced resume analytics
- [ ] Team collaboration features
- [ ] Mobile app development
- [ ] Additional export formats
- [ ] Resume templates marketplace
- [ ] Multi-language support

## 🐛 Known Issues

- Mock authentication system (replace with real backend)
- Limited AI functionality (uses mock responses)
- No persistent data storage
- Export functionality needs backend integration

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **shadcn/ui** for the excellent component library
- **Radix UI** for accessible primitives
- **Tailwind CSS** for utility-first styling
- **Framer Motion** for smooth animations
- **Next.js** team for the amazing framework

## 📞 Support

- Create an issue on GitHub for bugs
- Start a discussion for feature requests
- Check existing issues before creating new ones

---

**Happy coding! 🚀**

*Built with ❤️ by the AI Resume Platform team*
