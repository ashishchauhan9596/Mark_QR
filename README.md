# MarkQR

MarkQR is a responsive business QR code generator built with Vite. Enter a website URL or message, customize the QR colors, and download a print-ready PNG.

## Features

- Live QR code generation in the browser
- Website URL or text-message support
- High-resolution 1080 x 1080 PNG downloads
- Maximum QR error correction by default
- Custom QR foreground and background colors
- Responsive layouts for desktop, tablet, and mobile
- Optional business identity controls
- MarkQR favicon and brand assets
- No server or database required

## Requirements

- Node.js 18 or newer
- pnpm

## Run Locally

```bash
pnpm install
pnpm dev
```

Open the local URL shown by Vite, usually:

```text
http://localhost:5173/
```

## Use the Generator

1. Enter a complete website URL, such as `https://yourbusiness.com`.
2. Add a message or other content if needed.
3. Customize the QR colors and protection settings.
4. Download the generated PNG.
5. Scan the PNG with a phone to open the URL entered in the content field.

The URL is encoded directly into the QR code. The favicon and brand logo do not control the QR destination.

## Production Build

Create an optimized production build:

```bash
pnpm build
```

Preview the production build locally:

```bash
pnpm preview
```

## Project Structure

```text
index.html              Main application page
src/main.js             QR generation and UI behavior
src/style.css           Responsive application styles
public/markqr-logo.svg  MarkQR wordmark asset
public/markqr-favicon.svg Browser favicon asset
```

## Notes

- QR generation happens locally in the browser.
- Uploaded files are not sent to a server.
- The generated QR output is kept clean without an embedded center logo for maximum scan reliability.