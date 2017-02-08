	var app = angular.module("DomainManagement", []);

	//Controller Part
	app
			.controller(
					"DomainController",
					function($scope, $http) {

						$scope.domain = [];
						$scope.domainForm = {
							// id : -1,
							name : "",
							description : "",
						};

						// Now load the data from server
						_refreshDomainData();

						// HTTP POST/PUT methods for add/edit domain
						// with the help of id, we are going to find out whether it
						// is put or post operation

						$scope.submitDomain = function() {

							var method = "";
							var url = "";
							// alert($scope.genderForm.id);
							if ($scope.domainForm.id == -1
									|| $scope.domainForm.id == undefined) {
								// Id is absent in form data, it is create new domain
								// operation

								method = "POST";
								url = 'http://localhost:8080/visog-job-portal-api/master/domain/';
								$http
										.post(
												url,
												{
													"name" : $scope.domainForm.name,
													"description" : $scope.domainForm.description,
													
												}).then(_success, _error);

							} else {

								// Id is present in form data, it is edit domain
								// operation
								id = $scope.domainForm.id;
								method = "PUT";
								url = 'http://localhost:8080/visog-job-portal-api/master/domain/'
										+ id;
								$http
										.put(
												url,
												{
													"name" : $scope.domainForm.name,
													"code" : $scope.domainForm.description,
													
												}).then(_success, _error);
								$scope.domainForm.id = -1;
							}
							/*
							 * $http({ method : method, url : url, data :
							 * angular.toJson($scope.genderForm), headers : {
							 * 'Content-Type' : 'application/json' } }).then(
							 * _success, _error );
							 */
						};

						// HTTP DELETE- delete domain by Id
						$scope.deleteDomain = function(domain) {
							if(confirm("Are you sure to Delete ?") == true){
							$http(
									{
										method : 'DELETE',
										url : 'http://localhost:8080/visog-job-portal-api/master/domain/'
												+ domain.id
									}).then(_success, _error);
							}
						};

						// In case of edit, populate form fields and assign form.id
						// with domain id
						$scope.editDomain = function(domain) {

							$scope.domainForm.name = domain.name;
							$scope.domainForm.description = domain.description;
							
							$scope.domainForm.id =domain.id;
						};

						/* Private Methods */
						// HTTP GET- get all countries collection
						function _refreshDomainData() {
							$http(
									{
										method : 'GET',
										url : 'http://localhost:8080/visog-job-portal-api/master/domain/'
									}).then(function successCallback(response) {
								// alert(response.data.data)
								$scope.domain = response.data.data;
							}, function errorCallback(response) {
								console.log(response.statusText);
							});
						}

						function _success(response) {

							_refreshDomainData();
							_clearFormData()
						}

						function _error(response) {

							console.log(response.statusText);
						}

						// Clear the form
						function _clearFormData() {
							// $scope.genderForm.id = -1;
							$scope.domainForm.name = "";
							$scope.domainForm.description = "";
							

						}
						;
					});
