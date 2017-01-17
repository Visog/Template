
            var app = angular.module("LanguagesManagement", []);
         
            //Controller Part
            app.controller("LanguagesController", function($scope, $http) {
         
               
                $scope.languages = [];
                $scope.languagesForm = {
                 id : -1,
                   code  : "",
                     name : ""
                };
         
                //Now load the data from server
                _refreshLanguagesData();
         
                //HTTP POST/PUT methods for add/edit role 
                // with the help of id, we are going to find out whether it is put or post operation
                
                $scope.submitLanguages = function() {
         
                    var method = "";
                    var url = "";
                   // alert($scope.roleForm.id);
                    if ($scope.languagesForm.id == -1 || $scope.languagesForm.id == undefined) {
                        //Id is absent in form data, it is create new role operation
                        
                        method = "POST";
                        url = 'http://localhost:8080/visog-job-portal-api/master/languages/';
                        $http.post(url, { "name": $scope.languagesForm.code, "description" : $scope.languagesForm.name }).then( _success, _error ); 
                    
                    } else {
                    	 
                        //Id is present in form data, it is edit role operation
                        id=$scope.languagesForm.id;
                        method = "PUT";
                        url = 'http://localhost:8080/visog-job-portal-api/master/languages/'+ id;
                      $http.put(url, { "name": $scope.languagesForm.code, "description" : $scope.languagesForm.name }).then( _success, _error );
                      $scope.languagesForm.id = -1;
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
                $scope.deleteLanguages = function(languages) {
                    $http({
                        method : 'DELETE',
                        url : 'http://localhost:8080/visog-job-portal-api/master/languages/' + languages.id
                    }).then(_success, _error);
                };
 
             // In case of edit, populate form fields and assign form.id with role id
                $scope.editLanguages = function(languages) {
                  
                    $scope.languagesForm.name = languages.code;
                    $scope.languagesForm.description = languages.name;
                    $scope.languagesForm.id = languages.id;
                };
         
                /* Private Methods */
                //HTTP GET- get all countries collection
                function _refreshLanguagesData() {
                    $http({
                        method : 'GET',
                        url : 'http://localhost:8080/visog-job-portal-api/master/languages/'
                    }).then(function successCallback(response) {
                    	//alert(response.data.data)
                        $scope.languages = response.data.data;
                    }, function errorCallback(response) {
                        console.log(response.statusText);
                    });
                }
         
                function _success(response) {
                	if(response.data.statusCode=='300')
                		{
                	alert(response.data.message);
               			 } 
                    _refreshLanguagesData();
                    _clearFormData()
                }
         
                function _error(response) {
                	
                    console.log(response.statusText);
                }
         
                //Clear the form
                function _clearFormData() {
                    $scope.languagesForm.id = -1;
                    $scope.languagesForm.code = "";
                    $scope.languagesForm.name = "";
                
                };
            });
      