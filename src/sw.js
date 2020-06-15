const { API_END_POINT } = require("./utils/constant");

importScripts("https://storage.googleapis.com/workbox-cdn/releases/5.1.3/workbox-sw.js");

//workbox.setConfig({modulePathPrefix: "workbox-v5.1.3/"});

const precacheManifest = []/*TO_INJECT_HERE*/;

workbox.precaching.precacheAndRoute(precacheManifest);

const IMAGE_CACHE_NAME = "tw-images";
const DATA_CACHE_NAME = "tw-data";

// cache images with cache first strategy
workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  new workbox.strategies.CacheFirst({
    cacheName: IMAGE_CACHE_NAME,
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 60, // max 60 images
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  }),
);

// cache response for GET trending movies or movie/:id for a single day with StaleWhileRevalidate
workbox.routing.registerRoute(
  ({url}) => url.pathname.startsWith(`${API_END_POINT}/trending`) || url.pathname.startsWith(`${API_END_POINT}/movie`),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: DATA_CACHE_NAME
  }),
  "GET"
);