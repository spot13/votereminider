<?php
/**
 * Single Product tabs
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/single-product/tabs/tabs.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see     https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce/Templates
 * @version 3.8.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Filter tabs and allow third parties to add their own.
 *
 * Each tab is an array containing title, callback and priority.
 *
 * @see woocommerce_default_product_tabs()
 */

function sf_add_desc_tab( $tabs = array() ) {
    global $post;
    $product_description = sf_get_post_meta( $post->ID, 'sf_product_description', true );
    if ( $product_description != "" ) {
        $tabs['description'] = array(
            'title'    => __( 'Description', 'swiftframework' ),
            'priority' => 10,
            'callback' => 'woocommerce_product_description_tab'
        );
    }

    return $tabs;
}

add_filter( 'woocommerce_product_tabs', 'sf_add_desc_tab', 0 );

$tabs = apply_filters( 'woocommerce_product_tabs', array() );

global $sf_options;
$enable_default_tabs = $sf_options['enable_default_tabs'];

if ( ! empty( $tabs ) ) : ?>

    <?php if ( $enable_default_tabs ) { ?>

        <div class="woocommerce-tabs wc-tabs-wrapper">
            <ul class="tabs wc-tabs">
                <?php foreach ( $tabs as $key => $tab ) : ?>
    
                    <li class="<?php echo esc_attr( $key ); ?>_tab">
                        <a href="#tab-<?php echo esc_attr( $key ); ?>">
                            <?php echo wp_kses_post( apply_filters( 'woocommerce_product_' . $key . '_tab_title', $tab['title'], $key ) ); ?>
                        </a>
                    </li>
    
                <?php endforeach; ?>
            </ul>
            <?php foreach ( $tabs as $key => $tab ) : ?>
    
                <div class="panel entry-content wc-tab" id="tab-<?php echo esc_attr( $key ); ?>">
                    <?php call_user_func( $tab['callback'], $key, $tab ); ?>
                </div>
    
            <?php endforeach; ?>
        </div>

    <?php } else { ?>

        <div class="panel-group" id="product-accordion">

            <?php foreach ( $tabs as $key => $tab ) : ?>
            <div class="panel">
                <div class="panel-heading">
                    <a class="accordion-toggle collapsed" data-toggle="collapse" data-parent="#product-accordion" href="#product-<?php echo esc_attr($key); ?>">
                        <?php echo apply_filters( 'woocommerce_product_' . $key . '_tab_title', esc_html( $tab['title'] ), $key ); ?>
                    </a>
                </div>
                <div id="product-<?php echo esc_attr($key); ?>" class="accordion-body collapse">
                    <div class="accordion-inner">
                        <?php call_user_func( $tab['callback'], $key, $tab ) ?>
                    </div>
                </div>
            </div>
            <?php endforeach; ?>

        </div>
        

    <?php } ?>

<?php endif; ?>
