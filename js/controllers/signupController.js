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
    
	$scope.doLogin = function(){
        $http.post( 'api/auth.php' , $scope.formdata )
            .success( function(data){
                var cdays = false;
                if( data.success ){
                    if( $scope.formdata.remember ){
                        cdays = 1000;
                    }
                    setCookie('email', $scope.formdata.email, cdays );
                    setCookie('key', data.key, cdays );
                    $scope.data.authorised = true;
                    $scope.data.customer_name = data.customer_name;
                    window.location.assign('#/orders');
                }else{
                    $scope.formError = data.message;
                    $scope.data.authorised = false;
                    $timeout( function(){
                        $scope.formError = '';
                    },5000);
                }
            })
            .error( function(data){
                alert('Unknown error talking to server. Please try again later.');
            });
    };
});