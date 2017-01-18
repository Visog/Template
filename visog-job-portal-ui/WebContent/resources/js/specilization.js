

    var app = angular.module("SpecilizationManagement", []);
         
            // Controller Part
            app.controller("SpecilizationController", function($scope, $http) {
         
               
                $scope.Specilization = [];
                $scope.specilizationForm = {
                  // id : -1,
                    name : "",
                    description : ""
                };
         
                // Now load the data from server
                _refreshspecilizationData();
         
                // HTTP POST/PUT methods for add/edit role
                // with the help of id, we are going to find out whether it is
				// put or post operation
                
                $scope.submitSpecilization = function() {
         
                    var method = "";
                    var url = "";
                   // alert($scope.roleForm.id);
                    if ($scope.specilizationForm.id == -1 || $scope.specilizationForm.id == undefined) {
                        // Id is absent in form data, it is create new role
						// operation
                        
                        method = "POST";
                        url = 'http://localhost:8080/visog-job-portal-api/master/specialization/';
                        $http.post(url, { "name": $scope.specilizationForm.name, "description" : $scope.specilizationForm.description }).then( _success, _error ); 
                    
                    } else {
                    	 
                        // Id is present in form data, it is edit role operation
                        id=$scope.specilizationForm.id;
                        method = "PUT";
                        url = 'http://localhost:8080/visog-job-portal-api/master/specialization/'+ id;
                      $http.put(url, { "name": $scope.specilizationForm.name, "description" : $scope.specilizationForm.description }).then( _success, _error );
                      $scope.specilizationForm.id = -1;
                    }
 /*
	 * $http({ method : method, url : url, data :
	 * angular.toJson($scope.roleForm), headers : { 'Content-Type' :
	 * 'application/json' } }).then( _success, _error );
	 */
                };
         
                // HTTP DELETE- delete role by Id
                $scope.deleteSpecilization = function(specilization) {
                    $http({
                        method : 'DELETE',
                        url : 'http://localhost:8080/visog-job-portal-api/master/specialization/' + specilization.id
                    }).then(_success, _error);
                };
 
             // In case of edit, populate form fields and assign form.id with
				// role id
                $scope.editSpecilization = function(specilization) {
                  
                    $scope.specilizationForm.name = specilization.name;
                    $scope.specilizationForm.description = specilization.description;
                    $scope.specilizationForm.id = specilization.id;
                };
         
                /* Private Methods */
                // HTTP GET- get all countries collection
                function _refreshSpecilizationData() {
                    $http({
                        method : 'GET',
                        url : 'http://localhost:8080/visog-job-portal-api/master/specialization/'
                    }).then(function successCallback(response) {
                    	// alert(response.data.data)
                        $scope.specilization = response.data.data;
                    }, function errorCallback(response) {
                        console.log(response.statusText);
                    });
                }
         
                function _success(response) {
                	
                    _refreshSpecilizationData();
                    _clearFormData()
                }
         
                function _error(response) {
                	
                    console.log(response.statusText);
                }
         
                // Clear the form
                function _clearFormData() {
                  // $scope.roleForm.id = -1;
                    $scope.specilizationForm.name = "";
                    $scope.specilizationForm.description = "";
                
                };
            });
       