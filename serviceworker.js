const cacheName = "v1"

const resourcesToCache = [
    location.origin,
    "/sound/countdown.mp3",
    "/sound/gunfire.mp3",
    "/PixelOperator-Bold.ttf",
    "/img/sprites.webp",
    "/img/CowBoyShoot.gif",
    "/unavailable.php"
]

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(cacheName)
            .then((cache) => {
                return cache.addAll(resourcesToCache)
            })
    )
})

self.addEventListener('fetch', function(event) {
    event.respondWith(
        fetch(event.request).then(function(res){
            if(event.request.method == "GET" && res.status == "200"){
                caches.open(cacheName).then(function(cache) {
                    cache.put(event.request, res)
                })
            }
            return res.clone()
            }, function(err){
                return caches.match(event.request).then((res) =>{
                    return (res || caches.match('/unavailable.php'))
                })
            })
        )
})