<?php

require_once 'MailChimp.php';
use \DrewM\MailChimp\MailChimp;
 
// Email address verification
function isEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}
  
if($_POST) {
  
    $mailchimp_api_key = 'cba087f2707f0431493db0b4a62f6002-us14'; // enter your MailChimp API Key
    // ****
    $mailchimp_list_id = '139874216c'; // enter your MailChimp List ID
    // ****
  
    $subscriber_email = addslashes( trim( $_POST['email'] ) );
  
    if( !isEmail($subscriber_email) ) {
        $array = array();
        $array['valid'] = 0;
        $array['message'] = 'Insert a valid email address!';
        echo json_encode($array);
    }
    else {
        $array = array();
          
        $MailChimp = new MailChimp($mailchimp_api_key);
         
        $result = $MailChimp->post("lists/$mailchimp_list_id/members", [
                'email_address' => $subscriber_email,
                'status'        => 'pending',
        ]);
          
        if($result == false) {
            $array['valid'] = 0;
            $array['message'] = 'An error occurred! Please try again later.';
        }
        else {
            $array['valid'] = 1;
            $array['message'] = 'Thanks for your subscription! We sent you a confirmation email.';
        }
  
            echo json_encode($array);
  
    }
  
}