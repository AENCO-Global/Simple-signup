signup_aencoin.controller( 'signupController' , function( $scope, $timeout, $http ){



	$http.get('version.html')
		.then(function(data){
			console.log(data.data);
			$scope.version = data.data;
		})
		, function(data){
			conmsole.log(data);
		};

	$scope.showForm = 'signin';
    
	$scope.doSignup = function(){
        $http.post( 'api/kyc.php' , $scope.formdata )
            .success( function(data){
                if( data.success ){
                    
                }
            })
            .error( function(data){
                //alert('Unknown error talking to server. Please try again later.');
            });
    };
});