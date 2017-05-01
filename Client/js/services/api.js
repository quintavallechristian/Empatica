/*Service to communicate with the API*/

angular.module('dashboard')
.factory('Api', function ApiFactory($http){
	var BASE_URL = "http://127.0.0.1:8000/server"
	return{
		get_data:	function(){
						return $http({method: 'GET', url: BASE_URL+'/data/'});
					},		
		put_data:	function(id, data){
						return $http({method: 'PUT', url: BASE_URL+'/data/'+id+'/', data:data});
					},	
	}
});