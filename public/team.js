import DataSource from "./asset/js/data-source.js";
import {loadNav,loadPage} from "./asset/js/nav.js";
import {showTeamById,getSavedById} from "./asset/js/api.js";
import {saveForTeams, saveForMatches} from "./asset/js/db.js";

document.addEventListener("DOMContentLoaded",() => {

	let urlParams = new URLSearchParams(window.location.search);
	let id = urlParams.get("id");
	let isSaved = urlParams.get("saved");

	let el = document.querySelector(".tabs");
	M.Tabs.init(el,{});
	const save = document.querySelector("#save");

	if(isSaved){
		save.style.display = "none";
		getSavedById(id);
	}else{
		showTeamById();
	}
	save.addEventListener("click",event => {
		let teams = showTeamById();
		let match = DataSource.getMatchById(id);
		match.then(results => {
				const matches = {
					id: parseInt(id),
					match : results.matches
				};
				saveForMatches(matches);
		});

		teams.then(result => {
			saveForTeams(result);
			M.toast({html: "Data berhasil disimpan"});
		});
	});

	if("serviceWorker" in navigator){
		navigator.serviceWorker.register("service-worker.js")
		.then(() => {
			console.log("registrasi serviceWorker berhasil");
		}).catch(() => {
			console.log("registrasi serviceWorker gagal!");
		});
	}
});