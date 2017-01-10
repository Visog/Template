
            var app = angular.module("FileExtensionManagement", []);
         
            //Controller Part
            app.controller("FileExtensionController", function($scope, $http) {
         
               
                $scope.countries = [];
                $scope.FileExtensionForm = {
                 id : -1,
                    extension : "",
                    description : ""
                };
         
                //Now load the data from server
                _refreshFileData();
         
                //HTTP POST/PUT methods for add/edit file 
                // with the help of id, we are going to find out whether it is put or post operation
                
                $scope.submitFile = function() {
         
                    var method = "";
                    var url = "";
                   // alert($scope.FileExtensionForm.id);
                    if ($scope.FileExtensionForm.id == -1 || $scope.FileExtensionForm.id == undefined) {
                        //Id is absent in form data, it is create new file operation
                        
                        method = "POST";
                        url = 'http://localhost:8080/visog-job-portal-api/master/fileType/';
                        $http.post(url, { "extension": $scope.FileExtensionForm.extension, "description" : $scope.FileExtensionForm.description }).then( _success, _error ); 
                    
                    } else {
                    	 
                        //Id is present in form data, it is edit file operation
                        id=$scope.FileExtensionForm.id;
                        method = "PUT";
                        url = 'http://localhost:8080/visog-job-portal-api/master/fileType/'+ id;
                      $http.put(url, { "extension": $scope.FileExtensionForm.extension, "description" : $scope.FileExtensionForm.description }).then( _success, _error );
                      $scope.FileExtensionForm.id = -1;
                    }
 /*         
                    $http({
                        method : method,
                        url : url,
                        data : angular.toJson($scope.FileExtensionForm),
                        headers : {
                            'Content-Type' : 'application/json'
                        }
                    }).then( _success, _error ); */
                };
         
                //HTTP DELETE- delete file by Id
                $scope.deleteFile = function(file) {
                    $http({
                        method : 'DELETE',
                        url : 'http://localhost:8080/visog-job-portal-api/master/fileType/' + file.id
                    }).then(_success, _error);
                };
 
             // In case of edit, populate form fields and assign form.id with file id
                $scope.editFile = function(file) {
                  
                    $scope.FileExtensionForm.extension = file.extension;
                    $scope.FileExtensionForm.description = file.description;
                    $scope.FileExtensionForm.id = file.id;
                };
         
                /* Private Methods */
                //HTTP GET- get all countries collection
                function _refreshFileData() {
                    $http({
                        method : 'GET',
                        url : 'http://localhost:8080/visog-job-portal-api/master/fileType/'
                    }).then(function successCallback(response) {
                    //	alert(response.data.data)
                        $scope.files = response.data.data;
                    }, function errorCallback(response) {
                        console.log(response.statusText);
                    });
                }
         
                function _success(response) {
                	if(response.data.statusCode=='300')
                		{
                	alert(response.data.message);
               			 } 
                    _refreshFileData();
                    _clearFormData()
                }
         
                function _error(response) {
                	
                    console.log(response.statusText);
                }
         
                //Clear the form
                function _clearFormData() {
                    $scope.FileExtensionForm.id = -1;
                    $scope.FileExtensionForm.extension = "";
                    $scope.FileExtensionForm.description = "";
                
                };
            });
       