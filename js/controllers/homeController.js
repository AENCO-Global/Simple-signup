aencoin.controller( 'homeController' , function( $scope, $timeout, $http ){
    if( checkCookie('email') && checkCookie['key'] ){
        $timeout( function(){
            window.location.assign('#/sign-in');
        });
    }
});