const API_KEY = "b8f2a077ab3f4af8884cea852822e99f";
class DataSource {
	static getAllStandingsById(id){
		return fetch(`https://api.football-data.org/v2/competitions/${id}/standings`,{
			"method": "GET",
			"headers": {
				"X-Auth-Token" : API_KEY
			}
		}).then(response => {
			return response.json();
		}).then(standings => {
			return Promise.resolve(standings);
		}).catch(err => {
			return Promise.reject(err);
		})
	}

	static getTeamById(id){
		return fetch(`https://api.football-data.org/v2/teams/${id}`,{
			"method": "GET",
			"headers" : {
				"X-Auth-Token": API_KEY
			}
		}).then(response => {
			return response.json();
		}).then(results => {
			return Promise.resolve(results);
		}).catch(err => {
			return Promise.reject(err);
		});
	}

	static getMatchById(id){
		return fetch(`https://api.football-data.org/v2/teams/${id}/matches?status=SCHEDULED`,{
			"method" : "GET",
			"headers" : {
				"X-Auth-Token" : API_KEY
			}
		}).then(response => {
			if(response.status === 200){
				return response.json();
			}
		}).then(match => {
			return Promise.resolve(match);
		}).catch(err => {
			return Promise.reject(err);
		})
	}
}

export default DataSource;