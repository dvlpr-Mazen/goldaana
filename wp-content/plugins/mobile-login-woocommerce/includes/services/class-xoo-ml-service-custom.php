<?php

class Xoo_Ml_Service_Custom extends Xoo_Ml_Service{

	public $apiparams, $url, $method;

	public function __construct(){

		$this->id 			= 'custom';
		$this->apiparams 	= wp_parse_args( html_entity_decode( xoo_ml_helper()->get_service_option('cus-params') ) );
		$this->url 			= xoo_ml_helper()->get_service_option('cus-url');
		$this->method 		= xoo_ml_helper()->get_service_option('cus-method');
			
	}

	public function sendSMS( $phone, $message ){

		$validate = $this->validate( array( $this->url ) );

		if( is_wp_error( $validate ) ){
			return $validate;
		}

		$placeholders = array(
			'[phone_number]' 	=> $phone,
			'[message]' 		=> $message
		);

		$apiparams = $this->apiparams;

		foreach ( $apiparams as $key => $value ) {
			if( isset( $placeholders[ $value ] ) ){
				$apiparams[ $key ] = $placeholders[$value];
			}
		}

		if( isset( $apiparams['username'] ) ){
			$this->username = $apiparams['username'];
		}

		if( isset( $apiparams['password'] ) ){
			$this->password = $apiparams['password'];
		}


		//HTTP POST
		$args = array(	
			'method' 	=> $this->method,
	 		'body' 		=> $apiparams
	    );

		return $this->http_request( $args );

	}

}

return new Xoo_Ml_Service_Custom();

?>