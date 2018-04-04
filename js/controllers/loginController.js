aencoin.controller( 'loginController' , function( $scope, $timeout, $http ){

    var email = checkCookie('email');
    var key = checkCookie('key');

    if( email && key ){
        $http.post('api/auth.php' , { email: getCookie('email'), key: getCookie('key') } )
            .success( function(data){
                if( data.success ){
                    $scope.data.authorised = true;
                    $scope.data.customer_name = data.customer_name;
                    window.location.assign('#/orders');
                }
            })
            .error( function(data){
                alert('unknown error talking to server. Please try again later.');
            });
    }else{
        $scope.showForm = 'signin';
    }

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

    $scope.sendPass = function(){
        $http.post( 'api/send-pass.php' , $scope.formdata )
            .success( function(data){
                if( data.success ){
                    $scope.showForm = 'sent';
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