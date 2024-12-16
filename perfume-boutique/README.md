# "LUMYRA Luxury Perfumes - Slider Images
This directory contains high-resolution images for the luxury perfume slider.

Image Sourcing Guidelines:
- Minimum Resolution: 1600x800 pixels
- Professional, high-quality images
- Consistent aesthetic

# Unsplash Image Download Function
function Download-Image {
    param(
        [string]$Url,
        [string]$OutputPath
    )
    
    try {
        Invoke-WebRequest -Uri $Url -OutFile $OutputPath
        Write-Host "Downloaded: $OutputPath"
    }
    catch {
        Write-Host "Failed to download image from $Url"
    }
}

# Image URLs (Unsplash)
$images = @{
    "chanel-no5" = "https://images.unsplash.com/photo-1622273490738-cded4e2f4b0f?q=80&w=1600&h=800&fit=crop"
    "dior-sauvage" = "https://images.unsplash.com/photo-1617775047746-8a1e33ac40b8?q=80&w=1600&h=800&fit=crop"
    "tom-ford-noir" = "https://images.unsplash.com/photo-1617478255419-4f80bb620c54?q=80&w=1600&h=800&fit=crop"
    "ysl-black-opium" = "https://images.unsplash.com/photo-1615228402326-7adf9a257f2b?q=80&w=1600&h=800&fit=crop"
    "creed-aventus" = "https://images.unsplash.com/photo-1622225676612-a1dc21c9246d?q=80&w=1600&h=800&fit=crop"
    "gucci-bloom" = "https://images.unsplash.com/photo-1622225548026-8a5cf4ea5ed4?q=80&w=1600&h=800&fit=crop"
    "versace-eros" = "https://images.unsplash.com/photo-1622225562338-4b32961b2c78?q=80&w=1600&h=800&fit=crop"
    "jo-malone-peony" = "https://images.unsplash.com/photo-1622225601259-1cca6c0127e0?q=80&w=1600&h=800&fit=crop"
}

# Download Images
foreach ($brand in $images.Keys) {
    $outputPath = Join-Path -Path $sliderPath -ChildPath "$brand.jpg"
    Download-Image -Url $images[$brand] -OutputPath $outputPath
}

Write-Host "Image download complete!"# Perfume Boutique - Multilingual E-commerce Website

A professional e-commerce platform for luxury perfumes supporting Arabic, French, and English languages.

## Features

- Multilingual support (Arabic, French, English)
- Responsive design with elegant color scheme
- Product catalog with detailed descriptions
- User authentication and accounts
- Shopping cart and secure checkout
- Order tracking
- Customer reviews
- Blog section
- Contact form and FAQ

## Technical Stack

- Frontend: React.js
- Styling: SCSS/CSS Modules
- State Management: Redux
- Internationalization: i18next
- Payment Processing: Stripe
- Backend: Node.js/Express
- Database: MongoDB
- Hosting: AWS/Vercel

## Setup Instructions

1. Install Node.js from https://nodejs.org/
2. Clone this repository
3. Install dependencies: `npm install`
4. Start development server: `npm start`

## Environment Setup

Before running the application, make sure to:
1. Set up environment variables
2. Configure database connection
3. Set up SSL certificate
4. Configure payment gateway

## Image Sourcing Guide

### Image Acquisition Strategy

#### Recommended Sources
1. Royalty-Free Stock Image Platforms
   - Unsplash (https://unsplash.com)
   - Pexels (https://www.pexels.com)
   - Pixabay (https://pixabay.com)

2. Professional Stock Photo Websites
   - Shutterstock
   - Getty Images
   - Adobe Stock

#### Image Selection Criteria
- Minimum Resolution: 1600x800 pixels
- Professional lighting
- Clear product focus
- Luxurious aesthetic
- High contrast
- Consistent color palette

#### Recommended Image Types
1. Product Close-ups
2. Lifestyle/Mood Shots
3. Elegant Backgrounds
4. Artistic Compositions

#### Legal Considerations
- Always check and comply with licensing terms
- Obtain necessary permissions
- Credit image sources when required
- Avoid copyright infringement

#### Recommended Perfume Image Themes
- Chanel No. 5: Timeless elegance, soft lighting
- Dior Sauvage: Masculine, intense setting
- Tom Ford Noir: Mysterious, dark tones
- YSL Black Opium: Sensual, warm colors
- Creed Aventus: Professional, sharp composition
- Gucci Bloom: Romantic, floral backdrop
- Versace Eros: Bold, passionate imagery
- Jo Malone Peony: Delicate, minimalist style

### Image Preparation Steps
1. Download high-resolution images
2. Resize to 1600x800 pixels
3. Compress for web performance
4. Convert to WebP format
5. Optimize for responsive design

### Recommended Tools
- GIMP (Free image editing)
- Photoshop
- Squoosh.app (Online image optimization)
- ImageOptim (Mac)
- FileOptimizer (Windows)

### Next Steps
1. Source images from recommended platforms
2. Prepare and optimize images
3. Replace placeholder images in slider
4. Test responsive design and performance

## Contributing

Please read CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details
