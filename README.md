# MaxStream Discover

A mobile-first movie and TV-series discovery web app. This project is a legal discovery interface—not a movie host or an unauthorized streaming-link extractor.

## Features

- Responsive dark streaming-style interface for phones and desktops
- Trending movie and TV metadata from TMDB when you add your own API Read Access Token
- Demo mode without an API token
- Search titles and browse movie/series categories
- Genre filters, ratings, synopsis, release year and cast details
- Browser-local watchlist
- Official trailer links and TMDB "Where to watch" links
- Streaming provider availability where TMDB provides it for India
- No Firebase or database key is required for the discovery demo

## Run on GitHub Pages

1. Open the repository's **Settings → Pages**.
2. Select **Deploy from a branch**.
3. Choose **main** and **/(root)**, then save.
4. Open the published Pages URL after GitHub finishes deploying.

You can also open `index.html` directly in a browser. Internet access is needed for external images and live TMDB requests.

## Enable live movie data

1. Create your own TMDB account and request an API Read Access Token from TMDB settings.
2. Open the app and choose **Settings**.
3. Paste your token and press **Save & load live data**.

The app sends the token from your browser to TMDB's API. In this static client-side app, any token you enter can be accessed by someone who has access to your browser or can inspect the page's network requests. Do not enter private server credentials, Firebase Admin keys, service-account JSON, or other server secrets. For a public production app, proxy API requests through a backend and apply suitable restrictions.

## Data and privacy

- Watchlist and the token are saved in the current browser's local storage; they are not shared or synchronized across users.
- Removing browser storage will remove the saved watchlist and token.
- This repository does not include a Firebase project or shared database.
- The sample/demo titles are illustrative only.

## Streaming and copyright

This app discovers titles and links to official trailers and TMDB viewing information. It does not host copyrighted movies, extract streams from third-party sites, or bypass subscriptions. Availability depends on region and provider.

## Credits

Movie metadata, artwork and provider information are supplied by [The Movie Database (TMDB)](https://www.themoviedb.org/). This product uses the TMDB API but is not endorsed or certified by TMDB. See TMDB's terms and attribution requirements before public release.

## Current limitations

- No user accounts or cross-device sync
- No shared cloud database or admin panel
- No APK build; this repository currently contains a static web app
- Live content requires your own TMDB token and a network connection
- This is a starter project and should be tested before public launch
