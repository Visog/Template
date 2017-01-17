	var app = angular.module("CoursesManagement", []);

	//Controller Part
	app
			.controller(
					"CoursesController",
					function($scope, $http) {

						$scope.courses = [];
						$scope.coursesForm = {
							// id : -1,
							name : "",
							description : "",
						};

						// Now load the data from server
						_refreshCoursesData();

						// HTTP POST/PUT methods for add/edit role
						// with the help of id, we are going to find out whether it
						// is put or post operation

						$scope.submitCourses = function() {

							var method = "";
							var url = "";
							// alert($scope.genderForm.id);
							if ($scope.coursesForm.id == -1
									|| $scope.coursesForm.id == undefined) {
								// Id is absent in form data, it is create new role
								// operation

								method = "POST";
								url = 'http://localhost:8080/visog-job-portal-api/master/courses/';
								$http
										.post(
												url,
												{
													"name" : $scope.coursesForm.name,
													"description" : $scope.coursesForm.description,
													
												}).then(_success, _error);

							} else {

								// Id is present in form data, it is edit role
								// operation
								id = $scope.coursesForm.id;
								method = "PUT";
								url = 'http://localhost:8080/visog-job-portal-api/master/courses/'
										+ id;
								$http
										.put(
												url,
												{
													"name" : $scope.coursesForm.name,
													"code" : $scope.coursesForm.description,
													
												}).then(_success, _error);
								$scope.coursesForm.id = -1;
							}
							/*
							 * $http({ method : method, url : url, data :
							 * angular.toJson($scope.genderForm), headers : {
							 * 'Content-Type' : 'application/json' } }).then(
							 * _success, _error );
							 */
						};

						// HTTP DELETE- delete role by Id
						$scope.deleteCourses = function(courses) {
							$http(
									{
										method : 'DELETE',
										url : 'http://localhost:8080/visog-job-portal-api/master/courses/'
												+ courses.id
									}).then(_success, _error);
						};

						// In case of edit, populate form fields and assign form.id
						// with role id
						$scope.editCourses = function(courses) {

							$scope.coursesForm.name = courses.name;
							$scope.coursesForm.description = courses.description;
							
							$scope.coursesForm.id =courses.id;
						};

						/* Private Methods */
						// HTTP GET- get all countries collection
						function _refreshCoursesData() {
							$http(
									{
										method : 'GET',
										url : 'http://localhost:8080/visog-job-portal-api/master/courses/'
									}).then(function successCallback(response) {
								// alert(response.data.data)
								$scope.countrys = response.data.data;
							}, function errorCallback(response) {
								console.log(response.statusText);
							});
						}

						function _success(response) {

							_refreshCoursesData();
							_clearFormData()
						}

						function _error(response) {

							console.log(response.statusText);
						}

						// Clear the form
						function _clearFormData() {
							// $scope.genderForm.id = -1;
							$scope.coursesForm.name = "";
							$scope.coursesForm.description = "";
							

						}
						;
					});
