
var myApp = angular.module('myApp', ['ngCookies']);

myApp.controller('MyController', ['$scope','$cookies','$cookieStore','$window', function($scope,$cookies,$cookieStore,$window) {
 alert('hi');
	$cookies.userName = 'Sandeep';
  $scope.platformCookie = $cookies.userName;
  $cookieStore.put('fruit','Apple');
  $cookieStore.put('flower','Rose');
  $scope.myFruit= $cookieStore.get('fruit');
}]);