const CACHE_NAME = "GameOn-1.0";
var urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/icon.png",
  "/image/cyberpunk.jpg",
  "/image/ac_valhalla.jpg",
  "/image/tlou2.jpg",
  "/image/ragil.jpg",
  "/pages/home.html",
  "/pages/about.html",
  "/pages/contact.html",
  "/pages/categories.html",
  "/css/materialize.min.css",
  "/css/style.css",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/manifest.json"
];
 
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function(event) {
    event.respondWith(
      caches
        .match(event.request, { cacheName: CACHE_NAME })
        .then(function(response) {
          if (response) {
            console.log("ServiceWorker: Use assets from cache: ", response.url);
            return response;
          }
          console.log(
            "ServiceWorker: loading assets from server: ",
            event.request.url
          );
          return fetch(event.request);
        })
    );
});

self.addEventListener("activate", function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheName != CACHE_NAME) {
              console.log("ServiceWorker: cache " + cacheName + " dihapus");
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
});
