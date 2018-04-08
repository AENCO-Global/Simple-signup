var signup_aencoin = angular.module('signup_aencoin', ['ngAnimate','ngRoute','ngSanitize','ui.bootstrap','ngIntlTelInput']);

signup_aencoin.config(function( $routeProvider, $locationProvider, ngIntlTelInputProvider ){
    $routeProvider
        .when('/', { templateUrl: 'snippets/choose.html', controller: 'chooseController' })
		.when('/:ky', { templateUrl: 'snippets/signup.html', controller: 'signupController' })
        .otherwise({ redirectTo: '/' });
		
/*	$locationProvider.html5Mode({
		enabled: true,
		requireBase: true
	});
*/
	 ngIntlTelInputProvider.set({excludeCountries: ['us','cn','bi','by','cu','cf','cd','ci','ir','iq','lb','ly','mm','kp','so','sy','sd','ua','ru','ve','ye','zw']});
});

signup_aencoin.controller( 'appinit' , function( $scope, $timeout, $http ){
    if( ! $scope.data ){ $scope.data = { authorised: false }; }

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
    }

    $scope.signOut = function(){
        $scope.data.authorised = false;
        setCookie( 'email', '', -1 );
        setCookie( 'key', '', -1 );
        window.location.assign('#/sign-in');
    }
});

signup_aencoin.directive('loading', function ($http, $timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            scope.isLoading = function () {
                return $http.pendingRequests.length > 0;
            };
            scope.$watch(scope.isLoading, function (value) {
                if (value) {
                    $timeout( function(){
                        element.removeClass('ng-hide');
                    });
                } else {
                    $timeout( function(){
                        element.addClass('ng-hide');
                    },300);
                }
            });
        }
    };
});

signup_aencoin.directive('stringToNumber', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
            ngModel.$parsers.push(function(value) {
                return '' + value;
            });
            ngModel.$formatters.push(function(value) {
                return parseFloat(value, 10);
            });
        }
    };
});

signup_aencoin.filter("asDate", function(){
    return function (input) {
        return new Date(input);
    }
});

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    var cc =  cname + "=" + cvalue;
    if( exdays ){ cc += "; " + expires; }
    cc += "; path=/";
    document.cookie = cc;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}

function checkCookie( cname ) {
    var c=getCookie( cname );
    if (c!="") {
       return c
    } else {
        return false;
    }
}