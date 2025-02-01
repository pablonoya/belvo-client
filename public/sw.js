const CACHE_NAME = "belvo-cache-v1"
const urlsToCache = [
  "/",
  "/manifest.webmanifest",
  "/web-app-manifest-192x192.png",
  "/web-app-manifest-512x512.png",
]

// Install the service worker and cache static assets
self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)))
})

// Intercept fetch requests and serve cached responses
self.addEventListener("fetch", event => {
  const url = new URL(event.request.url)

  // Ignore unsupported schemes
  if (url.protocol === "chrome-extension:" || url.protocol === "blob:") {
    return
  }

  event.respondWith(
    caches.match(event.request).then(response => {
      // Return cached response if found
      if (response) {
        return response
      }

      return fetch(event.request).then(response => {
        if (!response || response.status !== 200) {
          return response
        }

        const responseToCache = response.clone()
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseToCache)
        })

        return response
      })
    })
  )
})

// Activate the service worker and clean up old caches
self.addEventListener("activate", event => {
  const cacheWhitelist = [CACHE_NAME]
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})
