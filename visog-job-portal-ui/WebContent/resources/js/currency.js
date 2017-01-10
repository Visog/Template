var app = angular.module("CurrencyManagement", []);

	//Controller Part
	app.controller(	"CurrencyController",function($scope, $http) {
						$scope.currency = [];
						$scope.currencyForm = {
							// id : -1,
							name : "",
							description : "",
							currency_code : ""
						};

						// Now load the data from server
						_refreshCurrencyData();

						// HTTP POST/PUT methods for add/edit role
						// with the help of id, we are going to find out whether it
						// is put or post operation

						$scope.submitCurrency = function() {

							var method = "";
							var url = "";
							// alert($scope.genderForm.id);
							if ($scope.currencyForm.id == -1
									|| $scope.currencyForm.id == undefined) {
								// Id is absent in form data, it is create new role
								// operation

								method = "POST";
								url = 'http://localhost:8080/visog-job-portal-api/master/currency/';
								$http
										.post(
												url,
												{
													"name" : $scope.currencyForm.name,
													"code" : $scope.currencyForm.description,
													"orderNum" : $scope.currencyForm.currency_code
												}).then(_success, _error);

							} else {

								// Id is present in form data, it is edit role
								// operation
								id = $scope.currencyForm.id;
								method = "PUT";
								url = 'http://localhost:8080/visog-job-portal-api/master/currency/<CURRENCY_ID>/'
										+ id;
								$http
										.put(
												url,
												{
													"name" : $scope.currencyForm.name,
													"description" : $scope.currencyForm.description,
													"currency_code" : $scope.currencyForm.currency_code
												}).then(_success, _error);
								$scope.currencyForm.id = -1;
							}
							/*
							 * $http({ method : method, url : url, data :
							 * angular.toJson($scope.genderForm), headers : {
							 * 'Content-Type' : 'application/json' } }).then(
							 * _success, _error );
							 */
						};

						// HTTP DELETE- delete role by Id
						$scope.deleteCurrency = function(currency) {
							$http(
									{
										method : 'DELETE',
										url : 'http://localhost:8080/visog-job-portal-api/master/currency/<CURRENCY_ID>/'
												+ currency.id
									}).then(_success, _error);
						};

						// In case of edit, populate form fields and assign form.id
						// with role id
						$scope.editCurrency = function(currency) {

							$scope.currencyForm.name = currency.name;
							$scope.currencyForm.description = currency.description;
							$scope.currencyForm.currency_code = currency.currency_code;
							$scope.currencyForm.id =currency.id;
						};

						/* Private Methods */
						// HTTP GET- get all currency collection
						function _refreshCurrencyData() {
							$http(
									{
										method : 'GET',
										url : 'http://localhost:8080/visog-job-portal-api/master/currency/'
									}).then(function successCallback(response) {
								// alert(response.data.data)
								$scope.currencys = response.data.data;
							}, function errorCallback(response) {
								console.log(response.statusText);
							});
						}

						function _success(response) {

							_refreshCurrencyData();
							_clearFormData()
						}

						function _error(response) {

							console.log(response.statusText);
						}

						// Clear the form
						function _clearFormData() {
							// $scope.genderForm.id = -1;
							$scope.currencyForm.name = "";
							$scope.currencyForm.description = "";
							$scope.currencyForm.currency_code = "";

						}
						;
					});