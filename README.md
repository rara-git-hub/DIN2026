# RARA Dining In Night 2026

A responsive Khmer/English invitation with personalized guest links, the RARA biography, and background music.

- Date: 17 December 2026
- Venue: Hyatt Regency Phnom Penh
- Dress: Business Formal
- Arrival time and programme: to be announced
- RSVP: intentionally blank

## Publish

In repository Settings > Pages, choose **GitHub Actions** as the source. The included workflow publishes the `site` directory when changes are pushed to `main`. If the first workflow ran before Pages was enabled, run it again from the Actions tab.

Expected website address after successful publication:
https://rara-git-hub.github.io/DIN2026/

Guest link maker:
https://rara-git-hub.github.io/DIN2026/organizer.html

## Personalize

Open the link maker, enter the guest's name (including honorific) in Khmer or English, optionally add a position, and create a link. Preview the invitation and copy the link.

For a batch, paste one guest per line. Use `Name | Position` for an optional second line. Download the links as CSV.

Names are URL parameters, not confidential guest records or admission credentials. Recipients can edit them. No guest list or RSVP responses are stored on the server.

## Music

The user-supplied track starts after tapping **Open your invitation**. A visible button pauses or resumes it. It loops at 35% volume. Browsers may require an additional tap to start playback.

## Files

- `site/index.html`: invitation content and event details
- `site/style.css`: design and responsive layout
- `site/app.js`: guest names, biography pages, music
- `site/organizer.html` and `site/organizer.js`: single and batch guest links
- `site/rara-2026.ics`: all-day calendar reminder (arrival time is not confirmed)
- `site/assets/`: original crest, alumni photographs, biography pages/PDF, supplied music

The 2024 sample's date, named recipient and programme are not presented as 2026 information. Biography member roles are reproduced as recorded in the supplied document.

## Local preview

Serve the `site` directory with a static web server, or open `site/index.html` directly. Use the hosted link maker for links to share with guests; local previews create local links.

No build tools or external runtime dependencies are required.

## Update the guest list

On the organizer page, choose an updated Excel file under **Import or replace an Excel guest list**. The file is read only on your device. It is not uploaded or committed to GitHub. Select the worksheet if there are several, review the imported names and titles, and create/download new links.

The supplied layout uses column B for name, C for rank, and D for position. Seating cells and host-officer notes are ignored. The planning suffix VVIP is omitted from the invitation salutation. Accompanying-guest placeholders are retained for review. Old status marks are not treated as confirmations for 2026.

Existing sent links keep their embedded name and title. After correcting a name or title, send a newly generated link. General event-page updates apply to every link.

Spreadsheet import uses a vendored SheetJS Community Edition 0.20.3 reader; see `site/vendor/SheetJS-LICENSE.txt`.
