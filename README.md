# Refr - link shortening serivce

Built with NextJS and hosted on Vercel. A modern and simple link shortener, with support for custom links (shortcodes) and randomly generated urls.

A database MongoDB URI and website URL are required. Place both in a .env file and use the following commands to build and run the application.

For development simply run:

```.zsh
$ npm run dev
```

For production run the following:

```.zsh
$ npm run build
$ npm run start
```

Required .env: A MongoDB connection string and website url.

```.sh
DB_URI=mongodb+srv://user:pass@cluster/db
NEXT_PUBLIC_WEBSITE_URL=https://yourwebsiteurl.com
```
