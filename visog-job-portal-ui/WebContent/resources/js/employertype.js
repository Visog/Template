var app = angular.module("EmployerTypeManagement", []);

// Controller Part
app
		.controller(
				"EmployerTypeController",
				function($scope, $http) {

					$scope.employertype = [];
					$scope.employertypeForm = {
					 id : -1,
						name : "",
						discription :""
				
					};

					// Now load the data from server
					_refreshEmployerTypeData();

					// HTTP POST/PUT methods for add/edit role
					// with the help of id, we are going to find out whether it
					// is put or post operation

					$scope.submitEmployerType = function() {

						var method = "";
						var url = "";
						// alert($scope.stateForm.id);
						if ($scope.employertypeForm.id == -1
								|| $scope.employertypeForm.id == undefined) {
							// Id is absent in form data, it is create new role
							// operation

							method = "POST";
							url = 'http://localhost:8080/visog-job-portal-api/master/employerType/';
							$http.post(url, {
								"name" : $scope.employertypeForm.name,
								"discription" : $scope.employertypeForm.discription
								
							}).then(_success, _error);

						} else {

							// Id is present in form data, it is edit role
							// operation
							id = $scope.employertypeForm.id;
							method = "PUT";
							url = 'http://localhost:8080/visog-job-portal-api/master/employerType/'
									+ id;
							$http.put(url, {
								"name" : $scope.employertypeForm.name,
								"discription" : $scope.employertypeForm.discription
								
							}).then(_success, _error);
							$scope.employertypeForm.id = -1;
						}
						/*
						 * $http({ method : method, url : url, data :
						 * angular.toJson($scope.genderForm), headers : {
						 * 'Content-Type' : 'application/json' } }).then(
						 * _success, _error );
						 */
					};

					// HTTP DELETE- delete role by Id
					$scope.deleteEmployerType = function(employertype) {
						$http(
								{
									method : 'DELETE',
									url : 'http://localhost:8080/visog-job-portal-api/master/employerType/'
											+ employertype.id
								}).then(_success, _error);
					};

					// In case of edit, populate form fields and assign form.id
					// with role id
					$scope.editEmployerType = function(employertype) {

						$scope.employertypeForm.name = employertype.name;
						$scope.employertypeForm.discription = employertype.discription;
					
						$scope.employertypeForm.id = employertype.id;
					};

					/* Private Methods */
					// HTTP GET- get all countries collection
					function _refreshEmployerTypeData() {
						$http(
								{
									method : 'GET',
									url : 'http://localhost:8080/visog-job-portal-api/master/employersType/'
								}).then(function successCallback(response) {
							// alert(response.data.data)
							$scope.employertype = response.data.data;
						}, function errorCallback(response) {
							console.log(response.statusText);
						});
					}

					function _success(response) {

						_refreshEmployerTypeData();
						_clearFormData()
					}

					function _error(response) {

						console.log(response.statusText);
					}

					// Clear the form
					function _clearFormData() {
						// $scope.cityForm.id = -1;
						$scope.employertypeForm.name = "";
						$scope.employertypeForm.discription = "";

					}
					;
				});