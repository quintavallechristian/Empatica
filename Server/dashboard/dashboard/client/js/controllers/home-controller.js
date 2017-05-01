
/*CONTROLLER FOR THE HOME SCREEN OF THE DASHBOARD*/
angular.module("dashboard").controller('homeController', function($scope, $mdSidenav, $mdMedia, NgMap, Api, $rootScope) {

	//initialization
	$rootScope.$mdMedia = $mdMedia;
	geocoder = new google.maps.Geocoder;
	controller = this;

	controller.data = [];
	controller.visibleData = [];

	controller.default = {};
	controller.default.country = "";
	controller.default.app_id = "";
	controller.default.min=0;
	controller.default.max=24;

	controller.search = {};
	controller.search.country = "";
	controller.search.app_id = "";
	controller.search.min=0;
	controller.search.max=24;

	controller.countries = {};
	controller.app_ids = {};

	//get data from server
	Api.get_data().then(function success(response){
		controller.data=response.data;
		controller.visibleData=response.data;
		controller.dynMarkers = [];
		controller.info = [];

		//if not already geolocated, geolocate each download based on their coordinates
		for(var i = 0; i<controller.visibleData.length;i++){
			if(controller.visibleData[i].country == null || controller.visibleData[i].country == "" ){
				var latLng = new google.maps.LatLng(controller.visibleData[i].longitude, controller.visibleData[i].latitude);
				var geocoder = new google.maps.Geocoder();
				geocoder.geocode({latLng: latLng}, geoCoderCallback(i));
			}
			else{
				controller.buildCountriesList(controller.visibleData[i].country);
			}
			controller.buildAppIdsList(controller.visibleData[i].app_id);
	    }
	});

	/*MAP RELATED FUNCTIONS*/

	//show the popup when clicking on the markers
	controller.showInfo = function(event, d){
		$scope.selectedData = d;
    	$scope.map.showInfoWindow('infoWindow', this);
	}

	//callback from geocoder service
	function geoCoderCallback(i){
		return function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                	for(j = 0; j < results[1].address_components.length;j++){
	            		if(results[1].address_components[j].types[0] == "country"){
	            			country =  results[1].address_components[j].long_name;
	                    	Api.put_data(controller.visibleData[i].pk, {country: country}).then(function success(response){
	                    	});
							controller.data[i].country = country;
                    		controller.visibleData[i].country = country;
                    		controller.buildCountriesList(country);
	                	}
                	}
                } else {
                   controller.data[i].country = 'Location not found';
                }
            } else {
                console.log('Geocoder failed due to: ' + status);
            }
        }
	}

	/*END MAP RELATED FUNCTIONS*/

	/*FILTER RELATED FUNCTIONS*/

	//filter the visible data
	controller.filter = function(){
		controller.visibleData = [];
		controller.countries = {};
		controller.app_ids = {};
		for(i=0;i<controller.data.length;i++){
			hour = new Date(controller.data[i].downloaded_at).getHours();
			if(hour>=controller.search.min && hour<controller.search.max && controller.data[i].country.toLowerCase().indexOf(controller.search.country.toLowerCase()) >= 0 &&
				controller.data[i].app_id.toLowerCase().indexOf(controller.search.app_id.toLowerCase()) >= 0){
				controller.visibleData.push(controller.data[i]);
				controller.buildAppIdsList(controller.data[i].app_id);
				controller.buildCountriesList(controller.data[i].country);
			}
		}
	}

	//set the search field when clicking on a country or an app_id
	controller.setSearchField = function(key, value){
		controller.search[key] = value;
		controller.filter();
		controller.toggleSidenav();
	}

	//set the time boundaries when clicking on the icons
	controller.filterTime = function(period){
		switch(period){
			case "morning":
				controller.search.min=7;
				controller.search.max=12;
				break;
			
			case "afternoon":
				controller.search.min=12;
				controller.search.max=19;
				break;
			
			case "evening":
				controller.search.min=19;
				controller.search.max=24; 
				break;
			case "night":
				controller.search.min=0;
				controller.search.max=7; 
				break;

			default:
				break;
		}
		controller.filter();
	}

	//build the list of countries with visible markers
	controller.buildCountriesList = function(country){
		if(country in controller.countries)
			controller.countries[country]++;
		else
			controller.countries[country] = 1;
	}

	//build the list of app_ids with visible markers
	controller.buildAppIdsList = function(app_id){
		if(app_id in controller.app_ids)
			controller.app_ids[app_id]++;
		else
			controller.app_ids[app_id] = 1;
	}

	//assess if any filter has been applyed
	controller.hasFiltersChanged = function(){
		for(key in controller.search){
			if(controller.search[key] != controller.default[key])
				return true;
		}
		return false;
	}

	//reset filters restoring initial state
	controller.resetFilters = function(){
		for(key in controller.default){
			controller.search[key] = controller.default[key]
			;
		}
		controller.filter();
	}

	/*END FILTER RELATED FUNCTIONS*/

	/*UI RELATED FUNCTIONS*/

	//assess if sidenav is opened
	controller.isSidenavOpened = function(){
      return $mdSidenav('sidenav').isOpen();
    };
    
    //toggle sidenav
	controller.toggleSidenav = buildToggler();

    function buildToggler() {
      return function() {
        $mdSidenav("sidenav").toggle();
      };
    }
    /*END UI RELATED FUNCTIONS*/
});