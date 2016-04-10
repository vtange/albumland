/*-------------*/
/*Takes in User data from Server and sends it to Angular Factory 'ActiveUser' for access by other controllers    */
/*-------------*/
angular.module('AlbumApp').controller('autoLogger',['$scope', 'ActiveUser',function ($scope, ActiveUser) {
	
	//used to transfer server data to client
	$scope.init = function(package) {
		ActiveUser.user = package[0];
	};

}]);

/*-------------*/
/*Page Specific Controls - Galleries   */
/*-------------*/
angular.module('AlbumApp').controller('MainCtrl', ['$scope', function($scope){
    $scope.currentGallery = [];
}]);//end of controller