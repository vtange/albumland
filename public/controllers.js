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
	/* STYLE */
	/* ng-class = add "active' to gallery tab */
	$scope.isCurrGall = function(index){
		return $scope.o.currIndex === index;
	}

	/* STATE */ 
	$scope.galleries = ActiveUser.user.galleries;
	$scope.o = {currIndex:0};

	/* select gallery */
	$scope.selectGall = function(index){
		$scope.o.currIndex = index;
	};
	
}]);//end of controller


/*-------------*/
/*Page Specific Controls - Galleries   */
/*-------------*/
angular.module('AlbumApp').controller('MainCtrl', ['$scope', '$http', '$window', 'alertify', "ActiveUser", function($scope, $http, $window, alertify, ActiveUser){
	/* STYLE */
	/* ng-style = widen form when new Gall mode */
	$scope.widenForm = function(){
		if(!$scope.newGallMode){
			return {};
		}
		else{
			return { "width":"200px" };
		}
	};
	/* ng-style = prevent "[]" form since it has padding and border */
	$scope.showInput = function(){
		if(!$scope.newGallMode){
			return { "padding":"0", "border":"0" };
		}
		else{
			return {};
		}
	};
	/* ng-style = rotate plus when new Gall mode */
	$scope.rotatePlus = function(){
		if(!$scope.newGallMode){
			return {};
		}
		else{
			return { "left":"1rem", "transform":"rotate(45deg)" };
		}
	};
	/* ng-style = show hide text area for new img link */
	$scope.textArea = function(){
		if(!$scope.newImgMode){
			return { "opacity":0.0 };
		}
		else{
			return { "opacity":1 };
		}
	};
	/* ng-style = stock background with plus */
	$scope.stockBkgrd = function(){
		if(!$scope.newImgMode){
			return { "background-image":"url(../img/img_icon.png)" };
		}
		else{
			return { "background-image":"none" };
		}
	};
	/* ng-class = add "active' to gallery tab */
	$scope.isCurrGall = function(index){
		return $scope.gallEdits.currIndex === index;
	};
	
	/* STATE */ 
	$scope.newGallMode = false;
	$scope.newImgMode = false;

	/* ng model for forms */
	$scope.gallEdits = {
		newGall:"",
		newImg:"",
		currIndex:0
	};
	$scope.galleries = ActiveUser.user.galleries;

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
	};
	/* toggle new img form */
	$scope.newImgForm = function(){
		if(!$scope.newImgMode){
			$scope.newImgMode = true;
		}
	};
	/* toggle new img form if click out*/
	$scope.resetImgForm = function(){
		$scope.newImgMode = false;
		$scope.gallEdits.newImg = "";
	};
	/* prevent ng-click from going up to parent elements */
	$scope.preventClose = function($event){
		$event.stopPropagation() 
	};
	/* select gallery */
	$scope.selectGall = function(index){
		$scope.gallEdits.currIndex = index;
	};
	/* submit new gallery form */
	$scope.newGall = function(){
		$http.post($window.location.href+'newGall',$scope.gallEdits).success(function(data){
			$scope.galleries.push(data);
			$scope.gallEdits.currIndex = $scope.galleries.getFirstIndexThat(function(gallery){
				return gallery.name === data.name;
			});
			$scope.newGallForm();
		}).error(function(data){
			alertify.error("Something wrong happened while making your new gallery.");
		});
	};

	/* submit new img link form */
	$scope.newImgLink = function(){
		//do a pre text check, alert if not good
		$http.post($window.location.href+'newImg',$scope.gallEdits).success(function(data){
			//push to galleries
			ActiveUser.user.galleries[$scope.gallEdits.currIndex].pics.push(data);
			$scope.resetImgForm();
		}).error(function(data){
			alertify.error("Something went wrong while adding the picture.");
		});
	};
	/* delete img */
	$scope.deleteImgLink = function(url){
		$scope.gallEdits.delUrl = url;
		$http.post($window.location.href+'delImg',$scope.gallEdits).success(function(data){
			//remove from galleries
			ActiveUser.user.galleries[$scope.gallEdits.currIndex].pics.splice(url,1);
		}).error(function(data){
			alertify.error("Something went wrong while deleting the picture.");
		});
	};
}]);//end of controller

Array.prototype.getFirstIndexThat = function(test) {

    for(var i = 0; i < this.length; i++)
    {
        if (test(this[i])){
			return i;
		}
    }
	return null;
}
