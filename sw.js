const CACHE_NAME = 'ziwei-pwa-v1';
// 需要快取的檔案列表
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon.png' // 記得快取您的 icon
];

// 安裝 Service Worker 並快取檔案
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// 攔截請求，優先使用快取
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // 找到快取，回傳
        }
        return fetch(event.request); // 沒找到快取，向網路發起請求
      })
  );
});

