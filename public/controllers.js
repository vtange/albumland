/*-------------*/
/*Takes in User data from Server and sends it to Angular Factory 'ActiveUser' for access by other controllers    */
/*-------------*/
angular.module('AlbumApp').controller('autoLogger',['$scope', 'ActiveUser',function ($scope, ActiveUser) {
	
	//used to transfer server data to client
	$scope.init = function(package) {
		console.log(package);
		ActiveUser.user = package[0];
	};

}]);

/*-------------*/
/*Page Specific Controls - Front Page   */
/*-------------*/
angular.module('AlbumApp').controller('FrontCtrl', ['$scope', function($scope){

	/* STATE */ 

	$scope.galleries = [{name:"Recently Added"}];
    $scope.currentGallery = ["alpha","beta","delta","phi","gamma","theta"];

}]);//end of controller


/*-------------*/
/*Page Specific Controls - Galleries   */
/*-------------*/
angular.module('AlbumApp').controller('MainCtrl', ['$scope', '$http', '$window', "ActiveUser", function($scope, $http, $window, ActiveUser){
	/* STYLE */
	/* ng-style = widen form when new Gall mode */
	$scope.widenForm = function(){
		if(!$scope.newGallMode){
			return {};
		}
		else{
			return { "width":"200px" };
		}
	}
	/* ng-style = widen form when new Gall mode */
	$scope.showInput = function(){
		if(!$scope.newGallMode){
			return { "padding":"0", "border":"0" };
		}
		else{
			return {};
		}
	}
	/* ng-style = rotate plus when new Gall mode */
	$scope.rotatePlus = function(){
		if(!$scope.newGallMode){
			return {};
		}
		else{
			return { "left":"1rem", "transform":"rotate(45deg)" };
		}
	}
	
	/* STATE */ 
	$scope.newGallMode = false;

	/* ng model for forms */
	$scope.gallEdits = {
		newGall:""
	}
	$scope.galleries = ActiveUser.user.galleries;
    $scope.currentGallery = $scope.galleries[0].pics;
	/* FUNCTIONS */
	/* toggle new gallery form */
	$scope.newGallForm = function(){
		if(!$scope.newGallMode){
			$scope.newGallMode = true;
		}
		else{
			$scope.newGallMode = false;
			$scope.gallEdits.newGall = "";
		}
	}
	/* prevent ng-click from going up to parent elements */
	$scope.preventClose = function($event){
		$event.stopPropagation() 
	}
	/* submit new gallery form */
	$scope.newGall = function(){
		$http.post($window.location.href+'newGall',$scope.gallEdits).success(function(data){
			$scope.galleries.push(data.name);
		}).error(function(data){
			console.error("Something wrong happened while making your new gallery.");
		});
	}
	
	
	/* toggle new img link form */
	$scope.newImgLink = function(){
		
	}	

}]);//end of controller