	var app = angular.module("PostJobManagement", []);

	//Controller Part
	app
			.controller(
					"PostJobController",
					function($scope, $http) {

						$scope.postjob = [];
						$scope.postjobForm = {
							// id : -1,
								user : "",
								jobTitle : "",
								jobDescription : "",
								annualPackageFrom : "",
								annualPackageTo : "",
								currency : "",
								company : "",
								effectedDateFrom : "",
								effectedDateTo : "",
								status : "",
								minExperience : "",
								phoneNo : "",
								walkIn : ""
						};

						// Now load the data from server
						_refreshPostJobData();

						// HTTP POST/PUT methods for add/edit role
						// with the help of id, we are going to find out whether it
						// is put or post operation

						$scope.submiPostJob = function() {

							var method = "";
							var url = "";
							// alert($scope.genderForm.id);
							if ($scope.postjobForm.id == -1
									|| $scope.postjobForm.id == undefined) {
								// Id is absent in form data, it is create new role
								// operation

								method = "POST";
								url = 'http://localhost:8080/visog-job-portal-api/transaction/postJob/';
								$http
										.post(
												url,
												{
													"user" : $scope.postjobForm.user,
													"jobTitle" : $scope.postjobForm.jobTitle,
													"jobDescription" : $scope.postjobForm.jobDescription,
													"annualPackageFrom" : $scope.postjobForm.annualPackageFrom,
													"annualPackageTo" : $scope.postjobForm.annualPackageTo,
													"currency" : $scope.postjobForm.currency,
													"company" : $scope.postjobForm.company,
													"effectedDateFrom" : $scope.postjobForm.effectedDateFrom,
													"effectedDateTo" : $scope.postjobForm.effectedDateTo,
													"status" : $scope.postjobForm.status,
													"minExperience" : $scope.postjobForm.minExperience,
													"phoneNo" : $scope.postjobForm.phoneNo,
													"walkIn" : $scope.postjobForm.walkIn
												}).then(_success, _error);

							} else {

								// Id is present in form data, it is edit role
								// operation
								id = $scope.postjobForm.id;
								method = "PUT";
								url = 'http://localhost:8080/visog-job-portal-api/transaction/postJob/'
										+ id;
								$http
										.put(
												url,
												{
													
													"user" : $scope.postjobForm.user,
													"jobTitle" : $scope.postjobForm.jobTitle,
													"jobDescription" : $scope.postjobForm.jobDescription,
													"annualPackageFrom" : $scope.postjobForm.annualPackageFrom,
													"annualPackageTo" : $scope.postjobForm.annualPackageTo,
													"currency" : $scope.postjobForm.currency,
													"company" : $scope.postjobForm.company,
													"effectedDateFrom" : $scope.postjobForm.effectedDateFrom,
													"effectedDateTo" : $scope.postjobForm.effectedDateTo,
													"status" : $scope.postjobForm.status,
													"minExperience" : $scope.postjobForm.minExperience,
													"phoneNo" : $scope.postjobForm.phoneNo,
													"walkIn" : $scope.postjobForm.walkIn
													
												}).then(_success, _error);
								$scope.postjobForm.id = -1;
							}
							/*
							 * $http({ method : method, url : url, data :
							 * angular.toJson($scope.genderForm), headers : {
							 * 'Content-Type' : 'application/json' } }).then(
							 * _success, _error );
							 */
						};

						// HTTP DELETE- delete role by Id
						$scope.deletePostJob = function(postjob) {
							if(confirm("Are you sure to Delete ?") == true){
							$http(
									{
										method : 'DELETE',
										url : 'http://localhost:8080/visog-job-portal-api/transaction/postJob/'
												+ postjob.id
									}).then(_success, _error);
							}
						};

						// In case of edit, populate form fields and assign form.id
						// with role id
						$scope.editPostJob = function(postjob) {

							$scope.postjobForm.user = postjob.user;
							$scope.postjobForm.jobTitle = postjob.jobTitle;
							$scope.postjobForm.jobDescription = postjob.jobDescription;
							$scope.postjobForm.annualPackageFrom = postjob.annualPackageFrom;
							$scope.postjobForm.annualPackageTo = postjob.annualPackageTo;
							$scope.postjobForm.currency = postjob.currency;
							$scope.postjobForm.company = postjob.company;
							$scope.postjobForm.effectedDateFrom = postjob.effectedDateFrom;
							$scope.postjobForm.effectedDateTo = postjob.effectedDateTo;
							$scope.postjobForm.status = postjob.status;
							$scope.postjobForm.minExperience = postjob.minExperience;
							$scope.postjobForm.phoneNo = postjob.phoneNo;
							$scope.postjobForm.walkIn = postjob.walkIn;
							$scope.postjobForm.id =postjob.id;
						};

						/* Private Methods */
						// HTTP GET- get all countries collection
						function _refreshPostJobData() {
							$http(
									{
										method : 'GET',
										url : 'http://localhost:8080/visog-job-portal-api/transaction/postJob/'
									}).then(function successCallback(response) {
								// alert(response.data.data)
								$scope.postJobForm = response.data.data;
							}, function errorCallback(response) {
								console.log(response.statusText);
							});
						}

						function _success(response) {

							_refreshPostJobData();
							_clearFormData()
						}

						function _error(response) {

							console.log(response.statusText);
						}

						// Clear the form
						function _clearFormData() {
							// $scope.genderForm.id = -1;
							$scope.postjobForm.user = "";
							$scope.postjobForm.jobTitle = "";
							$scope.postjobForm.jobDescription = "";
							$scope.postjobForm.annualPackageFrom = "";
							$scope.postjobForm.annualPackageTo = "";
							$scope.postjobForm.currency = "";
							$scope.postjobForm.company = "";
							$scope.postjobForm.effectedDateFrom = "";
							$scope.postjobForm.effectedDateTo = "";
							$scope.postjobForm.status = "";
							$scope.postjobForm.minExperience = "";
							$scope.postjobForm.phoneNo = "";
							$scope.postjobForm.walkIn = "";

						}
						;
					});
