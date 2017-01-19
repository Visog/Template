	var app = angular.module("ExperienceDetails", []);

	//Controller Part
	app
			.controller(
					"ExperienceDetailsController",
					function($scope, $http) {

						$scope.experienceDetails = [];
						$scope.experienceDetailsForm = {
							// id : -1,
								user : "",
								companyName : "",
								employmentType : "",
								durationFrom:"",
								durationTo:"",
								designation:"",
								jobProfile:""
						};

						// Now load the data from server
						_refreshExperienceDetailsData();

						// HTTP POST/PUT methods for add/edit projectDetails
						// with the help of id, we are going to find out whether it
						// is put or post operation

						$scope.submitExperienceDetails = function() {

							var method = "";
							var url = "";
							// alert($scope.genderForm.id);
							if ($scope.experienceDetailsForm.id == -1
									|| $scope.experienceDetailsForm.id == undefined) {
								// Id is absent in form data, it is create new projectDetails
								// operation

								method = "POST";
								url = 'http://localhost:8080/visog-job-portal-api/transaction/experienceDetails/';
								$http
										.post(
												url,
												{
													"user" : $scope.experienceDetailsForm.user,
													"companyName" : $scope.experienceDetailsForm.companyName,
													"employmentType" : $scope.experienceDetailsForm.employmentType,
													"durationFrom" : $scope.experienceDetailsForm.durationFrom,
													"durationTo" : $scope.experienceDetailsForm.durationTo,
													"teamsize" : $scope.experienceDetailsForm.teamsize,
													"jobProfile" : $scope.experienceDetailsForm.jobProfile

													
												}).then(_success, _error);

							} else {

								// Id is present in form data, it is edit projectDetails
								// operation
								id = $scope.experienceDetailsForm.id;
								method = "PUT";
								url = 'http://localhost:8080/visog-job-portal-api/transaction/experienceDetails/'
										+ id;
								$http
										.put(
												url,
												{
													"user" : $scope.experienceDetailsForm.user,
													"companyName" : $scope.experienceDetailsForm.companyName,
													"employmentType" : $scope.experienceDetailsForm.employmentType,
													"clientName" : $scope.experienceDetailsForm.clientName,
													"durationFrom" : $scope.experienceDetailsForm.durationFrom,
													"durationTo" : $scope.experienceDetailsForm.durationTo,
													"jobProfile" : $scope.experienceDetailsForm.jobProfile
												}).then(_success, _error);
								$scope.experienceDetailsForm.id = -1;
							}
							/*
							 * $http({ method : method, url : url, data :
							 * angular.toJson($scope.genderForm), headers : {
							 * 'Content-Type' : 'application/json' } }).then(
							 * _success, _error );
							 */
						};

						// HTTP DELETE- delete projectDetails by Id
						$scope.deleteExperienceDetails = function(experienceDetails) {
							$http(
									{
										method : 'DELETE',
										url : 'http://localhost:8080/visog-job-portal-api/transaction/experienceDetails/'
												+ country.id
									}).then(_success, _error);
						};

						// In case of edit, populate form fields and assign form.id
						// with projectDetails id
						$scope.editExperienceDetails = function(experienceDetails) {

							$scope.experienceDetailsForm.user = experienceDetails.user;
							$scope.experienceDetailsForm.companyName = experienceDetails.companyName;
							$scope.experienceDetailsForm.employmentType = experienceDetails.employmentType;
							$scope.experienceDetailsForm.durationFrom = experienceDetails.durationFrom;
							$scope.experienceDetailsForm.durationTo = experienceDetails.durationTo;
							$scope.experienceDetailsForm.designation = experienceDetails.designation;
							$scope.experienceDetailsForm.jobProfile = experienceDetails.jobProfile;
							$scope.experienceDetailsForm.id =experienceDetails.id;
						};

						/* Private Methods */
						// HTTP GET- get all countries collection
						function _refreshExperienceDetailsData() {
							$http(
									{
										method : 'GET',
										url : 'http://localhost:8080/visog-job-portal-api/transaction/experienceDetails/'
									}).then(function successCallback(response) {
								// alert(response.data.data)
								$scope.experienceDetailsForm = response.data.data;
							}, function errorCallback(response) {
								console.log(response.statusText);
							});
						}

						function _success(response) {

							_refreshExperienceDetailsData();
							_clearFormData()
						}

						function _error(response) {

							console.log(response.statusText);
						}

						// Clear the form
						function _clearFormData() {
							// $scope.genderForm.id = -1;
							$scope.experienceDetailsForm.user = "";
							$scope.experienceDetailsForm.companyName = "";
							$scope.experienceDetailsForm.employmentType = "";
							$scope.experienceDetailsForm.durationFrom = "";
							$scope.experienceDetailsForm.durationTo = "";
							$scope.experienceDetailsForm.designation = "";
							$scope.experienceDetailsForm.jobProfile = "";


						}
						;
					});
