import "../vendors/js/idb.js";

let dbPromised = idb.open("football_database",1,upgradeDb => {
	if(!upgradeDb.objectStoreNames.contains("teams") && !upgradeDb.objectStoreNames.contains("match")){
		let teamsObjectStore = upgradeDb.createObjectStore("teams",{
			keyPath: "id"
		});
		teamsObjectStore.createIndex("name","name",{
			unique: false
		});

		let standingsObjectStore = upgradeDb.createObjectStore("matches",{
			keyPath: "id"
		});
		standingsObjectStore.createIndex("name","name",{
			unique: false
		});
	}
});

function saveForTeams(teams){
	dbPromised.then(db => {
		let tx = db.transaction("teams","readwrite");
		let store = tx.objectStore("teams");
		console.log(teams);
		store.put(teams);
		return tx.complete;
	}).then(() => {
		console.log("Data berhasil disimpan");
	}).catch(() => {
		console.log(new Error(tx.onerror));
	});
}

function saveForMatches(match){
	dbPromised.then(db => {
	let tx = db.transaction("matches","readwrite");
	let store = tx.objectStore("matches");
	store.put(match);
	return tx.complete;
	}).then(complete => {
		console.log("data berhasil disimpan");
	}).catch(() => {
		console.log(new Error(tx.onerror));
	});

}

const getAllTeams = () => {
	return new Promise((resolve,reject) => {
		dbPromised.then(db => {
			let tx = db.transaction("teams","readonly");
			let store = tx.objectStore("teams");
			return store.getAll();
		}).then(results => {
			resolve(results);
		}).catch(err => {
			reject(err);
		})
	})
}

const getSavedTeamById = (id) => {
	return new Promise((resolve,reject) => {
		dbPromised.then(db => {
			let tx = db.transaction("teams","readonly");
			let store = tx.objectStore("teams");
			return store.get(id);
		}).then(result => {
			resolve(result);
		}).catch(err => {
			reject(err);
		})
	})	
}

const getSavedMatchById = (id) => {
	return new Promise((resolve,reject) => {
		dbPromised.then(db => {
			let tx = db.transaction("matches","readonly");
			let store = tx.objectStore("matches");
			return store.get(id);
		}).then(result => {
			resolve(result);
		}).catch(err => {
			reject(err);
		})
	})
}

const deleteTeamById = (id) => {
	return new Promise((resolve,reject) => {
		dbPromised.then(db => {
			const transaction = db.transaction("teams","readwrite");
			transaction.objectStore("teams").delete(parseInt(id)); 
			return transaction;
		}).then(transaction => {
			if(transaction.complete){
				resolve(true);
			}else{
				reject(new Error(store.onerror));
			}
		})
	});
}

const deleteMatchById = (id) => {
	return new Promise((resolve,reject) => {
		dbPromised.then(db => {
			const transaction = db.transaction("matches","readwrite");
			transaction.objectStore("matches").delete(parseInt(id));
			return transaction;
		}).then(transaction => {
			if(transaction.complete){
				resolve(true);
			}else{
				reject(new Error(store.onerror));
			}
		})
	});
}

export {
	saveForTeams,
	saveForMatches,
	getAllTeams,
	deleteTeamById,
	deleteMatchById,
	getSavedTeamById,
	getSavedMatchById
};