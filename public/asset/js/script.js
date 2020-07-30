import {loadNav,loadPage} from "../js/nav.js";
import requestPermission from "./request-permission.js";
import pushManager from "./push-manager.js";

function main(){
	const elem = document.querySelector(".sidenav");

	M.Sidenav.init(elem);
	loadNav();

	let page = window.location.hash.substr(1);
	if(page === "") page = "home";
	loadPage(page);


	if("serviceWorker" in navigator){
		navigator.serviceWorker.register("service-worker.js")
		.then(() => {
			console.log("registrasi serviceWorker berhasil");
		}).catch(() => {
			console.log("registrasi serviceWorker gagal");
		})
	}else{
		console.log("serviceWorker belum didukung oleh browser");
	}

	requestPermission();
	pushManager();
}

export default main;