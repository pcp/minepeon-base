<?php

require_once('Mail.php');

/**********************************

Generic functions theat may be called from many differant places

*/

function sendEmail($settings, $subject, $body) {

		$mailSettings = array(
				'host' => $settings['alertSmtp']
			);
			
		if ($settings['alertSMTPAuth']) {
			$mailSettings['auth'] = true;
			$mailSettings['username'] = $settings['alertSmtpAuthUser'];
			$mailSettings['password'] = $settings['alertSmtpAuthPass'];
			$mailSettings['port'] = $settings['alertSmtpAuthPort'];
		}
	
		//$settings['alertDevice']

		$mail = Mail::factory("smtp", $mailSettings );

		$headers = array("From"=>$settings['alertEmail'], "Subject"=>$subject);
		$mail->send($settings['alertEmail'], $headers, $body);		

}

function array_sort_by_column(&$arr, $col, $dir = SORT_ASC) {
    $sort_col = array();
    foreach ($arr as $key=> $row) {
        $sort_col[$key] = $row[$col];
    }

    array_multisort($sort_col, $dir, $arr);
}