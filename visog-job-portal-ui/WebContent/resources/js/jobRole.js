	var app = angular.module("JobRoleManagement", []);

	//Controller Part
	app
			.controller(
					"JobRoleController",
					function($scope, $http) {

						$scope.jobRole = [];
						$scope.jobRoleForm = {
							// id : -1,
							name : "",
							description : "",
						};

						// Now load the data from server
						_refreshJobRoleData();

						// HTTP POST/PUT methods for add/edit jobRole
						// with the help of id, we are going to find out whether it
						// is put or post operation

						$scope.submitJobRole = function() {

							var method = "";
							var url = "";
							// alert($scope.genderForm.id);
							if ($scope.jobRoleForm.id == -1
									|| $scope.jobRoleForm.id == undefined) {
								// Id is absent in form data, it is create new jobRole
								// operation

								method = "POST";
								url = 'http://localhost:8080/visog-job-portal-api/master/jobRole/';
								$http
										.post(
												url,
												{
													"name" : $scope.jobRoleForm.name,
													"description" : $scope.jobRoleForm.description,
													
												}).then(_success, _error);

							} else {

								// Id is present in form data, it is edit jobRole
								// operation
								id = $scope.jobRoleForm.id;
								method = "PUT";
								url = 'http://localhost:8080/visog-job-portal-api/master/jobRole/'
										+ id;
								$http
										.put(
												url,
												{
													"name" : $scope.jobRoleForm.name,
													"code" : $scope.jobRoleForm.description,
													
												}).then(_success, _error);
								$scope.jobRoleForm.id = -1;
							}
							/*
							 * $http({ method : method, url : url, data :
							 * angular.toJson($scope.genderForm), headers : {
							 * 'Content-Type' : 'application/json' } }).then(
							 * _success, _error );
							 */
						};

						// HTTP DELETE- delete jobRole by Id
						$scope.deleteJobRole = function(jobRole) {
							$http(
									{
										method : 'DELETE',
										url : 'http://localhost:8080/visog-job-portal-api/master/jobRole/'
												+ jobRole.id
									}).then(_success, _error);
						};

						// In case of edit, populate form fields and assign form.id
						// with jobRole id
						$scope.editJobRole = function(jobRole) {

							$scope.jobRoleForm.name = jobRole.name;
							$scope.jobRoleForm.description = jobRole.description;
							
							$scope.jobRoleForm.id =jobRole.id;
						};

						/* Private Methods */
						// HTTP GET- get all countries collection
						function _refreshJobRoleData() {
							$http(
									{
										method : 'GET',
										url : 'http://localhost:8080/visog-job-portal-api/master/jobRole/'
									}).then(function successCallback(response) {
								// alert(response.data.data)
								$scope.jobRole = response.data.data;
							}, function errorCallback(response) {
								console.log(response.statusText);
							});
						}

						function _success(response) {

							_refreshJobRoleData();
							_clearFormData()
						}

						function _error(response) {

							console.log(response.statusText);
						}

						// Clear the form
						function _clearFormData() {
							// $scope.genderForm.id = -1;
							$scope.jobRoleForm.name = "";
							$scope.jobRoleForm.description = "";
							

						}
						;
					});
