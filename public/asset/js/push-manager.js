function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

function pushManager() {
    //check apakah serviceWorker sudah di daftarkan dengan menggunakan navigator.serviceWorker.ready
    navigator.serviceWorker.ready.then(() => {
        if (("PushManager" in window)) {
        navigator.serviceWorker.getRegistration().then(reg => {
            reg.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(
                    "BATTBeeV-dF3VnOc0O7gKUF6-e5OFu8460iR4FQfNVaJomPptR3cFtDkFrK-7CoVej5jMoCu2R4EIU0zVNSt50Y")
            }).then(subscribe => {
                console.log(`Berhasil subscribe dengan endpoint ${subscribe.endpoint}`);
                console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
                    null, new Uint8Array(subscribe.getKey('p256dh')))));
                console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
                    null, new Uint8Array(subscribe.getKey('auth')))));
            }).catch(err => {
                console.error('Tidak dapat melakukan subscribe ', err.message);
            })
        })
    }
    });
}

export default pushManager;