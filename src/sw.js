importScripts("https://storage.googleapis.com/workbox-cdn/releases/5.1.3/workbox-sw.js");

//workbox.setConfig({modulePathPrefix: "workbox-v5.1.3/"});

const precacheManifest = [];

workbox.precaching.precacheAndRoute(precacheManifest);