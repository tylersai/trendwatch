importScripts("https://storage.googleapis.com/workbox-cdn/releases/5.1.3/workbox-sw.js");

//workbox.setConfig({modulePathPrefix: "workbox-v5.1.3/"});

const precacheManifest = []/*TO_INJECT_HERE*/;

workbox.precaching.precacheAndRoute(precacheManifest);

const IMAGE_CACHE_NAME = "tw-images";
const DATA_CACHE_NAME = "tw-data";

// cache response for GET trending movies for a single day with StaleWhileRevalidate
workbox.routing.registerRoute(
  new RegExp('https://api\\.themoviedb\\.org/3/trending/*'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: DATA_CACHE_NAME
  }),
  "GET"
);

// cache response for GET movie/:id with StaleWhileRevalidate
workbox.routing.registerRoute(
  new RegExp('https://api\\.themoviedb\\.org/3/movie/*'),
  // ({url}) => url.pathname.startsWith('/movie'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: DATA_CACHE_NAME
  }),
  "GET"
);

// cache images with cache first strategy
workbox.routing.registerRoute(
  //'https://image.tmdb.org/t/p/w500/*.jpeg',
  new RegExp('https://image\\.tmdb\\.org/t/p/w500/*\\.*'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: IMAGE_CACHE_NAME,
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 60, // max 60 images
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  }),
);
