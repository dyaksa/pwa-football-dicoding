import DataSource from "./data-source.js";
import {
	getAllTeams,
	deleteTeamById,
	deleteMatchById,
	getSavedTeamById,
	getSavedMatchById
} from "./db.js";

const showStandingsById = async () => {
	let urlParams = new URLSearchParams(window.location.search);
	let id = urlParams.get("id");
	try {
		let container = document.querySelector(".standings");
		let results = DataSource.getAllStandingsById(parseInt(id));
		let standings = await results;
		let standingsHTML = "";
		standings.standings[0].table.forEach(teams => {
			let {
				draw,
				goalDifference,
				goalsAgainst,
				goalsFor,
				lost,
				playedGames,
				points,
				position,
				team,
				won
			} = teams;
			standingsHTML += `
			<tr>
	            <td class="bold">${position}</td>
	            <td>
	            <a href="/team.html?id=${team.id}">	            	
	            	<figure>
	            		<img class="responsive-image" src="${team.crestUrl}" alt="img">
	            		<figcaption>${team.name}</figcaption>
	            	</figure></a>
	            </td>
	            <td class="bold">${playedGames}</td>
	           	<td class="bold">${won}</td>
	            <td class="bold">${draw}</td>
	            <td class="bold">${lost}</td>
	           	<td class="bold">${goalsFor}</td>
	            <td class="bold">${goalsAgainst}</td>
	            <td class="bold">${goalDifference}</td>
	            <td class="bold">${points}</td>
          </tr>`;
		});
		container.innerHTML = standingsHTML;
	}catch(err){
		console.log(err);
	}
}

const showTeamById = async () => {
	let urlParams = new URLSearchParams(window.location.search);
	let id = urlParams.get("id");
	try {
		let results = DataSource.getTeamById(parseInt(id));
		let team = await results;
		let matches = DataSource.getMatchById(id);
		let match = await matches;

		let containerSquad = document.querySelector(".squad");
		let containerMatch = document.querySelector(".match");
		let squadHTML = "";
		let matchHTML = "";

		let {
			address,
			email,
			founded,
			crestUrl,
			name,
			phone,
			squad,
			shortName,
			website,
			venue
		} = team;

		//TABS UNTUK MATCHES
		match.matches.forEach(mtch => {
			matchHTML += `<tr>
				<td>${mtch.homeTeam.name}</td>
				<td>${mtch.awayTeam.name}</td>
				<td>${new Date(mtch.utcDate)}</td>
				<td><span class="new badge" data-badge-caption="">${mtch.stage}</span></td>
			</tr>`;
		});
		console.log(match);
		containerMatch.innerHTML = matchHTML;

		//TABS UNTUK SQUAD;
		squad.forEach(sqd => {
			let {
				name,
				nationality,
				position
			} = sqd;
			squadHTML += `<tr>
				<td>${name}</td>
				<td>${nationality}</td>
				<td><span class="new badge" data-badge-caption="position">${position}</span></td>
			</tr>`;
		});
		containerSquad.innerHTML = squadHTML;

		//TABS UNTUK INFORMATION
		document.querySelector("#crestImg").setAttribute("src", crestUrl);
		document.querySelector("#information").innerHTML = `<table class="highlight">
      	<tr>
      		<th>Address</th>
      		<td>${address}</td>
      	</tr>
      	<tr>
      		<th>Email</th>
      		<td>${email}</td>
      	</tr>
      	<tr>
      		<th>Founded</th>
      		<td>${founded}</td>
      	</tr>
      	<tr>
      		<th>Name</th>
      		<td>${name}</td>
      	</tr>
      	<tr>
      		<th>Phone</th>
      		<td>${phone}</td>
      	</tr>
      	<tr>
      		<th>Shortname</th>
      		<td>${shortName}</td>
      	</tr>
      	<tr>
      		<th>Website</th>
      		<td><a href="${website}" target="_blank">${website}s</a></td>
      	</tr>
      	</table>`;
      	return Promise.resolve(team);
	}catch(err){
		console.log(err);
	}
}

