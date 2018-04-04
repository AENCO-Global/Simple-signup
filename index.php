<?php
/* Loading page to load forms to catch the following
	 -------------------------------
	| signup.aencoin.com?form=kyc   |
	| signup.aencoin.com?form=kyb   |
	| signup.aencoin.com?form=login |
	 -------------------------------
*/
// Safely catch the form paramters, only allow the form requested.
	if (isset($_REQUEST['form'])) 
		$form = $_REQUEST['form'];
	else
		$form = "";

	switch ($form) {

	    case "kyc":
	    	$template = 'forms/kyc.html';
	        break;

	    case "kyb":
			$template = 'forms/kyb.html';
	        break;

	    default:
	        // default form
	    	$template = 'forms/kyc.html';
	    	break;
	}

	include_once('api/view.php');
	$form = new View();
	$form->render($template);













































































































































// What are you doing dow here you IDIOT?
?>