var app = angular.module("IndustryManagement", []);

// Controller Part
app
		.controller(
				"IndustryController",
				function($scope, $http) {

					$scope.industry = [];
					$scope.industryForm = {
					 id : -1,
						name : "",
						description : ""
					};

					// Now load the data from server
					_refreshIndustryData();

					// HTTP POST/PUT methods for add/edit role
					// with the help of id, we are going to find out whether it
					// is put or post operation

					$scope.submitIndustry = function() {

						var method = "";
						var url = "";
						// alert($scope.cityForm.id);
						if ($scope.industryForm.id == -1
								|| $scope.industryForm.id == undefined) {
							// Id is absent in form data, it is create new role
							// operation

							method = "POST";
							url = 'http://localhost:8080/visog-job-portal-api/master/industry/';
							$http.post(url, {
								"name" : $scope.industryForm.name,
								"description" : $scope.industryForm.description
								
							}).then(_success, _error);

						} else {

							// Id is present in form data, it is edit role
							// operation
							id = $scope.industryForm.id;
							method = "PUT";
							url = 'http://localhost:8080/visog-job-portal-api/master/industry/'
									+ id;
							$http.put(url, {
								"name" : $scope.industryForm.name,
								"description" : $scope.industryForm.description
					
							}).then(_success, _error);
							$scope.industryForm.id = -1;
						}
						/*
						 * $http({ method : method, url : url, data :
						 * angular.toJson($scope.genderForm), headers : {
						 * 'Content-Type' : 'application/json' } }).then(
						 * _success, _error );
						 */
					};

					// HTTP DELETE- delete role by Id
					$scope.deleteIndustry = function(industry) {
						if(confirm("Are you sure to Delete ?") == true){
						$http(
								{
									method : 'DELETE',
									url : 'http://localhost:8080/visog-job-portal-api/master/industry/'
											+ industry.id
								}).then(_success, _error);
						}
					};

					// In case of edit, populate form fields and assign form.id
					// with role id
					$scope.editIndustry = function(industry) {

						$scope.industryForm.name = industry.name;
						$scope.industryForm.description = industry.description;
						$scope.industryForm.id = industry.id;
					};

					/* Private Methods */
					// HTTP GET- get all countries collection
					function _refreshIndustryData() {
						$http(
								{
									method : 'GET',
									url : 'http://localhost:8080/visog-job-portal-api/master/industry/'
								}).then(function successCallback(response) {
							// alert(response.data.data)
							$scope.industry = response.data.data;
						}, function errorCallback(response) {
							console.log(response.statusText);
						});
					}

					function _success(response) {

						_refreshIndustryData();
						_clearFormData()
					}

					function _error(response) {

						console.log(response.statusText);
					}

					// Clear the form
					function _clearFormData() {
						// $scope.cityForm.id = -1;
						$scope.industryForm.name = "";
						$scope.industryForm.description = "";

					}
					;
				});