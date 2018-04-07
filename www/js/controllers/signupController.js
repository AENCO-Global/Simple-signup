signup_aencoin.controller( 'signupController' , function( $scope, $timeout, $http ){
	
	$scope.formdata = {title:'', gender:'', type:''};
	$scope.inputFields = {dobType:'text',genderType:'text',titleType:'text'};
	$scope.showForm = 'csignup';
	
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
			headers: {
				"Content-Type": "application/json"
			}
		})
		.then(function(data){
			$scope.countries = data.data;
		})
		, function(data){
			console.log(data);
		};
	
	$scope.doSignup = function(){
		console.log($scope.formdata);
		exit;
		stop;
		
        $http.post( 'api/kyc.php' , $scope.formdata )
            .success( function(data){
                if( data.success ){
                    
                }
            })
            .error( function(data){
                console.log('Unknown error talking to server. Please try again later.');
            });
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