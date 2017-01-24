	var app = angular.module("Education Details Management", []);

	//Controller Part
	app
			.controller(
					"Education DetailsController",
					function($scope, $http) {

						$scope.educationDetails = [];
						$scope.educationDetailsForm = {
							// id : -1,
								user : "",
								courses : "",
								educationType : "",
								specialiazation:"",
								university:"",
								
						};

						// Now load the data from server
						_refreshEducationDetailsData();

						// HTTP POST/PUT methods for add/edit projectDetails
						// with the help of id, we are going to find out whether it
						// is put or post operation

						$scope.submitEducationDetails = function() {

							var method = "";
							var url = "";
							// alert($scope.genderForm.id);
							if ($scope.educationDetailsForm.id == -1
									|| $scope.educationDetailsForm.id == undefined) {
								// Id is absent in form data, it is create new projectDetails
								// operation

								method = "POST";
								url = 'http://localhost:8080/visog-job-portal-api/transaction/educationDetails/';
								$http
										.post(
												url,
												{
													"user" : $scope.educationDetailsForm.user,
													"courses" : $scope.educationDetailsForm.courses,
													"educationType" : $scope.educationDetailsForm.educationType,
													"specialiazation" : $scope.educationDetailsForm.specialiazation,
													"university" : $scope.educationDetailsForm.university
													

													
												}).then(_success, _error);

							} else {

								// Id is present in form data, it is edit projectDetails
								// operation
								id = $scope.educationDetailsForm.id;
								method = "PUT";
								url = 'http://localhost:8080/visog-job-portal-api/transaction/educationDetails/'
										+ id;
								$http
										.put(
												url,
												{
													"user" : $scope.educationDetailsForm.user,
													"courses" : $scope.educationDetailsForm.courses,
													"educationType" : $scope.educationDetailsForm.educationType,
													"specialiazation" : $scope.educationDetailsForm.specialiazation,
													"university" : $scope.educationDetailsForm.university
													
												}).then(_success, _error);
								$scope.educationDetailsForm.id = -1;
							}
							/*
							 * $http({ method : method, url : url, data :
							 * angular.toJson($scope.genderForm), headers : {
							 * 'Content-Type' : 'application/json' } }).then(
							 * _success, _error );
							 */
						};

						// HTTP DELETE- delete projectDetails by Id
						$scope.deleteEducationDetails = function(educationDetails) {
							$http(
									{
										method : 'DELETE',
										url : 'http://localhost:8080/visog-job-portal-api/transaction/educationDetails/'
												+ educationDetails.id
									}).then(_success, _error);
						};

						// In case of edit, populate form fields and assign form.id
						// with projectDetails id
						$scope.editEducationDetails = function(educationDetails) {

							$scope.educationDetailsForm.user = educationDetails.user;
							$scope.educationDetailsForm.courses = educationDetails.courses;
							$scope.educationDetailsForm.educationType = educationDetails.educationType;
							$scope.educationDetailsForm.specialiazation = educationDetails.specialiazation;
							$scope.educationDetailsForm.university = educationDetails.university;
					
							$scope.educationDetailsForm.id =educationDetails.id;
						};
 
						/* Private Methods */
						// HTTP GET- get all countries collection
						function _refreshEducationDetailsData() {
							$http(
									{
										method : 'GET',
										url : 'http://localhost:8080/visog-job-portal-api/transaction/educationDetails/'
									}).then(function successCallback(response) {
								// alert(response.data.data)
								$scope.educationDetailsForm = response.data.data;
							}, function errorCallback(response) {
								console.log(response.statusText);
							});
						}

						function _success(response) {

							_refreshEducationDetailsData();
							_clearFormData()
						}

						function _error(response) {

							console.log(response.statusText);
						}

						// Clear the form
						function _clearFormData() {
							// $scope.genderForm.id = -1;
							$scope.educationDetailsForm.user = "";
							$scope.educationDetailsForm.courses = "";
							$scope.educationDetailsForm.educationType = "";
							$scope.educationDetailsForm.specialiazation = "";
							$scope.educationDetailsForm.university = "";
							

						}
						;
					});
