// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCKOM8Tov7jcmlNgZ5EuRyat2l791hm6nM",
    authDomain: "sorex-bcade.firebaseapp.com",
    projectId: "sorex-bcade",
    storageBucket: "sorex-bcade.appspot.com",
    messagingSenderId: "428693429265",
    appId: "1:428693429265:web:b38ab9c0f26a026cc8e5b0",
    measurementId: "G-QCWT0DSEL6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Messaging
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    
    const notificationTitle = payload.notification?.title || payload.data?.title || 'New Message';
    const notificationOptions = {
        body: payload.notification?.body || payload.data?.body || 'You have a new message',
        icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiByeD0iMTIiIGZpbGw9IiM2NjdlZWEiLz4KPHN2ZyB4PSIxNiIgeT0iMTYiIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+CjxwYXRoIGQ9Im0zIDEyIDggOC0xMCA4LTgtOCAxMC04eiIvPgo8L3N2Zz4KPC9zdmc+',
        badge: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiByeD0iMTIiIGZpbGw9IiM2NjdlZWEiLz4KPHN2ZyB4PSIxNiIgeT0iMTYiIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+CjxwYXRoIGQ9Im0zIDEyIDggOC0xMCA4LTgtOCAxMC04eiIvPgo8L3N2Zz4KPC9zdmc+',
        tag: 'hello-notification',
        requireInteraction: true,
        actions: [
            {
                action: 'open',
                title: 'Open Website'
            },
            {
                action: 'close',
                title: 'Close'
            }
        ],
        data: payload.data
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification clicks
self.addEventListener('notificationclick', function(event) {
    console.log('[Service Worker] Notification click received.');

    event.notification.close();

    if (event.action === 'open' || !event.action) {
        // Open the website
        event.waitUntil(
            clients.matchAll({type: 'window'}).then(function(clientList) {
                for (var i = 0; i < clientList.length; i++) {
                    var client = clientList[i];
                    if (client.url.includes(location.origin) && 'focus' in client) {
                        return client.focus();
                    }
                }
                if (clients.openWindow) {
                    return clients.openWindow('/');
                }
            })
        );
    }
});

// Handle notification close
self.addEventListener('notificationclose', function(event) {
    console.log('[Service Worker] Notification closed.');
});
