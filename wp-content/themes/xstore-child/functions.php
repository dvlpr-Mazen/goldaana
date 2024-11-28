<?php
add_action( 'wp_enqueue_scripts', 'theme_enqueue_styles', 1001 );
function theme_enqueue_styles() {
	if (function_exists('etheme_child_styles')){
		etheme_child_styles();
	}
}


function enqueue_custom_inline_script() {
   
    wp_enqueue_script('jquery');
    
  
    $custom_js = "
   
    
        jQuery(document).ready(function($){ 
         $(document).on('et_ajax_element_loaded', function (event, data) {
                if (data.element == 'etheme_products'){
                    console.log('custom code started to show');
                }
                });
    /*-------------------------------------------------------------------*/
			$(document).on('etheme_product_grid_ajax_loaded', function() {
            	console.log('etheme_product_grid_ajax_loaded is applied');
        	})
		});
    ";
    wp_add_inline_script('jquery', $custom_js); // Attach the inline script after jQuery
}
add_action('wp_enqueue_scripts', 'enqueue_custom_inline_script');





// function block_non_mobile_users() {
   
//     if (!wp_is_mobile()) {
//         wp_redirect('https://google.com/'); 
//         exit();
//     }
// }
// add_action('template_redirect', 'block_non_mobile_users');