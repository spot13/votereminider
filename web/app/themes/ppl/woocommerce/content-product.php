<?php
    /**
     * The template for displaying product content within loops.
     *
     * This template can be overridden by copying it to yourtheme/woocommerce/content-product.php.
     *
     * HOWEVER, on occasion WooCommerce will need to update template files and you
     * (the theme developer) will need to copy the new files to your theme to
     * maintain compatibility. We try to do this as little as possible, but it does
     * happen. When this occurs the version of the template file will be bumped and
     * the readme will list any important changes.
     *
     * @see     https://docs.woocommerce.com/document/template-structure/
     * @package WooCommerce/Templates
     * @version 3.6.0
     */

    defined( 'ABSPATH' ) || exit;

    global $woocommerce, $product, $woocommerce_loop, $sf_options, $sf_catalog_mode, $sf_product_multimasonry, $sf_product_display_type, $sf_product_display_layout;

    // Store loop count we're currently on
    if ( empty( $woocommerce_loop['loop'] ) ) {
        $woocommerce_loop['loop'] = 0;
    }

    // Store column count for displaying the grid
    if ( empty( $woocommerce_loop['columns'] ) ) {
        $product_display_columns     = $sf_options['product_display_columns'];
        $woocommerce_loop['columns'] = apply_filters( 'loop_shop_columns', $product_display_columns );
    }

    // Ensure visibility
    if ( ! $product || ! $product->is_visible() ) {
        return;
    }

    // Increase loop count
    $woocommerce_loop['loop'] ++;

    // Extra post classes
    $classes = array();
    if ( 0 == ( $woocommerce_loop['loop'] - 1 ) % $woocommerce_loop['columns'] || 1 == $woocommerce_loop['columns'] ) {
        $classes[] = 'first';
    }
    if ( 0 == $woocommerce_loop['loop'] % $woocommerce_loop['columns'] ) {
        $classes[] = 'last';
    }

    $width = "";

    if ( $woocommerce_loop['columns'] == 4 ) {
        $classes[] = 'col-sm-3';
        $width     = 'col-sm-3';
    } else if ( $woocommerce_loop['columns'] == 5 ) {
        $classes[] = 'col-sm-sf-5';
        $width     = 'col-sm-sf-5';
    } else if ( $woocommerce_loop['columns'] == 3 ) {
        $classes[] = 'col-sm-4';
        $width     = 'col-sm-4';
    } else if ( $woocommerce_loop['columns'] == 2 ) {
        $classes[] = 'col-sm-6';
        $width     = 'col-sm-6';
    } else if ( $woocommerce_loop['columns'] == 1 ) {
        $classes[] = 'col-sm-12';
        $width     = 'col-sm-12';
    } else if ( $woocommerce_loop['columns'] == 6 ) {
        $classes[] = 'col-sm-2';
        $width     = 'col-sm-2';
    }

    $product_display_type    = $sf_options['product_display_type'];
    $product_display_gutters = $sf_options['product_display_gutters'];
    $product_qv_hover        = $sf_options['product_qv_hover'];
    $product_buybtn          = $sf_options['product_buybtn'];
    $product_rating          = $sf_options['product_rating'];
	
	if ( $sf_product_display_type ) {
		$product_display_type = $sf_product_display_type;
	}
	
	if ( $sf_product_display_layout != "" ) {
		$product_layout = $sf_product_display_layout;
	}
	
	if (isset($_GET['layout'])) {
		$product_layout = $_GET['layout'];
	}
	
    if ( $product_qv_hover ) {
        $classes[] = 'qv-hover';
    }
    $classes[] = 'product-display-' . $product_display_type;

    if ( ! $product_display_gutters && $product_display_type == "gallery" ) {
        $classes[] = 'no-gutters';
    }

    if ( $product_buybtn && $product_display_type == "standard" ) {
        $classes[] = 'buy-btn-visible';
    }
    if ( $product_rating && $product_display_type == "standard" ) {
        $classes[] = 'rating-visible';
    }
?>
<?php if ( version_compare( WC_VERSION, '3.6', '>=' ) ) { ?>
<li <?php wc_product_class( $classes, $product ); ?> data-width="<?php echo esc_attr($width); ?>">
<?php } else if ( version_compare( WC_VERSION, '3.4', '>=' ) ) { ?>
<li <?php wc_product_class( $classes ); ?> data-width="<?php echo esc_attr($width); ?>">
<?php } else { ?>
<li <?php post_class( $classes ); ?> data-width="<?php echo esc_attr($width); ?>">
<?php } ?>

    <?php do_action( 'woocommerce_before_shop_loop_item' ); ?>

    <figure class="animated-overlay">

        <?php

            $postdate      = get_the_time( 'Y-m-d' );            // Post date
            $postdatestamp = strtotime( $postdate );            // Timestamped post date
            $newness       = $sf_options['new_badge'];    // Newness in days

            if ( sf_is_out_of_stock() ) {

                echo '<span class="out-of-stock-badge">' . __( 'Out of Stock', 'swiftframework' ) . '</span>';

            } else if ( $product->is_on_sale() ) {

                echo apply_filters( 'woocommerce_sale_flash', '<span class="onsale">' . __( 'Sale!', 'swiftframework' ) . '</span>', $post, $product );

            } else if ( ( time() - ( 60 * 60 * 24 * $newness ) ) < $postdatestamp ) {

                // If the product was published within the newness time frame display the new badge
                echo '<span class="wc-new-badge">' . __( 'New', 'swiftframework' ) . '</span>';

            } else if ( ! $product->get_price() ) {

                echo '<span class="free-badge">' . __( 'Free', 'swiftframework' ) . '</span>';

            }
        ?>

        <?php woocommerce_template_loop_product_thumbnail() ?>

        <?php if ( ! $sf_catalog_mode ) { ?>
            <div class="cart-overlay">
                <div class="shop-actions clearfix">
                    <?php do_action( 'woocommerce_after_shop_loop_item' ); ?>
                </div>
            </div>
        <?php } ?>

        <a href="<?php the_permalink(); ?>"></a>

        <div class="figcaption-wrap"></div>

        <?php if ( $product_display_type != "standard" ) { ?>
            <figcaption>
                <div class="thumb-info">
                    <?php do_action( 'woocommerce_before_shop_loop_item_title' ); ?>
                    <h4><?php the_title(); ?></h4>
                    <h5><?php
                            /**
                             * woocommerce_after_shop_loop_item_title hook
                             *
                             * @hooked woocommerce_template_loop_price - 10
                             */
                            do_action( 'woocommerce_after_shop_loop_item_title' );
                        ?></h5>
                </div>
            </figcaption>

        <?php } ?>

    </figure>

    <?php if ( $product_display_type == "standard" ) { ?>

        <div class="product-details">
            <?php do_action( 'woocommerce_before_shop_loop_item_title' ); ?>
            <h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
            <?php
                if ( function_exists('wc_get_product_category_list') ) {
                echo wc_get_product_category_list( ', ', '<span class="posted_in">', '</span>' ); 
                } else {
                echo $product->get_categories( ', ', '<span class="posted_in">', '</span>' ); 
                }
            ?>
        </div>

        <?php
        /**
         * woocommerce_after_shop_loop_item_title hook
         *
         * @hooked woocommerce_template_loop_price - 10
         */
        do_action( 'woocommerce_after_shop_loop_item_title' );
        ?>

    <?php } ?>

    <?php if ( $product_display_type == "standard" ) { ?>
        <div class="clear"></div>
        <div class="product-actions">
            <?php do_action( 'woocommerce_after_shop_loop_item' ); ?>
        </div>
    <?php } ?>


</li>