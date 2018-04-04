<?php
	// Safely catch the form paramters, only allow the form requested.
	switch ($_GET['form']) {

	    case "kyc":
	    	$template = 'forms/kyc.html';
	        break;

	    case "kyb":
			$template = 'forms/kyb.html';
	        break;

	    default: 
	        // value is not on the list. React accordingly.
	        print "Invalid form Request";
	        end.
	}

	include_once('api/view.php');
	$form = new View();
	$form->render($template);

	phpInfo();
?>