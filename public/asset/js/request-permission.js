function requestPermission(){
	navigator.serviceWorker.ready.then(()=>{
		if("Notification" in window){
			Notification.requestPermission().then(result => {
				if(result === "denied"){
					M.toast({html: "notifikasi tidak diijinkan"});
					return;
				}else if(result === "default"){
					console.log("pengguna menutup kotak dialog");
					return;
				}

				navigator.serviceWorker.getRegistration().then(reg => {
					reg.showNotification("notifikasi diijinkan");
				})
			})
		}
	})
}

export default requestPermission;