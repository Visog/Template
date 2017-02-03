	var app = angular.module("EmployerManagement", []);

	//Controller Part
	app
			.controller(
					"EmployerController",
					function($scope, $http) {

						$scope.employer = [];
						$scope.employerForm = {
							// id : -1,
								code : "",
								status : "",
								description : "",
								data : ""
								
						};

						// Now load the data from server
						_refreshEmployerData();

						// HTTP POST/PUT methods for add/edit role
						// with the help of id, we are going to find out whether it
						// is put or post operation

						$scope.submiEmployer = function() {

							var method = "";
							var url = "";
							// alert($scope.genderForm.id);
							if ($scope.employerForm.id == -1
									|| $scope.employerForm.id == undefined) {
								// Id is absent in form data, it is create new role
								// operation

								method = "POST";
								url = 'http://localhost:8080/visog-job-portal-api/transaction/employer/';
								$http
										.post(
												url,
												{
													"code" : $scope.employerForm.code,
													"status" : $scope.employerForm.status,
													"description" : $scope.employerForm.description,
													"data" : $scope.employerForm.data
													
												}).then(_success, _error);

							} else {

								// Id is present in form data, it is edit role
								// operation
								id = $scope.employerForm.id;
								method = "PUT";
								url = 'http://localhost:8080/visog-job-portal-api/transaction/employer/'
										+ id;
								$http
										.put(
												url,
												{
													"code" : $scope.employerForm.code,
													"status" : $scope.employerForm.status,
													"description" : $scope.employerForm.description,
													"data" : $scope.employerForm.data
													
												}).then(_success, _error);
								$scope.employerForm.id = -1;
							}
							/*
							 * $http({ method : method, url : url, data :
							 * angular.toJson($scope.genderForm), headers : {
							 * 'Content-Type' : 'application/json' } }).then(
							 * _success, _error );
							 */
						};

						// HTTP DELETE- delete role by Id
						$scope.deleteEmployer = function(employer) {
							if(confirm("Are you sure to Delete ?") == true){
							$http(
									{
										method : 'DELETE',
										url : 'http://localhost:8080/visog-job-portal-api/transaction/employer/'
												+ employer.id
									}).then(_success, _error);
							}
						};

						// In case of edit, populate form fields and assign form.id
						// with role id
						$scope.editEmployer = function(employer) {

							$scope.employerForm.code = employer.code;
							$scope.employerForm.status = employer.status;
							$scope.employerForm.description = employer.description;
							$scope.employerForm.data = employer.data;
							$scope.employerForm.id =employer.id;
						};

						/* Private Methods */
						// HTTP GET- get all countries collection
						function _refreshEmployerData() {
							$http(
									{
										method : 'GET',
										url : 'http://localhost:8080/visog-job-portal-api/transaction/employer/'
									}).then(function successCallback(response) {
								// alert(response.data.data)
								$scope.employerForm = response.data.data;
							}, function errorCallback(response) {
								console.log(response.statusText);
							});
						}

						function _success(response) {

							_refreshEmployerData();
							_clearFormData()
						}

						function _error(response) {

							console.log(response.statusText);
						}

						// Clear the form
						function _clearFormData() {
							// $scope.genderForm.id = -1;
							$scope.employerForm.code = "";
							$scope.employerForm.status = "";
							$scope.employerForm.description = "";
							$scope.employerForm.data = "";
							
							
						}
						;
					});
