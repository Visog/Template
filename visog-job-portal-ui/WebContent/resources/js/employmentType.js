	var app = angular.module("EmploymentTypeManagement", []);

	//Controller Part
	app
			.controller(
					"EmploymentTypeController",
					function($scope, $http) {

						$scope.employementType = [];
						$scope.employementTypeForm = {
							// id : -1,
							name : "",
							description : ""
							
						};

						// Now load the data from server
						_refreshEmploymentTypeData();

						// HTTP POST/PUT methods for add/edit role
						// with the help of id, we are going to find out whether it
						// is put or post operation

						$scope.submitEmploymentType = function() {

							var method = "";
							var url = "";
							// alert($scope.genderForm.id);
							if ($scope.employementTypeForm.id == -1
									|| $scope.employementTypeForm.id == undefined) {
								// Id is absent in form data, it is create new role
								// operation

								method = "POST";
								url = 'http://localhost:8080/visog-job-portal-api/master/employementType/';
								$http
										.post(
												url,
												{
													"name" : $scope.employementType.name,
													"description" : $scope.employementType.description
													
												}).then(_success, _error);

							} else {

								// Id is present in form data, it is edit role
								// operation
								id = $scope.employementTypeForm.id;
								method = "PUT";
								url = 'http://localhost:8080/visog-job-portal-api/master/employementType/'
										+ id;
								$http
										.put(
												url,
												{
													"name" : $scope.employementType.name,
													"description" : $scope.employementType.description
													
												}).then(_success, _error);
								$scope.employementType.id = -1;
							}
							/*
							 * $http({ method : method, url : url, data :
							 * angular.toJson($scope.genderForm), headers : {
							 * 'Content-Type' : 'application/json' } }).then(
							 * _success, _error );
							 */
						};

						// HTTP DELETE- delete role by Id
						$scope.deleteEmployementType = function(employementType) {
							$http(
									{
										method : 'DELETE',
										url : 'http://localhost:8080/visog-job-portal-api/master/employementType/'
												+ employementType.id
									}).then(_success, _error);
						};

						// In case of edit, populate form fields and assign form.id
						// with role id
						$scope.editEmployementType = function(employementType) {

							$scope.employementTypeForm.name = employementType.name;
							$scope.employementTypeForm.description = employementType.description;
							
							$scope.employementTypeForm.id =employementType.id;
						};

						/* Private Methods */
						// HTTP GET- get all countries collection
						function _refreshEmploymentTypeData() {
							$http(
									{
										method : 'GET',
										url : 'http://localhost:8080/visog-job-portal-api/master/employementType/'
									}).then(function successCallback(response) {
								// alert(response.data.data)
								$scope.employementType = response.data.data;
							}, function errorCallback(response) {
								console.log(response.statusText);
							});
						}

						function _success(response) {

							_refreshEmploymentTypeData();
							_clearFormData()
						}

						function _error(response) {

							console.log(response.statusText);
						}

						// Clear the form
						function _clearFormData() {
							// $scope.genderForm.id = -1;
							$scope.employementTypeForm.name = "";
							$scope.employementTypeForm.description = "";
							

						}
						;
					});
