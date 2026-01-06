const CACHE_NAME = "kanji-practice-v3-7";
const ASSETS = ["./index.html","./style.css","./app.js","./manifest.json","./sw.js"];
self.addEventListener("install",(event)=>{event.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(ASSETS)));});
self.addEventListener("activate",(event)=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))));});
self.addEventListener("fetch",(event)=>{event.respondWith(caches.match(event.request).then(res=>res||fetch(event.request)));});
