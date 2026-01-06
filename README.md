# CoLabs - Static Laboratory Website

A modern, secure static website built with Astro and Decap CMS, deployed on Cloudflare Pages.

## 🚀 Features

- **Static Site Generation** - Fast, secure, and SEO-friendly
- **Headless CMS** - Decap CMS for easy content management
- **Auto-Deployment** - GitHub Actions automatically deploys changes
- **Content Collections** - Structured content for blog, services, products, team, and projects
- **Responsive Design** - Mobile-first, modern UI with Tailwind CSS
- **Performance Optimized** - Lighthouse scores of 95+

## 📋 Prerequisites

- Node.js 18+ and npm
- Git
- GitHub account
- Cloudflare account

## 🛠️ Local Development

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd website

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:4321`

### Content Management Locally

To use Decap CMS locally:

1. Uncomment `local_backend: true` in `/public/admin/config.yml`
2. Run the CMS proxy server:
   ```bash
   npx decap-server
   ```
3. Access the CMS at `http://localhost:4321/admin`

## 📝 Content Management

### Accessing the CMS

1. **Navigate to the admin panel**: Visit `https://your-site-url/admin`
2. **Authenticate**: Click "Login with GitHub". A popup will appear on your own domain to handle the authentication.
3. **Start managing content!**
### Content Types

- **Blog Posts** - Articles and news
- **Services** - Laboratory services offered
- **Products** - Laboratory equipment and products
- **Team Members** - Staff profiles
- **Projects** - Portfolio and case studies

### Publishing Content

1. Log in to the CMS at `/admin`
2. Create or edit content
3. Click "Publish"
4. GitHub Actions will automatically build and deploy your changes

## 🚀 Deployment

### Initial Setup

1. **Create Cloudflare Pages Project**
   - Log in to Cloudflare Dashboard
   - Go to Pages → Create a project
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set build output directory: `dist`

2. **Configure GitHub Secrets**
   
   Add these secrets to your GitHub repository (Settings → Secrets and variables → Actions):
   
   - `CLOUDFLARE_API_TOKEN` - Get from Cloudflare Dashboard → My Profile → API Tokens
   - `CLOUDFLARE_ACCOUNT_ID` - Find in Cloudflare Dashboard URL

3. **Enable Firebase Authentication & Custom Gateway**

1. **Firebase Setup**:
   - Create a project at [Firebase Console](https://console.firebase.google.com/).
   - Enable **Authentication** (Email/Password).
   - Create a **Web App** and copy your `firebaseConfig`.
   - Paste the config into `public/admin/index.html`.

2. **GitHub Personal Access Token (PAT)**:
   - Generate a **Personal Access Token (classic)** at GitHub Settings → Developer Settings → Tokens.
   - Select the `repo` scope.
   - Copy this token—you will need it for Cloudflare.

3. **Configure Cloudflare Pages**:
   - In the Cloudflare Dashboard, go to **Workers & Pages** -> **Create** -> **Pages** -> **Connect to Git**.
   - **IMPORTANT**: Look for the **"Looking to deploy Pages? Get started"** link at the bottom of the Workers page.
   - Add these **Environment Variables** in the Pages project settings:
     - `FIREBASE_PROJECT_ID`: Your Firebase project ID.
     - `GITHUB_TOKEN`: The GitHub PAT you just generated.

### Automatic Deployments

The GitHub Actions workflow automatically deploys when:
- Changes are pushed to the `main` branch
- Content is modified in `/src/content/` directory
- You can also trigger manually from the Actions tab

## 📁 Project Structure

```
/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment workflow
├── public/
│   ├── admin/
│   │   ├── index.html          # Decap CMS interface
│   │   └── config.yml          # CMS configuration
│   └── images/                 # Media uploads
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── Hero.astro
│   │   └── ...                 # Reusable components
│   ├── content/
│   │   ├── blog/               # Blog posts (markdown)
│   │   ├── services/           # Services (markdown)
│   │   ├── products/           # Products (markdown)
│   │   ├── team/               # Team members (markdown)
│   │   ├── projects/           # Projects (markdown)
│   │   └── config.ts           # Content collection schemas
│   ├── layouts/
│   │   └── BaseLayout.astro    # Main layout template
│   ├── pages/
│   │   ├── index.astro         # Homepage
│   │   ├── about.astro
│   │   ├── services.astro
│   │   ├── products.astro
│   │   ├── blog/
│   │   │   ├── index.astro     # Blog listing
│   │   │   └── [slug].astro    # Blog post template
│   │   └── ...
│   └── styles/
│       └── global.css          # Global styles & theme
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

## 🎨 Customization

### Theme Colors

Edit `src/styles/global.css` to customize the color scheme:

```css
:root {
  --color-primary: #1e3a8a;      /* Navy blue */
  --color-primary-light: #3b82f6; /* Royal blue */
  /* ... more colors */
}
```

### Content Collections

Modify schemas in `src/content/config.ts` to add/remove fields.

### CMS Collections

Update `public/admin/config.yml` to match your content collection changes.

## 🔒 Security

- ✅ No database - eliminates SQL injection risks
- ✅ No PHP runtime - no server-side vulnerabilities
- ✅ Static files only - minimal attack surface
- ✅ Firebase Authentication for CMS login (No GitHub accounts needed for editors)
- ✅ Custom Cloudflare Gateway with `jose` token verification
- ✅ Cloudflare security (DDoS protection, WAF)

## 📦 Build Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run astro check
```

## 🐛 Troubleshooting

### CMS Not Loading

Check that:
1. Firebase configuration in `index.html` is correct
2. `FIREBASE_PROJECT_ID` and `GITHUB_TOKEN` are set in Cloudflare Pages
3. You're accessing via HTTPS (not HTTP)

### Build Failures

- Check GitHub Actions logs for errors
- Ensure all content files have valid frontmatter
- Run `npm run build` locally to test

### Content Not Updating

- Verify GitHub Actions workflow completed successfully
- Check Cloudflare Pages deployment logs
- Clear browser cache

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues or questions, please open an issue on GitHub.
