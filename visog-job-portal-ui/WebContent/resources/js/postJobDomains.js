  var app = angular.module("PostJobDomainsManagement", []);
         
            //Controller Part
            app.controller("PostJobDomainsController", function($scope, $http) {
         
               
                $scope.PostJobDomains = [];
                $scope.PostJobDomainsForm = {
                  //  id : -1,
                    postJob : "",
                    domain : ""
                };
         
                //Now load the data from server
                _refreshPostJobDomainsData();
         
                //HTTP POST/PUT methods for add/edit role 
                // with the help of id, we are going to find out whether it is put or post operation
                
                $scope.submitPostJobDomains = function() {
         
                    var method = "";
                    var url = "";
                   // alert($scope.roleForm.id);
                    if ($scope.PostJobDomainsForm.id == -1 || $scope.PostJobDomainsForm.id == undefined) {
                        //Id is absent in form data, it is create new role operation
                        
                        method = "POST";
                        url = 'http://localhost:8080/visog-job-portal-api/transaction/postJobDomains/';
                        $http.post(url, { "postJob": $scope.PostJobDomainsForm.postJob, "domain" : $scope.PostJobDomainsForm.domain }).then( _success, _error ); 
                    
                    } else {
                    	 
                        //Id is present in form data, it is edit role operation
                        id=$scope.PostJobDomainsForm.id;
                        method = "PUT";
                        url = 'http://localhost:8080/visog-job-portal-api/transaction/postJobDomains/'+ id;
                      $http.put(url, { "postJob": $scope.PostJobDomainsForm.postJob, "domain" : $scope.PostJobDomainsForm.domain }).then( _success, _error );
                      $scope.PostJobDomainsForm.id = -1;
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
                $scope.deletePostJobDomains = function(postJobDomains) {
                	if(confirm("Are you sure to Delete ?") == true){
                    $http({
                        method : 'DELETE',
                        url : 'http://localhost:8080/visog-job-portal-api/transaction/postJobDomains/' + postJobDomains.id
                    }).then(_success, _error);
                	}
                };
 
             // In case of edit, populate form fields and assign form.id with role id
                $scope.editPostJobDomains = function(postJobDomain) {
                  
                    $scope.PostJobDomainsForm.postJob = postJobDomain.postJob;
                    $scope.PostJobDomainsForm.domain = postJobDomain.domain;
                    $scope.PostJobDomainsForm.id = postJobDomain.id;
                };
         
                /* Private Methods */
                //HTTP GET- get all countries collection
                function _refreshPostJobDomainsData() {
                    $http({
                        method : 'GET',
                        url : 'http://localhost:8080/visog-job-portal-api/transaction/postJobDomains/'
                    }).then(function successCallback(response) {
                    	//alert(response.data.data)
                        $scope.postJobDomains = response.data.data;
                    }, function errorCallback(response) {
                        console.log(response.statusText);
                    });
                }
         
                function _success(response) {
                	
                	_refreshPostJobDomainsData();
                    _clearFormData()
                }
         
                function _error(response) {
                	
                    console.log(response.statusText);
                }
         
                //Clear the form
                function _clearFormData() {
                  //  $scope.roleForm.id = -1;
                    $scope.PostJobDomainsForm.postJob = "";
                    $scope.PostJobDomainsForm.domain = "";
                
                };
            });