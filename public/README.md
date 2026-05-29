# /public — Static Assets

## Directory Structure

```
public/
├── icons/
│   ├── logo.svg              # NoOps wordmark + glyph (full)
│   ├── logo-mark.svg         # Icon-only glyph (for favicon, small spaces)
│   ├── favicon.ico           # 32×32 favicon
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── apple-touch-icon.png  # 180×180
│   └── social/
│       ├── github.svg
│       ├── linkedin.svg
│       └── twitter.svg
├── images/
│   ├── og-image.png          # 1200×630 Open Graph image
│   └── trusted-by/           # Grayscale company logo marks (social proof strip)
│       ├── company-1.svg
│       ├── company-2.svg
│       ├── company-3.svg
│       ├── company-4.svg
│       └── company-5.svg
├── fonts/                    # (empty — fonts loaded via next/font/google)
└── robots.txt
```

## Notes
- All SVGs should be optimised with SVGO before committing
- Trusted-by logos: monochrome, exported at 120×40px viewBox
- OG image: use the brand gradient + logo mark on dark background
- Favicon generated from logo-mark.svg via https://realfavicongenerator.net
