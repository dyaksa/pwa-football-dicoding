importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
if(workbox){
	console.log("workbox telah di load yeay!");
}else{
	console.log("workbox tidak bisa di load huhu!");
}

workbox.precaching.precacheAndRoute([
	{url: "/manifest.json", revision: "1"},
	{url: "/standings.js", revision: "1"},
	{url: "/team.js", revision: "1"},
	{url: "/asset/js/api.js", revision: "1"},
	{url: "/asset/js/data-source.js", revision: "1"},
	{url: "/asset/js/data-source.js", revision: "1"},
	{url: "/asset/js/db.js", revision: "1"},
	{url: "/asset/js/nav.js", revision: "1"},
	{url: "/asset/js/script.js", revision: "1"},
	{url: "/asset/js/push-manager.js", revision: "1"},
	{url: "/asset/js/request-permission.js",revision: "1"},
	{url: "/", revision: "1"},
	{url: "/index.html", revision: "1"},
	{url: "/nav.html", revision: "1"},
	{url: "/standings.html", revision: "1"},
	{url: "/team.html", revision: "1"},
	{url: "/main.js", revision : "1"},
	{url: "/asset/vendors/css/materialize.min.css", revision: "1"},
	{url: "/asset/vendors/js/materialize.min.js", revision: "1"},
	{url: "/asset/vendors/js/idb.js", revision: "1"},
	{url: "/asset/css/style.css", revision: "1"}
],{
	ignoreUrlParametersMatching: [/.*/]
});

workbox.routing.registerRoute(
	new RegExp("/pages/"),
	workbox.strategies.staleWhileRevalidate({
		cacheName: "pages"
	})
);

workbox.routing.registerRoute(
	/\.(?:png|gif|jpg|jpeg|svg)$/,
	workbox.strategies.cacheFirst({
		cacheName: "img"
	})
);

workbox.routing.registerRoute(
	new RegExp("https://api.football-data.org/v2/"),
	workbox.strategies.staleWhileRevalidate({
		cacheName: "apifootball",
		networkTimeoutSeconds: 5
	})
);

workbox.routing.registerRoute(
	/^https:\/\/fonts\.googleapis\.com/,
	workbox.strategies.staleWhileRevalidate({
		cacheName: "google-fonts",
		plugins: [
      		new workbox.cacheableResponse.Plugin({
        	statuses: [0, 200],
      	}),
      	new workbox.expiration.Plugin({
        	maxAgeSeconds: 60 * 60 * 24 * 365,
        	maxEntries: 30,
      }),
    ]
	})
)

self.addEventListener("push",event => {
	let body;
	if(event.data){
		body = event.data.text();
	}else{
		body = "push message payload";
	}

	let options = {
		body: body,
		icon: "",
		vibrate: [100,50,100],
		data: {
			dateOfArrival: Date.now(),
			primaryKey: 1
		}
	};

	event.waitUntil(
		self.registration.showNotification("push notification",options)
	);
})