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
/*Page Specific Controls - Galleries   */
/*-------------*/
angular.module('AlbumApp').controller('MainCtrl', ['$scope', function($scope){
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
			return {};
		}
		else{
			return { "opacity": 1, "visibility": "visible" };
		}
	}
	/* ng-style = rotate plus when new Gall mode */
	$scope.rotatePlus = function(){
		if(!$scope.newGallMode){
			return {};
		}
		else{
			return { "left":"1rem", "transform": "rotate(45deg)" };
		}
	}
	
	/* STATE */ 
	$scope.newGallMode = false;
	/* FUNCTIONS */
	/* toggle new gallery form */
	$scope.newGallForm = function(){
		if(!$scope.newGallMode){
			$scope.newGallMode = true;
		}
		else{
			$scope.newGallMode = false;
		}
	}
	/* submit new gallery form */
	$scope.newGall = function(){
		
	}
	/* ng model for forms */
	$scope.gallEdits = {
		newGall:""
	}
	
	
	/* toggle new img link form */
	$scope.newImgLink = function(){
		
	}	
	
	
	
	
	
	
	
	
    $scope.currentGallery = ["alpha","beta","delta","phi","gamma","theta"];
}]);//end of controller