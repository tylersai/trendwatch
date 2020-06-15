importScripts("https://storage.googleapis.com/workbox-cdn/releases/5.1.3/workbox-sw.js");

//workbox.setConfig({modulePathPrefix: "workbox-v5.1.3/"});

const precacheManifest = []/*TO_INJECT_HERE*/;

workbox.precaching.precacheAndRoute(precacheManifest);