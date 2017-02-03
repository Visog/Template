	var app = angular.module("EmployerTypeManagement", []);

	//Controller Part
	app
			.controller(
					"EmployerTypeController",
					function($scope, $http) {

						$scope.employerType = [];
						$scope.employerTypeForm = {
							// id : -1,
							name : "",
							description : "",
						};

						// Now load the data from server
						_refreshEmployerTypeData();

						// HTTP POST/PUT methods for add/edit employerType
						// with the help of id, we are going to find out whether it
						// is put or post operation

						$scope.submitEmployerType = function() {

							var method = "";
							var url = "";
							// alert($scope.genderForm.id);
							if ($scope.employerTypeForm.id == -1
									|| $scope.employerTypeForm.id == undefined) {
								// Id is absent in form data, it is create new employerType
								// operation

								method = "POST";
								url = 'http://localhost:8080/visog-job-portal-api/master/employerType/';
								$http
										.post(
												url,
												{
													"name" : $scope.employerTypeForm.name,
													"description" : $scope.employerTypeForm.description,
													
												}).then(_success, _error);

							} else {

								// Id is present in form data, it is edit employerType
								// operation
								id = $scope.employerTypeForm.id;
								method = "PUT";
								url = 'http://localhost:8080/visog-job-portal-api/master/employerType/'
										+ id;
								$http
										.put(
												url,
												{
													"name" : $scope.employerTypeForm.name,
													"code" : $scope.employerTypeForm.description,
													
												}).then(_success, _error);
								$scope.employerTypeForm.id = -1;
							}
							/*
							 * $http({ method : method, url : url, data :
							 * angular.toJson($scope.genderForm), headers : {
							 * 'Content-Type' : 'application/json' } }).then(
							 * _success, _error );
							 */
						};

						// HTTP DELETE- delete employerType by Id
						$scope.deleteEmployerType = function(employerType) {
							if(confirm("Are you sure to Delete ?") == true){
							$http(
									{
										method : 'DELETE',
										url : 'http://localhost:8080/visog-job-portal-api/master/employerType/'
												+ employerType.id
									}).then(_success, _error);
							}
						};

						// In case of edit, populate form fields and assign form.id
						// with employerType id
						$scope.editEmployerType = function(employerType) {

							$scope.employerTypeForm.name = employerType.name;
							$scope.employerTypeForm.description = employerType.description;
							
							$scope.employerTypeForm.id =employerType.id;
						};

						/* Private Methods */
						// HTTP GET- get all countries collection
						function _refreshEmployerTypeData() {
							$http(
									{
										method : 'GET',
										url : 'http://localhost:8080/visog-job-portal-api/master/employerType/'
									}).then(function successCallback(response) {
								// alert(response.data.data)
								$scope.employerType = response.data.data;
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
							// $scope.genderForm.id = -1;
							$scope.employerTypeForm.name = "";
							$scope.employerTypeForm.description = "";
							

						}
						;
					});
