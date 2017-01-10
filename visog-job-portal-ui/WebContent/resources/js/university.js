  var app = angular.module("UniversityManagement", []);
         
            //Controller Part
            app.controller("UniversityController", function($scope, $http) {
         
               
                $scope.countries = [];
                $scope.universityForm = {
                  //  id : -1,
                    name : "",
                    description : ""
                };
         
                //Now load the data from server
                _refreshUniversityData();
         
                //HTTP POST/PUT methods for add/edit role 
                // with the help of id, we are going to find out whether it is put or post operation
                
                $scope.submitUniversity = function() {
         
                    var method = "";
                    var url = "";
                   // alert($scope.roleForm.id);
                    if ($scope.universityForm.id == -1 || $scope.universityForm.id == undefined) {
                        //Id is absent in form data, it is create new university operation
                        
                        method = "POST";
                        url = 'http://localhost:8080/visog-job-portal-api/master/universities/';
                        $http.post(url, { "name": $scope.universityForm.name, "description" : $scope.universityForm.description }).then( _success, _error ); 
                    
                    } else {
                    	 
                        //Id is present in form data, it is edit role operation
                        id=$scope.universityForm.id;
                        method = "PUT";
                        url = 'http://localhost:8080/visog-job-portal-api/master/universities/'+ id;
                      $http.put(url, { "name": $scope.universityForm.name, "description" : $scope.universityForm.description }).then( _success, _error );
                      $scope.universityForm.id = -1;
                    }
 /*         
                    $http({
                        method : method,
                        url : url,
                        data : angular.toJson($scope.roleForm),
                        headers : {
                            'Content-Type' : 'application/json'
                        }
                    }).then( _success, _error ); */
                };
         
                //HTTP DELETE- delete role by Id
                $scope.deleteUniversity = function(university) {
                    $http({
                        method : 'DELETE',
                        url : 'http://localhost:8080/visog-job-portal-api/master/universities/' + university.id
                    }).then(_success, _error);
                };
 
             // In case of edit, populate form fields and assign form.id with role id
                $scope.editUniversity = function(university) {
                  
                    $scope.universityForm.name = university.name;
                    $scope.universityForm.description = university.description;
                    $scope.universityForm.id = university.id;
                };
         
                /* Private Methods */
                //HTTP GET- get all countries collection
                function _refreshUniversityData() {
                    $http({
                        method : 'GET',
                        url : 'http://localhost:8080/visog-job-portal-api/master/universities/'
                    }).then(function successCallback(response) {
                    	//alert(response.data.data)
                        $scope.universities = response.data.data;
                    }, function errorCallback(response) {
                        console.log(response.statusText);
                    });
                }
         
                function _success(response) {
                	
                    _refreshUniversityData();
                    _clearFormData()
                }
         
                function _error(response) {
                	
                    console.log(response.statusText);
                }
         
                //Clear the form
                function _clearFormData() {
                  //  $scope.roleForm.id = -1;
                    $scope.universityForm.name = "";
                    $scope.universityForm.description = "";
                
                };
            });