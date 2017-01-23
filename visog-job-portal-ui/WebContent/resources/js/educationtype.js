var app = angular.module("EducationTypeManagement", []);

// Controller Part
app
		.controller(
				"EducationTypeController",
				function($scope, $http) {

					$scope.educationtype = [];
					$scope.educationtypeForm = {
					 id : -1,
						name : "",
						discription :""
				
					};

					// Now load the data from server
					_refreshEducationTypeData();

					// HTTP POST/PUT methods for add/edit role
					// with the help of id, we are going to find out whether it
					// is put or post operation

					$scope.submitEducationType = function() {

						var method = "";
						var url = "";
						// alert($scope.stateForm.id);
						if ($scope.educationtypeForm.id == -1
								|| $scope.educationtypeForm.id == undefined) {
							// Id is absent in form data, it is create new role
							// operation

							method = "POST";
							url = 'http://localhost:8080/visog-job-portal-api/master/educationtype/';
							$http.post(url, {
								"name" : $scope.educationtypeForm.name,
								"discription" : $scope.educationtypeForm.discription
								
							}).then(_success, _error);

						} else {

							// Id is present in form data, it is edit role
							// operation
							id = $scope.educationtypeForm.id;
							method = "PUT";
							url = 'http://localhost:8080/visog-job-portal-api/master/educationType/'
									+ id;
							$http.put(url, {
								"name" : $scope.educationtypeForm.name,
								"discription" : $scope.educationtypeForm.discription
								
							}).then(_success, _error);
							$scope.educationtypeForm.id = -1;
						}
						/*
						 * $http({ method : method, url : url, data :
						 * angular.toJson($scope.genderForm), headers : {
						 * 'Content-Type' : 'application/json' } }).then(
						 * _success, _error );
						 */
					};

					// HTTP DELETE- delete role by Id
					$scope.deleteEducationType = function(educationtype) {
						$http(
								{
									method : 'DELETE',
									url : 'http://localhost:8080/visog-job-portal-api/master/educationtype/'
											+ educationtype.id
								}).then(_success, _error);
					};

					// In case of edit, populate form fields and assign form.id
					// with role id
					$scope.editEducationType = function(educationtype) {

						$scope.educationtypeForm.name = educationtype.name;
						$scope.educationtypeForm.discription = educationtype.discription;
					
						$scope.educationtypeForm.id = educationtype.id;
					};

					/* Private Methods */
					// HTTP GET- get all countries collection
					function _refreshEducationTypeData() {
						$http(
								{
									method : 'GET',
									url : 'http://localhost:8080/visog-job-portal-api/master/educationtype/'
								}).then(function successCallback(response) {
							// alert(response.data.data)
							$scope.educationType = response.data.data;
						}, function errorCallback(response) {
							console.log(response.statusText);
						});
					}

					function _success(response) {

						_refreshStateData();
						_clearFormData()
					}

					function _error(response) {

						console.log(response.statusText);
					}

					// Clear the form
					function _clearFormData() {
						// $scope.cityForm.id = -1;
						$scope.educationtypeForm.name = "";
						$scope.educationtypeForm.discription = "";

					}
					;
				});