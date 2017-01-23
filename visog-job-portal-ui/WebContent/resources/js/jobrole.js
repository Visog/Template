
            var app = angular.module("JobRoleManagement", []);
         
            //Controller Part
            app.controller("JobRoleController", function($scope, $http) {
         
               
                $scope.jobrole = [];
                $scope.jobroleForm = {
                 id : -1,
                    name : "",
                    description : ""
                };
         
                //Now load the data from server
                _refreshJobRoleData();
         
                //HTTP POST/PUT methods for add/edit jobrole 
                // with the help of id, we are going to find out whether it is put or post operation
                
                $scope.submitJobRole = function() {
         
                    var method = "";
                    var url = "";
                   // alert($scope.jobroleForm.id);
                    if ($scope.jobroleForm.id == -1 || $scope.jobroleForm.id == undefined) {
                        //Id is absent in form data, it is create new jobrole operation
                        
                        method = "POST";
                        url = 'http://localhost:8080/visog-job-portal-api/master/jobroles/';
                        $http.post(url, { "name": $scope.jobroleForm.name, "description" : $scope.jobroleForm.description }).then( _success, _error ); 
                    
                    } else {
                    	 
                        //Id is present in form data, it is edit jobrole operation
                        id=$scope.jobroleForm.id;
                        method = "PUT";
                        url = 'http://localhost:8080/visog-job-portal-api/master/jobroles/'+ id;
                      $http.put(url, { "name": $scope.jobroleForm.name, "description" : $scope.jobroleForm.description }).then( _success, _error );
                      $scope.jobroleForm.id = -1;
                    }
 /*         
                    $http({
                        method : method,
                        url : url,
                        data : angular.toJson($scope.jobroleForm),
                        headers : {
                            'Content-Type' : 'application/json'
                        }
                    }).then( _success, _error ); */
                };
         
                //HTTP DELETE- delete jobrole by Id
                $scope.deleteJobRole = function(jobrole) {
                    $http({
                        method : 'DELETE',
                        url : 'http://localhost:8080/visog-job-portal-api/master/jobroles/' + jobrole.id
                    }).then(_success, _error);
                };
 
             // In case of edit, populate form fields and assign form.id with jobrole id
                $scope.editJobRole = function(jobrole) {
                  
                    $scope.jobroleForm.name = jobrole.name;
                    $scope.jobroleForm.description = jobrole.description;
                    $scope.jobroleForm.id = jobrole.id;
                };
         
                /* Private Methods */
                //HTTP GET- get all countries collection
                function _refreshJobRoleData() {
                    $http({
                        method : 'GET',
                        url : 'http://localhost:8080/visog-job-portal-api/master/jobroles/'
                    }).then(function successCallback(response) {
                    	//alert(response.data.data)
                        $scope.jobroles = response.data.data;
                    }, function errorCallback(response) {
                        console.log(response.statusText);
                    });
                }
         
                function _success(response) {
                	if(response.data.statusCode=='300')
                		{
                	alert(response.data.message);
               			 } 
                    _refreshJobRoleData();
                    _clearFormData()
                }
         
                function _error(response) {
                	
                    console.log(response.statusText);
                }
         
                //Clear the form
                function _clearFormData() {
                    $scope.jobroleForm.id = -1;
                    $scope.jobroleForm.name = "";
                    $scope.jobroleForm.description = "";
                
                };
            });
      