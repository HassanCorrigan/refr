# Refr - link shortening serivce

![Refr Promo Image](/public/img/opengraph-twitter-card.jpg 'Refr Promo Image')

## Overview

Built with Next.js and hosted on Vercel. A modern and simple link shortener, with support for custom links (shortcodes) and randomly generated shortcodes. Built from the ground up with a custom design and security to protect against malicious URLs.

Also supports Apple's shortcuts app with a custom shortcut you can use to generate links right in iOS. Once you've added the custom shortcut, simply visit a website, click the share button and click Shorten URL.

## Required

**MongoDB URI** - you can use [MongoDB's Cloud Atlas](https://www.mongodb.com/) or host your own local MongoDB instance.

**Google Safe Browsing API Key** - an API for checking if a URL is malicious. Follow the information below to get started.

Google's Safe Browsing API is used to protect against malicious URLs, which requires an API key. You can follow [Google's Safe Browsing API setup guide](https://developers.google.com/safe-browsing) for instructions on how to get your API key and information on how it works.

## Setup

Required:

**1. MongoDB connection string** e.g. mongodb+srv://jane:password@cluster/my-link-db

**2. Database name** e.g. my-link-db

**3. Google Safe Browsing API key** e.g. ahDFUIHqopdfhwuaheldhfdasaada

**4. Website URL** e.g. http://localhost:3000 for development

```.sh
MONGO_URL=<mongodb+srv://user:pass@cluster/db>
DB_NAME=<my-link-db>
NEXT_PUBLIC_GOOGLE_SAFE_BROWSING_API_KEY=<API_KEY>
NEXT_PUBLIC_WEBSITE_URL=<https://yourwebsiteurl.com>

```

## Build and Run

Place all four in a .env file or wherever you currently store them and use the following commands to build and run the application.

For development run:

```.zsh
$ npm run dev
```

For production run:

```.zsh
$ npm run build
$ npm run start
```
