
            var app = angular.module("FileTypeManagement", []);
         
            //Controller Part
            app.controller("FileTypeController", function($scope, $http) {
         
               
                $scope.filetype = [];
                $scope.filetypeForm = {
                 id : -1,
                    extension : "",
                    description : ""
                };
         
                //Now load the data from server
                _refreshFileTypeData();
         
                //HTTP POST/PUT methods for add/edit file 
                // with the help of id, we are going to find out whether it is put or post operation
                
                $scope.submitFileType = function() {
         
                    var method = "";
                    var url = "";
                   // alert($scope.FileExtensionForm.id);
                    if ($scope.filetypeForm.id == -1 || $scope.filetypeForm.id == undefined) {
                        //Id is absent in form data, it is create new file operation
                        
                        method = "POST";
                        url = 'http://localhost:8080/visog-job-portal-api/master/fileType/';
                        $http.post(url, { "extension": $scope.filetypeForm.extension, "description" : $scope.filetypeForm.description }).then( _success, _error ); 
                    
                    } else {
                    	 
                        //Id is present in form data, it is edit file operation
                        id=$scope.filetypeForm.id;
                        method = "PUT";
                        url = 'http://localhost:8080/visog-job-portal-api/master/fileType/'+ id;
                      $http.put(url, { "extension": $scope.filetypeForm.extension, "description" : $scope.filetypeForm.description }).then( _success, _error );
                      $scope.filetypeForm.id = -1;
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
                $scope.deleteFileType = function(filetype) {
                    $http({
                        method : 'DELETE',
                        url : 'http://localhost:8080/visog-job-portal-api/master/fileType/' + file.id
                    }).then(_success, _error);
                };
 
             // In case of edit, populate form fields and assign form.id with file id
                $scope.editFileType = function(filetype) {
                  
                    $scope.filetypeForm.extension = filetype.extension;
                    $scope.filetypeForm.description = filetype.description;
                    $scope.filetypeForm.id = filetype.id;
                };
         
                /* Private Methods */
                //HTTP GET- get all countries collection
                function _refreshFileTypeData() {
                    $http({
                        method : 'GET',
                        url : 'http://localhost:8080/visog-job-portal-api/master/fileType/'
                    }).then(function successCallback(response) {
                    //	alert(response.data.data)
                        $scope.filetype = response.data.data;
                    }, function errorCallback(response) {
                        console.log(response.statusText);
                    });
                }
         
                function _success(response) {
                	if(response.data.statusCode=='300')
                		{
                	alert(response.data.message);
               			 } 
                    _refreshFileTypeData();
                    _clearFormData()
                }
         
                function _error(response) {
                	
                    console.log(response.statusText);
                }
         
                //Clear the form
                function _clearFormData() {
                    $scope.filetypeForm.id = -1;
                    $scope.filetypeForm.extension = "";
                    $scope.filetypeForm.description = "";
                
                };
            });
       