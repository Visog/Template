	var app = angular.module("EmploymentTypeManagement", []);

	//Controller Part
	app
			.controller(
					"EmploymentTypeController",
					function($scope, $http) {

						$scope.employmenttypes = [];
						$scope.employmenttypeForm = {
							// id : -1,
							name : "",
							code : "",
							orderNum : ""
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
							if ($scope.employmenttypeForm.id == -1
									|| $scope.employmenttypeForm.id == undefined) {
								// Id is absent in form data, it is create new role
								// operation

								method = "POST";
								url = 'http://localhost:8080/visog-job-portal-api/master/employmenttype/';
								$http
										.post(
												url,
												{
													"name" : $scope.employmenttypeForm.name,
													"code" : $scope.employmenttypeForm.code,
													"orderNum" : $scope.employmenttypeForm.orderNum
												}).then(_success, _error);

							} else {

								// Id is present in form data, it is edit role
								// operation
								id = $scope.employmenttypeForm.id;
								method = "PUT";
								url = 'http://localhost:8080/visog-job-portal-api/master/employmenttype/'
										+ id;
								$http
										.put(
												url,
												{
													"name" : $scope.employmenttype.name,
													"code" : $scope.employmenttype.code,
													"orderNum" : $scope.employmenttype.orderNum
												}).then(_success, _error);
								$scope.employmenttype.id = -1;
							}
							/*
							 * $http({ method : method, url : url, data :
							 * angular.toJson($scope.genderForm), headers : {
							 * 'Content-Type' : 'application/json' } }).then(
							 * _success, _error );
							 */
						};

						// HTTP DELETE- delete role by Id
						$scope.deleteCountry = function(country) {
							$http(
									{
										method : 'DELETE',
										url : 'http://localhost:8080/visog-job-portal-api/master/employmenttype/'
												+ country.id
									}).then(_success, _error);
						};

						// In case of edit, populate form fields and assign form.id
						// with role id
						$scope.editCountry = function(country) {

							$scope.employmenttypeForm.name = employmenttype.name;
							$scope.employmenttypeForm.code = employmenttype.code;
							$scope.employmenttypeForm.orderNum = employmenttype.orderNum;
							$scope.employmenttypeForm.id =country.id;
						};

						/* Private Methods */
						// HTTP GET- get all countries collection
						function _refreshEmploymentTypeData() {
							$http(
									{
										method : 'GET',
										url : 'http://localhost:8080/visog-job-portal-api/master/employmenttype/'
									}).then(function successCallback(response) {
								// alert(response.data.data)
								$scope.employmenttypes = response.data.data;
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
							$scope.employmenttypeForm.name = "";
							$scope.employmenttypeForm.code = "";
							$scope.employmenttypeForm.orderNum = "";

						}
						;
					});
