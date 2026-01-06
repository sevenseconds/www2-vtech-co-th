# Content Management Guide for CoLabs Website

This guide will help you manage and publish content on the CoLabs website using Decap CMS.

## Accessing the CMS

1. **Navigate to the admin panel**: Visit `https://your-site-url/admin`
2. **Authenticate**: Sign in using your GitHub account (you must be a collaborator on the repository)
3. **Start managing content!**

##  Creating and Publishing Content

### Blog Posts

1. Click **"Blog Posts"** in the left sidebar
2. Click **"New Blog Post"**
3. Fill in the required fields:
   - **Title**: The headline of your blog post
   - **Description**: A brief summary (shown in previews)
   - **Publish Date**: When the post should appear as published
   - **Author**: Your name or "Admin"
   - **Featured Image**: Upload an image (optional but recommended)
   - **Tags**: Add relevant keywords for the post
   - **Body**: Write your full article using the markdown editor
4. Click **"Publish"** → **"Publish now"**

> **Note**: Changes trigger an automatic build and deployment (~3-5 minutes)

### Services

1. Click **"Services"** in the left sidebar
2. Click **"New Service"**
3. Fill in the fields:
   - **Title**: Service name (e.g., "Blood Testing")
   - **Description**: Brief description of the service
   - **Icon**: Use an emoji that represents the service (e.g., 🔬, 🩸, 🧬)
   - **Display Order**: Number to control the order services appear (lower numbers first)
   - **Content**: Detailed information about the service
4. Click **"Publish"**

### Products

1. Click **"Products"** in the left sidebar
2. Click **"New Product"**
3. Fill in the required information:
   - **Product Name**: Full name of the product
   - **SKU**: Product code/identifier
   - **Price**: Numeric value (don't include $ symbol)
   - **Description**: Brief product description
   - **Category**: Type of product (e.g., "Microscopes", "Centrifuges")
   - **Images**: Upload product photos (can add multiple)
   - **Featured Product**: Toggle if this should be highlighted
   - **In Stock**: Toggle availability status
   - **Details**: Full product specifications and features
4. Click **"Publish"**

### Team Members

1. Click **"Team Members"** in the left sidebar
2. Click **"New Team Member"**
3. Fill in:
   - **Name**: Full name
   - **Role/Position**: Job title
   - **Photo**: Upload a professional photo
   - **Bio**: Short description (1-2 sentences)
   - **LinkedIn URL**: Full LinkedIn profile URL (optional)
   - **Twitter URL**: Full Twitter profile URL (optional)
   - **Display Order**: Control the order team members appear
   - **Full Biography**: Detailed background and expertise
4. Click **"Publish"**

### Projects

1. Click **"Projects"** in the left sidebar
2. Click **"New Project"**
3. Fill in:
   - **Title**: Project name
   - **Description**: Brief overview
   - **Category**: Project type (e.g., "Healthcare", "Research")
   - **Images**: Upload project images
   - **Date Completed**: Project completion date
   - **Featured Project**: Toggle if this should be highlighted
   - **Project Details**: Full case study with results
4. Click **"Publish"**

## Editing Existing Content

1. Navigate to the content type (Blog Posts, Services, etc.)
2. Click on the item you want to edit
3. Make your changes
4. Click **"Publish"** → **"Publish now"**

##  Deleting Content

1. Open the content item you want to delete
2. Click the **"Delete"** button (usually in the top right)
3. Confirm the deletion

> **Warning**: Deletion is permanent!

## 📸 Working with Images

### Uploading Images

- Click the image upload button in any image field
- Select an image from your computer
- Images are automatically optimized and stored in `/public/images/`

### Best Practices

- **Blog featured images**: 1200x630px or similar aspect ratio
- **Product photos**: Square format (1:1 ratio) works best
- **Team photos**: Headshots, preferably square 800x800px
- **File size**: Keep images under 1MB when possible

## ✍️ Markdown Formatting Tips

The Body/Content fields use Markdown. Here are some common formatting options:

### Headings
```markdown
## Heading Level 2
### Heading Level 3
```

### Bold and Italic
```markdown
**bold text**
*italic text*
```

### Lists
```markdown
- Bullet point 1
- Bullet point 2

1. Numbered item 1
2. Numbered item 2
```

### Links
```markdown
[Link text](https://example.com)
```

### Images (in markdown content)
```markdown
![Image description](/images/your-image.jpg)
```

## 🚀 Understanding the Publishing Workflow

1. **Create/Edit Content**: Make changes in the CMS
2. **Publish**: Click the publish button
3. **GitHub Commit**: Decap CMS commits your changes to GitHub
4. **Build Trigger**: GitHub Actions detects the commit
5. **Build Site**: Astro builds the static site (~1-2 minutes)
6. **Deploy**: Cloudflare Pages deploys the new version (~1-2 minutes)
7. **Live!**: Your changes are visible on the website

**Total time**: Usually 3-5 minutes from publish to live

## 💡 Tips and Best Practices

### Content Strategy

- **Blog Posts**: Aim for 800-1500 words for better SEO
- **Images**: Always include featured images for blog posts
- **Tags**: Use 3-5 relevant tags per blog post
- **Consistency**: Publish blog content regularly (weekly or bi-weekly)

### SEO Optimization

- Write descriptive titles (50-60 characters)
- Create compelling descriptions (150-160 characters)
- Use keywords naturally in your content
- Include alt text for images

### Quality Control

- Proofread content before publishing
- Test links to ensure they work
- Preview content if possible before final publish
- Check that images display correctly

## ⚠️ Troubleshooting

###  Changes not appearing?

1. Check if the deployment completed (visit GitHub Actions tab in your repo)
2. Clear your browser cache (Ctrl+F5 or Cmd+Shift+R)
3. Wait a few minutes - deployments can take 3-5 minutes

### Can't log in?

- Ensure you're using the correct GitHub account
- Verify you're a collaborator on the repository
- Check that you're using HTTPS (not HTTP)

### Upload failed?

- Check image file size (should be under 10MB)
- Ensure the image format is supported (JPG, PNG, GIF, WebP)
- Try a different image

## 📞 Getting Help

If you encounter issues:

1. Check the [Main README](./README.md) for technical details
2. Review GitHub Actions logs for build errors
3. Contact your technical administrator
4.  Open an issue on GitHub

## 🎯 Quick Checklist for Publishing

- [ ] Content is proofread and error-free
- [ ] Images are uploaded and displaying correctly
- [ ] Links are tested and working
- [ ] Metadata (title, description, tags) is filled in
- [ ] Content follows brand guidelines
- [ ] SEO best practices applied
- [ ] Ready to publish!

---

**Happy Publishing!** 🎉

Remember: All content is version-controlled in Git, so you can always revert changes if needed.
