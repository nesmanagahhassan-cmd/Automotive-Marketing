const CACHE_NAME = 'car-hub-egp-v1';

// الملفات الأساسية للتخزين
const assets = [
  './',
  './index.html',
  'https://cdn.tailwindcss.com'
];

// عند التثبيت
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(assets);
    })
  );
});

// عند طلب أي ملف (هنا يكمن حل مشكلة البيانات)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((res) => {
        // إذا نجح الاتصال بالإنترنت، اعرض البيانات وحدث الكاش
        const resClone = res.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, resClone);
        });
        return res;
      })
      .catch(() => caches.match(event.request)) // إذا فشل الإنترنت، استخدم الكاش
  );
});