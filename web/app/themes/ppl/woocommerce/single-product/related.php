<?php
/**
 * Related Products
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/single-product/related.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see 	    https://docs.woocommerce.com/document/template-structure/
 * @author 		WooThemes
 * @package 	WooCommerce/Templates
 * @version     3.9.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

global $product, $sf_options, $woocommerce_loop, $sf_carouselID;

if ( $related_products ) :

$product_display_columns     = $sf_options['product_display_columns'];
$woocommerce_loop['columns'] = apply_filters( 'loop_shop_columns', $product_display_columns );

if ( $sf_carouselID == "" ) {
    $sf_carouselID = 1;
} else {
    $sf_carouselID ++;
}

$product_display_type    = $sf_options['product_display_type'];
$product_display_gutters = $sf_options['product_display_gutters'];

$gutter_class = "";

if ( ! $product_display_gutters && $product_display_type == "gallery" ) {
    $gutter_class = 'no-gutters';
} else {
    $gutter_class = 'gutters';
}
?>

    <div class="product-carousel spb_content_element">

        <div class="title-wrap clearfix">
            <?php
            $heading = apply_filters( 'woocommerce_product_related_products_heading', __( 'Related products', 'swiftframework' ) );

            if ( $heading ) :
                ?>
                <h2 class="spb-heading"><?php echo esc_html( $heading ); ?></h2>
            <?php endif; ?>

            <div class="carousel-arrows"><a href="#" class="carousel-prev"><i class="ss-navigateleft"></i></a><a
                    href="#" class="carousel-next"><i class="ss-navigateright"></i></a></div>
        </div>

        <div
            class="related products carousel-items <?php echo $gutter_class; ?> product-type-<?php echo $product_display_type; ?>"
            id="carousel-<?php echo $sf_carouselID; ?>" data-columns="<?php echo $woocommerce_loop['columns']; ?>>">

            <?php foreach ( $related_products as $related_product ) : ?>
            
                <?php
                    $post_object = get_post( $related_product->get_id() );
					setup_postdata( $GLOBALS['post'] =& $post_object ); // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited, Squiz.PHP.DisallowMultipleAssignments.Found
                    wc_get_template_part( 'content', 'product' );
                ?>
            <?php endforeach; ?>

        </div>

    </div>

<?php endif;

global $sf_include_carousel, $sf_include_isotope;
$sf_include_carousel = true;
$sf_include_isotope  = true;

wp_reset_postdata();
