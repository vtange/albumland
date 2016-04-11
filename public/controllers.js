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
angular.module('AlbumApp').controller('FrontCtrl', ['$scope', 'ActiveUser', function($scope, ActiveUser){

	/* STATE */ 
	$scope.galleries = ActiveUser.user.galleries;
    $scope.currentGallery = $scope.galleries[0].pics;

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
	/* ng-style = prevent "[]" form since it has padding and border */
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
	/* ng-style = show hide text area for new img link */
	$scope.textArea = function(){
		if(!$scope.newImgMode){
			return { "opacity":0.0 };
		}
		else{
			return { "opacity":1 };
		}
	}
	/* ng-style = stock background with plus */
	$scope.stockBkgrd = function(){
		if(!$scope.newImgMode){
			return { "background-image":"url(../img/img_icon.png)" };
		}
		else{
			return { "background-image":"none" };
		}
	}

	/* STATE */ 
	$scope.newGallMode = false;
	$scope.newImgMode = false;

	/* ng model for forms */
	$scope.gallEdits = {
		newGall:"",
		newImg:""
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
	/* toggle new img form */
	$scope.newImgForm = function(){
		if(!$scope.newImgMode){
			$scope.newImgMode = true;
		}
	}
	/* toggle new img form if click out*/
	$scope.resetImgForm = function(){
		$scope.newImgMode = false;
		$scope.gallEdits.newImg = "";
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