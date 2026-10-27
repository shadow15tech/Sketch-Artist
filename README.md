# Artistry — Sketch Artist Portfolio

A light, spacious, responsive portfolio starter made with HTML, CSS, and vanilla JavaScript. It uses modest reveal animations, a mobile navigation menu, filterable portfolio categories, SVG artwork placeholders, and a replaceable hero portrait.

## Run locally

Open `index.html` in a browser. For a local server, you can run `python -m http.server` inside this folder.

## Replace the hero image

1. Add the artist's image inside `assets/` (for example `artist-photo.jpg`).
2. In `index.html`, find the image inside `.hero-art-frame` and change:
   ```html
   <img class="hero-art" src="assets/artist-hero.svg" alt="Illustrated placeholder portrait for the artist">
   ```
   to:
   ```html
   <img class="hero-art" src="assets/artist-photo.jpg" alt="Portrait of [Artist Name]">
   ```
3. Update the About image too if the artist has a suitable second photo.

## Replace sample artwork

Replace the SVG files in `assets/artworks/` with real artwork images, then update each matching `src` in `index.html`. Keep the `alt` text descriptive. SVG placeholders are included so the gallery does not show broken images before the real portfolio is added.

## Customize before launch

- Change `ARTISTRY`, the artist bio, service descriptions, and artwork titles in `index.html`.
- Replace `hello@artiststudio.com` with the artist's real email address.
- If using a WhatsApp CTA, replace the email button with a `https://wa.me/` link that includes the correct country code and number.
- The contact button currently opens an email draft; it is not a backend-powered form.

## Included features

- Responsive desktop, tablet, and mobile layouts
- Accessible mobile menu with Escape/outside-click closing
- Working portfolio category filter
- Gentle scroll reveals and reduced-motion support
- Active navigation state while scrolling
- Local SVG placeholders; no image CDN dependency
