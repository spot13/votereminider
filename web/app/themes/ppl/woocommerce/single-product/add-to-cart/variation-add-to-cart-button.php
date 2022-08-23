<?php
/**
 * Single variation cart button
 *
 * @see https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce/Templates
 * @version 3.4.0
 */

defined( 'ABSPATH' ) || exit;

global $product;
$loading_text = __( 'Adding...', 'swiftframework' );
$added_text = __( 'Item added', 'swiftframework' );
$icon_class = apply_filters( 'sf_add_to_cart_icon_class', 'sf-icon-add-to-cart' );
$product_id = method_exists( $product, 'get_id' ) ? $product->get_id() : $product->id;
?>
<div class="woocommerce-variation-add-to-cart variations_button">
	<?php do_action( 'woocommerce_before_add_to_cart_button' ); ?>

	<?php
	do_action( 'woocommerce_before_add_to_cart_quantity' );

	woocommerce_quantity_input( array(
		'min_value'   => apply_filters( 'woocommerce_quantity_input_min', $product->get_min_purchase_quantity(), $product ),
		'max_value'   => apply_filters( 'woocommerce_quantity_input_max', $product->get_max_purchase_quantity(), $product ),
		'input_value' => isset( $_POST['quantity'] ) ? wc_stock_amount( wp_unslash( $_POST['quantity'] ) ) : $product->get_min_purchase_quantity(), // WPCS: CSRF ok, input var ok.
	) );

	do_action( 'woocommerce_after_add_to_cart_quantity' );
	?>

	<button type="submit" data-product_id="<?php echo esc_attr($product_id); ?>" data-quantity="1" data-default_text="<?php echo esc_attr($product->single_add_to_cart_text()); ?>" data-default_icon="<?php echo $icon_class; ?>" data-loading_text="<?php echo esc_attr($loading_text); ?>" data-added_text="<?php echo esc_attr($added_text); ?>" class="single_add_to_cart_button button alt"><i class="<?php echo $icon_class; ?>"></i><span><?php echo esc_html( $product->single_add_to_cart_text() ); ?></span></button>

	<?php echo sf_wishlist_button(); ?>

	<?php do_action( 'woocommerce_after_add_to_cart_button' ); ?>

	<input type="hidden" name="add-to-cart" value="<?php echo absint( $product->get_id() ); ?>" />
	<input type="hidden" name="product_id" value="<?php echo absint( $product->get_id() ); ?>" />
	<input type="hidden" name="variation_id" class="variation_id" value="0" />
</div>