const getAllSaved = async () => {
	try {
		let resultTeam = getAllTeams();
		let teams = await resultTeam;
		let teamHTML = "";
		const teamContainer = document.querySelector("#saved");
		teams.forEach(team => {
		let {
			id,
			crestUrl,
			shortName
		} = team;
			teamHTML += `<a href="/team.html?id=${id}&saved=true" class="pointer"><div class="col s12 m8 offset-m2 l6 offset-l3">
        <div class="card-panel grey lighten-5 z-depth-1">
          <div class="row valign-wrapper">
            <div class="col s2">
              <img src="${crestUrl}" alt="" class="circle responsive-img"> <!-- notice the "circle" class -->
            </div>
            <div class="col s8">
              <span class="black-text">
                ${shortName}
              </span>
            </div>
            <div class="col s2">
            	<a id="delete"><i id="${id}" class="material-icons right">delete</i></a>
            </div>
          </div>
        </div>
      </div></a>`;
		});
		teamContainer.innerHTML = teamHTML;
		const removeButton = document.querySelectorAll("#delete");
		removeButton.forEach(button => {
			button.addEventListener("click",event => {
				let id = event.target.id;
				deleteTeamById(id).then(() => {
					deleteMatchById(id).then(() => {
						getAllSaved();
					})
				})
			});
		})
	}catch(err){
		console.log(err);
		M.toast({html: "sepertinya ada kesalah"});
	}
}

const getSavedById = async (id) => {
	try {
		let resultTeam = getSavedTeamById(parseInt(id));
		let team = await resultTeam;
		let resultMatch = getSavedMatchById(parseInt(id));
		let match = await resultMatch;
		let {
			address,
			email,
			founded,
			crestUrl,
			name,
			phone,
			squad,
			shortName,
			website,
			venue
		} = team;

		//TABS INFORMASI
		const img = document.querySelector("#crestImg").setAttribute("src", crestUrl);
		document.querySelector("#information").innerHTML = `<table class="highlight">
      	<tr>
      		<th>Address</th>
      		<td>${address}</td>
      	</tr>
      	<tr>
      		<th>Email</th>
      		<td>${email}</td>
      	</tr>
      	<tr>
      		<th>Founded</th>
      		<td>${founded}</td>
      	</tr>
      	<tr>
      		<th>Name</th>
      		<td>${name}</td>
      	</tr>
      	<tr>
      		<th>Phone</th>
      		<td>${phone}</td>
      	</tr>
      	<tr>
      		<th>Shortname</th>
      		<td>${shortName}</td>
      	</tr>
      	<tr>
      		<th>Website</th>
      		<td><a href="${website}" target="_blank">${website}s</a></td>
      	</tr>
      	</table>`;

      	//TABS SQUAD
      	let squadContainer = document.querySelector(".squad");
      	let squadHTML = "";
      	squad.forEach(sqd => {
      		let {
				name,
				nationality,
				position
			} = sqd;
      		squadHTML += `<tr>
				<td>${name}</td>
				<td>${nationality}</td>
				<td><span class="new badge" data-badge-caption="position">${position}</span></td>
			</tr>`;
      	});
      	squadContainer.innerHTML = squadHTML;

      	//TAB MATCH
      	let matchContainer = document.querySelector(".match");
      	let matchHTML = "";
      	match.match.forEach(mtch => {
      		matchHTML += `<tr>
				<td>${mtch.homeTeam.name}</td>
				<td>${mtch.awayTeam.name}</td>
				<td>${new Date(mtch.utcDate)}</td>
				<td><span class="new badge" data-badge-caption="">${mtch.stage}</span></td>
			</tr>`;
      	});
      	matchContainer.innerHTML = matchHTML;
	}catch(err){
		console.log(new Error(err));
	}
}

export {showStandingsById, showTeamById, getAllSaved, getSavedById};