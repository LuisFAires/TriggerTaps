const currentCache = "v1"

const offlineFallbackFiles = [
    location.origin,
    "/sound/countdown.mp3",
    "/sound/gunfire.mp3",
    "/PixelOperator-Bold.ttf",
    "/img/sprites.webp",
    "/img/CowBoyShoot.gif",
    "/unavailable/"
]

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(currentCache)
            .then((cache) => {
                return cache.addAll(offlineFallbackFiles)
            })
    )
})

this.addEventListener("activate", (event) => {
    event.waitUntil(
      caches.keys().then((keyList) =>
        Promise.all(
          keyList.map((key) => {
            if (![currentCache].includes(key)) {
              return caches.delete(key);
            }
          })
        )
      )
    );
  });

self.addEventListener("message", (event) => {
    if (event.data && event.data.type === "SKIP_WAITING") {
      self.skipWaiting();
    }
  });

//Intercepts every fetch event
self.addEventListener('fetch', (event) => {
    event.respondWith(
        //Tries toget the resouce
        fetch(event.request).then(
            //If the resource is downloaded sucessfully put into cache and resolves the first fetch with it
            (res) => {
                if(event.request.method == "GET" && res.status == "200"){
                    caches.open(currentCache).then(function(cache) {
                        cache.put(event.request, res)
                    })
                }
                return res.clone()
            }, 
            //If its unable to get the resource show the unvailable page
            () => {
                return caches.match(event.request).then((res) =>{
                    return (res || caches.match('/unavailble'))
                })
            }
        )
    )
})