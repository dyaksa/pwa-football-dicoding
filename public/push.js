var webPush = require("web-push");

const vapidKey = {
    "publicKey": "BATTBeeV-dF3VnOc0O7gKUF6-e5OFu8460iR4FQfNVaJomPptR3cFtDkFrK-7CoVej5jMoCu2R4EIU0zVNSt50Y",
    "privateKey": "uNtftgmn1248T-tfk9_ZpAhkX_XroJJKEy_lQBlMrBI"
}

webPush.setVapidDetails(
    "mailto:example@pwa.org",
    vapidKey.publicKey,
    vapidKey.privateKey
);

let pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/f0gn3Y0gCpM:APA91bHK2nYy4i6p9xVRK9uJfLHGcOn2FNTJeKU1qcThjPEr7d73kP2JXyundbHAOrz4FbkicbY8Q40xk6gYD4tKENlHETJjpWY76_zNj_3ZmE1vP2sv62QINg4Zw-mW0DDJyRRC_jl9",
    "keys": {
        "p256dh": "BEvdj+7oS8iz3CBBUcITTRhI/pveBgeqZZ5jfRYvjcDhsPA//IL5SSRqPZyPDA1G7pg+U2sX6b9O9E/P5ecN3Tk=",
        "auth": "RXWjzxYztMHaJaynHIRLhg=="
    }
};

let payload = "Selamat aplikasi anda sudah menerima push notification";

let options = {
    gcmAPIKey: "219448642957",
    TTL: 60
};

webPush.sendNotification(
    pushSubscription,
    payload,
    options
)