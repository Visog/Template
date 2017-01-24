	var app = angular.module("JobSeekerManagement", []);

	//Controller Part
	app
			.controller(
					"JobSeekerController",
					function($scope, $http) {

						$scope.jobseeker = [];
						$scope.jobseekerForm = {
							// id : -1,
									resumeHeadline : "",
				                    domain : "",
				                    companyName : "",
				                    user : "",
				                    keySkills : "",
				                    workExperienceYears : "",
				                    workExperienceMonths : "",
				                    hobbiesAndInterest : "",
				                    jobRole : "",
				                    otherJobRole : "",
				                    industry : "",
				                    profileSummary : "",
				                    employmentType : ""
						};

						// Now load the data from server
						_refreshJobSeekerData();

						// HTTP POST/PUT methods for add/edit role
						// with the help of id, we are going to find out whether it
						// is put or post operation

						$scope.submiJobSeeker = function() {

							var method = "";
							var url = "";
							// alert($scope.genderForm.id);
							if ($scope.jobseekerForm.id == -1
									|| $scope.jobseekerForm.id == undefined) {
								// Id is absent in form data, it is create new role
								// operation

								method = "POST";
								url = 'http://localhost:8080/visog-job-portal-api/transaction/jobseeker/';
								$http
										.post(
												url,
												{
													"resumeHeadline": $scope.jobseekerForm.resumeHeadline,
		                        					"domain": $scope.jobseekerForm.domain,
		                        					"companyName": $scope.jobseekerForm.companyName,
		                        					"user": $scope.jobseekerForm.user,
		                        					"keySkills": $scope.jobseekerForm.keySkills,
		                        					"workExperienceYears": $scope.jobseekerForm.workExperienceYears,
		                        					"workExperienceMonths": $scope.jobseekerForm.workExperienceMonths,
		                        					"hobbiesAndInterest": $scope.jobseekerForm.hobbiesAndInterest,
		                        					"jobRole": $scope.jobseekerForm.jobRole,
		                        					"otherJobRole": $scope.jobseekerForm.otherJobRole,
		                        					"industry": $scope.jobseekerForm.industry,  
		                        					"profileSummary": $scope.jobseekerForm.profileSummary, 
		                        					"employmentType" : $scope.jobseekerForm.employmentType 
												}).then(_success, _error);

							} else {

								// Id is present in form data, it is edit role
								// operation
								id = $scope.jobseekerForm.id;
								method = "PUT";
								url = 'http://localhost:8080/visog-job-portal-api/transaction/jobseeker/'
										+ id;
								$http
										.put(
												url,
												{
													"resumeHeadline": $scope.jobseekerForm.resumeHeadline,
		                        					"domain": $scope.jobseekerForm.domain,
		                        					"companyName": $scope.jobseekerForm.companyName,
		                        					"user": $scope.jobseekerForm.user,
		                        					"keySkills": $scope.jobseekerForm.keySkills,
		                        					"workExperienceYears": $scope.jobseekerForm.workExperienceYears,
		                        					"workExperienceMonths": $scope.jobseekerForm.workExperienceMonths,
		                        					"hobbiesAndInterest": $scope.jobseekerForm.hobbiesAndInterest,
		                        					"jobRole": $scope.jobseekerForm.jobRole,
		                        					"otherJobRole": $scope.jobseekerForm.otherJobRole,
		                        					"industry": $scope.jobseekerForm.industry,  
		                        					"profileSummary": $scope.jobseekerForm.profileSummary, 
		                        					"employmentType" : $scope.jobseekerForm.employmentType 
												}).then(_success, _error);
								$scope.jobseekerForm.id = -1;
							}
							/*
							 * $http({ method : method, url : url, data :
							 * angular.toJson($scope.genderForm), headers : {
							 * 'Content-Type' : 'application/json' } }).then(
							 * _success, _error );
							 */
						};

						// HTTP DELETE- delete role by Id
						$scope.deleteJobSeeker = function(jobseeker) {
							$http(
									{
										method : 'DELETE',
										url : 'http://localhost:8080/visog-job-portal-api/transaction/jobseeker/'
												+ jobseeker.id
									}).then(_success, _error);
						};

						// In case of edit, populate form fields and assign form.id
						// with role id
						$scope.editJobSeeker = function(jobseeker) {

								$scope.jobseekerForm.resumeHeadline = jobseeker.resumeHeadline;
			                    $scope.jobseekerForm.domain = jobseeker.domain;
			                    $scope.jobseekerForm.companyName = jobseeker.companyName;
			                    $scope.jobseekerForm.user = jobseeker.user;
			                    $scope.jobseekerForm.keySkills = jobseeker.keySkills;
			                    $scope.jobseekerForm.workExperienceYears = jobseeker.workExperienceYears;
			                    $scope.jobseekerForm.workExperienceMonths = jobseeker.workExperienceMonths;
			                    $scope.jobseekerForm.hobbiesAndInterest = jobseeker.hobbiesAndInterest;
			                    $scope.jobseekerForm.jobRole = jobseeker.jobRole;
			                    $scope.jobseekerForm.otherJobRole = jobseeker.otherJobRole;
			                    $scope.jobseekerForm.industry = jobseeker.industry;
			                    $scope.jobseekerForm.profileSummary = jobseeker.profileSummary;
			                    $scope.jobseekerForm.employmentType = jobseeker.employmentType;
			                   
			                    $scope.jobseekerForm.id = jobseeker.id;
						};

						/* Private Methods */
						// HTTP GET- get all countries collection
						function _refreshJobSeekerData() {
							$http(
									{
										method : 'GET',
										url : 'http://localhost:8080/visog-job-portal-api/transaction/jobseeker/'
									}).then(function successCallback(response) {
								// alert(response.data.data)
								$scope.jobseekerForm = response.data.data;
							}, function errorCallback(response) {
								console.log(response.statusText);
							});
						}

						function _success(response) {

							_refreshJobSeekerData();
							_clearFormData()
						}

						function _error(response) {

							console.log(response.statusText);
						}

						// Clear the form
						function _clearFormData() {
							// $scope.genderForm.id = -1;
							$scope.jobseekerForm.resumeHeadline = "";
		                    $scope.jobseekerForm.domain = "";
		                    $scope.jobseekerForm.companyName = "";
		                    $scope.jobseekerForm.user = "";
		                    $scope.jobseekerForm.keySkills = "";
		                    $scope.jobseekerForm.workExperienceYears = "";
		                    $scope.jobseekerForm.workExperienceMonths = "";
		                    $scope.jobseekerForm.hobbiesAndInterest = "";
		                    $scope.jobseekerForm.jobRole = "";
		                    $scope.jobseekerForm.otherJobRole = "";
		                    $scope.jobseekerForm.industry = "";
		                    $scope.jobseekerForm.profileSummary = "";
		                    $scope.jobseekerForm.employmentType = "";
							
							
						}
						;
					});
