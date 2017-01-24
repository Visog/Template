	var app = angular.module("PostJobSeeker", []);

	//Controller Part
	app
			.controller(
					"PostJobSeekerController",
					function($scope, $http) {

						$scope.postJobSeeker = [];
						$scope.postJobSeekerForm = {
							// id : -1,
								
								jobSeekerId : "",
								employerId : "",
								postJobId : "",
								statusId:"",
								
						};

						// Now load the data from server
						_refreshPostJobSeekerData();

						// HTTP POST/PUT methods for add/edit postJobSeeker
						// with the help of id, we are going to find out whether it
						// is put or post operation

						$scope.submitPostJobSeeker = function() {

							var method = "";
							var url = "";
							// alert($scope.genderForm.id);
							if ($scope.postJobSeekerForm.id == -1
									|| $scope.postJobSeekerForm.id == undefined) {
								// Id is absent in form data, it is create new postJobSeeker
								// operation

								method = "POST";
								url = 'http://localhost:8080/visog-job-portal-api/transaction/postJobSeeker/';
								$http
										.post(
												url,
												{
													
													"jobSeekerId" : $scope.postJobSeekerForm.jobSeekerId,
													"employerId" : $scope.postJobSeekerForm.employerId,
													"postJobId" : $scope.postJobSeekerForm.postJobId,
													"statusId" : $scope.postJobSeekerForm.statusId
													
												}).then(_success, _error);

							} else {

								// Id is present in form data, it is edit postJobSeeker
								// operation
								id = $scope.postJobSeekerForm.id;
								method = "PUT";
								url = 'http://localhost:8080/visog-job-portal-api/transaction/postJobSeeker/'
										+ id;
								$http
										.put(
												url,
												{
													"jobSeekerId" : $scope.postJobSeekerForm.jobSeekerId,
													"employerId" : $scope.postJobSeekerForm.employerId,
													"postJobId" : $scope.postJobSeekerForm.postJobId,
													"statusId" : $scope.postJobSeekerForm.statusId
													
												}).then(_success, _error);
								$scope.postJobSeekerForm.id = -1;
							}
							/*
							 * $http({ method : method, url : url, data :
							 * angular.toJson($scope.genderForm), headers : {
							 * 'Content-Type' : 'application/json' } }).then(
							 * _success, _error );
							 */
						};

						// HTTP DELETE- delete postJobSeeker by Id
						$scope.deletePostJobSeeker = function(postJobSeeker) {
							$http(
									{
										method : 'DELETE',
										url : 'http://localhost:8080/visog-job-portal-api/transaction/postJobSeeker/'
												+ postJobSeeker.id
									}).then(_success, _error);
						};

						// In case of edit, populate form fields and assign form.id
						// with postJobSeeker id
						$scope.editPostJobSeeker = function(postJobSeeker) {

							$scope.postJobSeekerForm.jobSeekerId = postJobSeeker.jobSeekerId;
							$scope.postJobSeekerForm.employerId = postJobSeeker.employerId;
							$scope.postJobSeekerForm.postJobId = postJobSeeker.postJobId;
							$scope.postJobSeekerForm.statusId = postJobSeeker.statusId;
						
							$scope.postJobSeekerForm.id =postJobSeeker.id;
						};

						/* Private Methods */
						// HTTP GET- get all countries collection
						function _refreshPostJobSeekerData() {
							$http(
									{
										method : 'GET',
										url : 'http://localhost:8080/visog-job-portal-api/transaction/postJobSeeker/'
									}).then(function successCallback(response) {
								// alert(response.data.data)
								$scope.postJobSeekerForm = response.data.data;
							}, function errorCallback(response) {
								console.log(response.statusText);
							});
						}

						function _success(response) {

							_refreshPostJobSeekerData();
							_clearFormData()
						}

						function _error(response) {

							console.log(response.statusText);
						}

						// Clear the form
						function _clearFormData() {
							// $scope.genderForm.id = -1;
							$scope.postJobSeekerForm.jobSeekerId = "";
							$scope.postJobSeekerForm.employerId = "";
							$scope.postJobSeekerForm.postJobId = "";
							$scope.postJobSeekerForm.statusId = "";
						

						}
						;
					});
