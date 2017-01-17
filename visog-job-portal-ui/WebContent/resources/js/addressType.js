
            var app = angular.module("AddressTypeManagement", []);
         
            //Controller Part
            app.controller("AddressTypeController", function($scope, $http) {
         
               
                $scope.addresstype = [];
                $scope.addresstypeForm = {
                 id : -1,
                    name : "",
                    description : ""
                };
         
                //Now load the data from server
                _refreshAddressTypeData();
         
                //HTTP POST/PUT methods for add/edit role 
                // with the help of id, we are going to find out whether it is put or post operation
                
                $scope.submitAddressType = function() {
         
                    var method = "";
                    var url = "";
                   // alert($scope.roleForm.id);
                    if ($scope.addressForm.id == -1 || $scope.addresstypeForm.id == undefined) {
                        //Id is absent in form data, it is create new role operation
                        
                        method = "POST";
                        url = 'http://localhost:8080/visog-job-portal-api/master/addressType/';
                        $http.post(url, { "name": $scope.addresstypeForm.name, "description" : $scope.addresstypeForm.description }).then( _success, _error ); 
                    
                    } else {
                    	 
                        //Id is present in form data, it is edit role operation
                        id=$scope.addresstypeForm.id;
                        method = "PUT";
                        url = 'http://localhost:8080/visog-job-portal-api/master/addressType/'+ id;
                      $http.put(url, { "name": $scope.addresstypeForm.name, "description" : $scope.addresstypeForm.description }).then( _success, _error );
                      $scope.addresstypeForm.id = -1;
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
                $scope.deleteAddressType = function(addresstype) {
                    $http({
                        method : 'DELETE',
                        url : 'http://localhost:8080/visog-job-portal-api/master/addressType/' + addresstype.id
                    }).then(_success, _error);
                };
 
             // In case of edit, populate form fields and assign form.id with role id
                $scope.editAddressType = function(addresstype) {
                  
                    $scope.addresstypeForm.name = addresstype.name;
                    $scope.addresstypeForm.description = addresstype.description;
                    $scope.addresstypeForm.id = addresstype.id;
                };
         
                /* Private Methods */
                //HTTP GET- get all countries collection
                function _refreshAddressTypeData() {
                    $http({
                        method : 'GET',
                        url : 'http://localhost:8080/visog-job-portal-api/master/addressType/'
                    }).then(function successCallback(response) {
                    	//alert(response.data.data)
                        $scope.address = response.data.data;
                    }, function errorCallback(response) {
                        console.log(response.statusText);
                    });
                }
         
                function _success(response) {
                	if(response.data.statusCode=='300')
                		{
                	alert(response.data.message);
               			 } 
                    _refreshAddressTypeData();
                    _clearFormData()
                }
         
                function _error(response) {
                	
                    console.log(response.statusText);
                }
         
                //Clear the form
                function _clearFormData() {
                    $scope.addresstypeForm.id = -1;
                    $scope.addresstypeForm.name = "";
                    $scope.addresstypeForm.description = "";
                
                };
            });
      