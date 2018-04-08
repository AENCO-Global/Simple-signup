signup_aencoin.controller( 'signupController' , function( $scope, $timeout, $http, $routeParams ){
	$scope.formRequires = true;  //Change to true for production
	
	if( $routeParams.ky == 'kyc' ){ $scope.showForm = 'csignup'; }
	if( $routeParams.ky == 'kyb' ){ $scope.showForm = 'bsignup'; }
		
	$http.get('version.html')
		.then(function(data){
			$scope.version = data.data;
		})
		, function(data){
			console.log(data);
		};

	$http({
			url:'countries.json',
			datatype: 'json',
			method: 'GET',
			headers: { "Content-Type": "application/json" }
		}).then(function(data){ $scope.countries = data.data; })
			,function(data){ console.log(data); };
	
	$scope.doSignup = function(){
		console.log($scope.formdata);
		apiURL = 'api/'+$routeParams.ky+'.php';
		
        $http.post( apiURL , {formdata:$scope.formdata} )
            .then( function(data){
                if( data.success ){
                    
                }
            })
            ,function(data){
                console.log(data);
            };
    };
	
	$scope.reveal_dob = function(){
		$scope.inputFields.dobType='date';
		console.log($scope.inputFields);
	}
	$scope.hide_dob = function(){
		if(!$scope.formdata.dob)$scope.inputFields.dobType='text';
		console.log($scope.inputFields);
	}
});