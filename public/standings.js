import {showStandingsById} from "./asset/js/api.js";

document.addEventListener("DOMContentLoaded",() => {
	showStandingsById();
	if("serviceWorker" in navigator){
		navigator.serviceWorker.register("./service-worker.js")
		.then(() => {
			console.log("registrasi serviceWorker berhasil");
		}).catch(() => {
			console.log("registrasi serviceWorker gagal");
		})
	}else{
		console.log("sevice worker belim didukung");
	}
});