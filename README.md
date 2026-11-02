# 🪔 Royal North Indian Digital Wedding Invitation (Revision 2)

A cinematic, interactive, and mobile-first digital wedding invitation website built with **React 18**, **TypeScript**, **Vite**, **Tailwind CSS**, **Framer Motion**, and **MongoDB**.

Tailored for Sudha Singh and Tanuj Singh (R.P.), with original couple photographs, a click-to-open wedding seal, scroll-linked portraits, a live countdown, the Haldi → Mehendi → Wedding → Vidai itinerary, venue maps, WhatsApp-enabled RSVP, visitor analytics, and floating heart animations.

---

## ✨ Features & Revision 2 Updates

1. **Section 1: Redesigned Fullscreen Temple Gate Entrance**
   - Occupies the entire viewport (`100vw × 100vh`) with zero margins, unwanted scrolling, or partial backgrounds.
   - Remains on the entrance screen until the guest taps the temple gate.
   - Cinematic sequence:
     1. Traditional North Indian wedding backdrop & golden aura.
     2. Sacred Ganesh invocation: *॥ श्री गणेशाय नमः ॥*.
     3. Groom's name (*Tanuj*) animated into view.
     4. Decorative gold ampersand (*&*).
     5. Bride's name (*Sudha*) animated into view.
     6. Elegant wedding invitation message.
     7. Wedding date (*Wednesday, 25th November 2026*).
     8. Original portrait medallions, floral garlands, golden thread, and a clickable heart seal.
     9. Glowing instruction: *"Tap the heart to open"*.
   - Tapping the heart rotates both medallions outward in 3D, bursts confetti, and smoothly reveals the main website.

2. **Section 2: Main Wedding Invitation**
   - Lord Ganesha aura and sacred mantra.
   - Handcrafted North Indian Mandap illustration with floral festoons and sacred Agni Havan Kund.
   - Auspicious wedding date and Shubh Vivah Muhurat badge.

3. **Section 3: Scroll-Linked Couple Animation**
   - Circular framed photographs of the Groom and Bride.
   - **Initial state**: Groom positioned towards the left edge, Bride positioned towards the right edge, both with slight blur and reduced opacity.
   - **As the guest scrolls down**: Groom moves from left to center, Bride moves from right to center, both become sharp and fully visible, and a decorative golden heart appears between them as they meet!
   - Responsive with zero horizontal overflow on mobile devices.
   - Displays Groom's name, Bride's name, and respective parents' names below.

4. **Section 4: Sacred Invitation Message**
   - Sanskrit Mangalacharan Shloka with English translation.
   - Family names and home addresses for both sides.

5. **Section 5: Streamlined 4-Event Itinerary**
   - Event dates: **Haldi** (23 November), **Mehendi** (24 November), **Wedding** (25 November), and **Vidai** (26 November 2026).
   - Each card contains only: Event name, date, time, venue, short description, and decorative icon.

6. **Section 6: Venue & Location**
   - Shiddhivinayak Marriage Hall, Thekma.
   - Includes an original couple photograph, venue address, Google Maps embed, and directions.

7. **Section 7: Live Wedding Countdown**
   - Live Days, Hours, Minutes, Seconds countdown updating live every second.

8. **Section 8: Minimal 4-Field RSVP (Saved in MongoDB)**
   - Only 4 fields:
     1. **Your Name** (Text input, Required)
     2. **Your WhatsApp Number** (Telephone input, Required, Validated)
     3. **Attendance Confirmation** (*Fully attending* or *Regretfully unable to attend*)
     4. **Button**: `"CONFIRM MY RSVP"`
   - Saves to MongoDB collection `rsvps`. Handles duplicate submissions by phone number cleanly.

9. **Section 9: Guest Placement & Visitor Tracking (MongoDB)**
   - Session-based visitor tracking storing `{ sessionId, firstVisit, lastVisit, visitCount }` in MongoDB collection `visitors`.
   - Avoids inflating counts on re-renders/refreshes.
   - Discreet live guest counter in the navigation bar.

10. **Section 10: Click/Touch Floating Heart Animation**
    - Clicking or tapping anywhere on the website spawns a floating heart at the cursor/touch coordinate.
    - Floats upward, scales up, and fades smoothly out.
    - Lightweight, non-intrusive (`pointer-events-none`).

11. **Section 11: Final Invitation & Instant Sharing**
    - Pre-formatted WhatsApp invitation message generator with website URL.
    - Live dynamic QR code using `qrcode.react`.
    - One-click copy link.

---

## 🗄️ MongoDB Configuration

1. Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a database user and allow your IP address (or `0.0.0.0/0` for cloud deployment).
3. Copy your MongoDB connection string.
4. Copy `.env.example` to `.env` in the project root and fill in your Atlas URI. URL-encode special characters in the password (for example, `@` as `%40`).
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority
   MONGODB_DB_NAME=wedding_invitation
   ```
5. The application will automatically create and use two collections:
   - `visitors`: Session-based visitor tracking.
   - `rsvps`: Guest name, WhatsApp number, attendance status, and timestamp.
The Express backend requires a valid MongoDB URI and exits with an error if it cannot connect. The Vercel API functions use the same collections and require `MONGODB_URI` and `MONGODB_DB_NAME` to be configured in the deployment environment.

The RSVP form submits `name`, `whatsapp`, and `attendance` (`attending` or `unable`) to `POST /api/rsvp`. Submitting again with the same WhatsApp number updates that guest's response.

---

## 🚀 Running the Project

```bash
# 1. Install dependencies
npm install

# 2. In one terminal, run the Express/MongoDB backend
npm run dev:backend

# 3. In a second terminal, run the Vite frontend
npm run dev

# 4. Check backend health at http://localhost:5000/api/health

# 5. Production frontend build
npm run build
```
Local URL: **http://localhost:5173/**
Mobile / Network URL: **http://<your-local-ip>:5173/**
Backend URL: **http://localhost:5000/**
