<?php
/**
 * The Template for displaying all single products.
 *
 * Override this template by copying it to yourtheme/woocommerce/single-product.php
 *
 * @author 		WooThemes
 * @package 	WooCommerce/Templates
 * @version     1.6.4
 * @xstore-version 9.4.0
 */

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

get_header( 'shop' );

?>

<?php
	/**
	 * woocommerce_before_main_content hook
	 *
	 * @hooked woocommerce_output_content_wrapper - 10 (outputs opening divs for the content)
	 * @hooked woocommerce_breadcrumb - 20
	 */
	do_action('woocommerce_before_main_content');
	
?>

<div class="content-page <?php if( (!get_query_var('etheme_single_product_builder', false) && get_query_var('et_product-layout', 'default') != 'wide') || (get_query_var('etheme_single_product_builder', false) && !get_theme_mod('single_product_full_width_et-desktop', false)) ):  ?>container<?php endif; ?>">
	<?php while ( have_posts() ) : the_post(); ?>

		<?php wc_get_template_part( 'content', 'single-product' ); ?>

	<?php endwhile; // end of the loop. ?>

	<?php
		/**
		 * woocommerce_after_main_content hook
		 *
		 * @hooked woocommerce_output_content_wrapper_end - 10 (outputs closing divs for the content)
		 */
		do_action( 'woocommerce_after_main_content' );
	?>
</div>

<?php get_footer( 'shop' ); ?>