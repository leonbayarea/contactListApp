var myApp = angular.module('myApp',[]);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http){
	function refresh() {
			$http.get('/contactList').success(function(data){
		// console.log(JSON.stringify(data));
				$scope.persons=data;
			});
	}
	refresh();

	$scope.add = function(){
		console.log("&&&&& " + $scope.contact._id+"&&&&");
		if ($scope.contact._id != null) $scope.contact._id = null;
		$http.post('/contactList', $scope.contact).success(function(data){
			$scope.persons.push(data);
			$scope.contact='';
		});
	};

	$scope.delete = function(id, index){
		console.log(id+",,, " + index);
		$http.delete('/contactList/'+id).success(function(data){
			$scope.persons.splice(index, 1);
		});
	};

	$scope.edit = function(id){
		console.log(id);
		$http.get('/contactList/'+id).success(function(data){
			$scope.contact=data;
		});
	};

	$scope.update = function(){
		console.log($scope.contact._id);
		$http.put('/contactList/'+$scope.contact._id, $scope.contact).success(function(data){
			refresh();
			$scope.contact='';
		});
	};


}]);