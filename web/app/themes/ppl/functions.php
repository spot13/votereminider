<?php

    /*
    *
    *	Cardinal Functions
    *	------------------------------------------------
    *	Swift Framework
    * 	Copyright Swift Ideas 2015 - http://www.swiftideas.com
    *
    *	VARIABLE DEFINITIONS
    *	PLUGIN INCLUDES
    *	THEME UPDATER
    *	THEME SUPPORT
    *	THUMBNAIL SIZES
    *	CONTENT WIDTH
    *	LOAD THEME LANGUAGE
    *	sf_custom_content_functions()
    *	sf_include_framework()
    *	sf_enqueue_styles()
    *	sf_enqueue_scripts()
    *	sf_load_custom_scripts()
    *	sf_admin_scripts()
    *	sf_layerslider_overrides()
    *
    */


    /* VARIABLE DEFINITIONS
    ================================================== */
    define( 'SF_TEMPLATE_PATH', get_template_directory() );
    define( 'SF_INCLUDES_PATH', SF_TEMPLATE_PATH . '/includes' );
    define( 'SF_FRAMEWORK_PATH', SF_TEMPLATE_PATH . '/swift-framework' );
    define( 'SF_LOCAL_PATH', get_template_directory_uri() );


    /* PLUGIN INCLUDES
    ================================================== */
    require_once( SF_INCLUDES_PATH . '/plugins/aq_resizer.php' );
    include_once( SF_INCLUDES_PATH . '/plugin-includes.php' );
    require_once(SF_INCLUDES_PATH . '/theme_update_check.php');
    $CardinalUpdateChecker = new ThemeUpdateChecker(
        'cardinal',
        'https://kernl.us/api/v1/theme-updates/5668b8f40a25612471e649f6/'
    );
    


    /* THEME SETUP
    ================================================== */
    if ( ! function_exists( 'sf_cardinal_setup' ) ) {
        function sf_cardinal_setup() {
			
			/* SF THEME OPTION CHECK
			================================================== */
			if ( get_option( 'sf_theme' ) == false ) {
				update_option( 'sf_theme', 'cardinal' );
			}
			
            /* THEME SUPPORT
            ================================================== */
            add_theme_support( 'structured-post-formats', array( 'audio', 'gallery', 'image', 'link', 'video' ) );
            add_theme_support( 'post-formats', array( 'aside', 'chat', 'quote', 'status' ) );
            add_theme_support( 'automatic-feed-links' );
            add_theme_support( 'post-thumbnails' );
            add_theme_support( 'woocommerce' );
            add_theme_support( 'wc-product-gallery-zoom' );
            add_theme_support( 'wc-product-gallery-lightbox' );
            add_theme_support( 'wc-product-gallery-slider' );
            
            add_theme_support( 'appthemer-crowdfunding', array(
                'campaign-edit'           => true,
                'campaign-featured-image' => true,
                'campaign-video'          => true,
                'campaign-widget'         => true,
                'campaign-category'       => true,
                'campaign-tag'            => true,
                'campaign-type'           => true,
                'anonymous-backers'       => true
            ) );
            add_theme_support( 'swiftframework', array(
                'font-awesome-v5'           => true,
                'widgets'                   => true,
            	'swift-smartscript'			=> false,
            	'slideout-menu'				=> false,
            	'page-heading-woocommerce'	=> true,
            	'pagination-fullscreen'		=> false,
            	'bordered-button'			=> false,
            	'3drotate-button'			=> false,
            	'rounded-button'			=> false,
            	'product-inner-heading'		=> false,
            	'product-summary-tabs'		=> true,
            	'product-layout-opts'		=> false,
            	'mobile-shop-filters' 		=> false,
            	'mobile-logo-override'		=> false,
            	'product-multi-masonry'		=> false,
            	'super-search-config'		=> false,
            	'advanced-row-styling'		=> true,
            	'gizmo-icon-font'			=> true,
            	'icon-mind-font'			=> false,
            	'menu-new-badge'			=> false,
            	'advanced-map-styles'		=> false,
            	'hamburger-css' 			=> false,
            	'pushnav-menu'				=> false,
            	'split-nav-menu'			=> false,
            	'max-mega-menu'				=> false,
            	'page-heading-woo-description' => false,
            	'header-aux-modals'			=> false,
            	'menu-button-advanced'	    => false,
            	'alt-gallery-hover'			=> false
            ) );


            /* THUMBNAIL SIZES
            ================================================== */
            set_post_thumbnail_size( 220, 150, true );
            add_image_size( 'thumb-image', 600, 450, true );
            add_image_size( 'thumb-image-twocol', 900, 675, true );
            add_image_size( 'large-square', 1200, 1200, true );
            add_image_size( 'full-width-image-gallery', 1280, 720, true );


            /* CONTENT WIDTH
            ================================================== */
            if ( ! isset( $content_width ) ) {
                $content_width = 1140;
            }


            /* LOAD THEME LANGUAGE
            ================================================== */
            load_theme_textdomain( 'swiftframework', SF_TEMPLATE_PATH . '/language' );

        }

        add_action( 'after_setup_theme', 'sf_cardinal_setup' );
    }


    /* THEME FRAMEWORK FUNCTIONS
    ================================================== */
    include_once( SF_FRAMEWORK_PATH . '/core/sf-sidebars.php' );

	require( SF_INCLUDES_PATH . '/meta-box/meta-box.php' );
	include_once( SF_INCLUDES_PATH . '/meta-boxes.php' );
	
    if ( ! function_exists( 'sf_include_framework' ) ) {
        function sf_include_framework() {
            require_once( SF_INCLUDES_PATH . '/sf-theme-functions.php' );
            require_once( SF_INCLUDES_PATH . '/sf-customizer-options.php' );
            include_once( SF_INCLUDES_PATH . '/sf-custom-styles.php' );
            include_once( SF_INCLUDES_PATH . '/sf-styleswitcher/sf-styleswitcher.php' );
            require_once(SF_INCLUDES_PATH . '/overrides/sf-spb-overrides.php');
            require_once( SF_FRAMEWORK_PATH . '/swift-framework.php' );
        }

        add_action( 'init', 'sf_include_framework', 5 );
    }


    /* THEME OPTIONS FRAMEWORK
    ================================================== */
    require_once( SF_INCLUDES_PATH . '/sf-colour-scheme.php' );
    if ( ! function_exists( 'sf_include_theme_options' ) ) {
        function sf_include_theme_options() {
            require_once( SF_INCLUDES_PATH . '/option-extensions/loader.php' );
            require_once( SF_INCLUDES_PATH . '/sf-options.php' );
            global $sf_cardinal_options, $sf_options;
            $sf_options = $sf_cardinal_options;
        }

        add_action( 'init', 'sf_include_theme_options', 10 );
    }
	
	
	/* THEME OPTIONS VAR RETRIEVAL
	================================================== */
	if (!function_exists('sf_get_theme_opts')) {
		function sf_get_theme_opts() {
			global $sf_cardinal_options;
			return $sf_cardinal_options;
		}
	}
	

    /* LOVE IT INCLUDE
    ================================================== */
    if ( ! function_exists( 'sf_love_it_include' ) ) {
        function sf_love_it_include() {
            global $sf_options;
            $disable_loveit = false;
            if ( isset( $sf_options['disable_loveit'] ) ) {
                $disable_loveit = $sf_options['disable_loveit'];
            }

            if ( ! $disable_loveit ) {
                include_once( SF_INCLUDES_PATH . '/plugins/love-it-pro/love-it-pro.php' );
            }
        }

        add_action( 'init', 'sf_love_it_include', 20 );
    }


    /* LOAD STYLESHEETS
    ================================================== */
    if ( ! function_exists( 'sf_enqueue_styles' ) ) {
        function sf_enqueue_styles() {

            global $sf_options;
            $enable_responsive = $sf_options['enable_responsive'];
            $enable_rtl        = $sf_options['enable_rtl'];

            wp_enqueue_style( 'bootstrap', SF_LOCAL_PATH . '/css/bootstrap.min.css', array(), null, 'all' );
            wp_enqueue_style('font-awesome-v5', SF_LOCAL_PATH .'/css/font-awesome.min.css', array(), '5.10.1', 'all');
            wp_enqueue_style('font-awesome-v4shims', SF_LOCAL_PATH .'/css/v4-shims.min.css', array(), NULL, 'all');
            wp_enqueue_style( 'ssgizmo', SF_LOCAL_PATH . '/css/ss-gizmo.css', array(), null, 'all' );
            wp_enqueue_style( 'sf-main', get_stylesheet_directory_uri() . '/style.css', array(), null, 'all' );

            wp_register_style( 'sf-rtl', SF_LOCAL_PATH . '/rtl.css', array(), null, 'all' );
            wp_register_style( 'sf-woocommerce', SF_LOCAL_PATH . '/css/sf-woocommerce.css', array(), null, 'screen' );
            wp_register_style( 'sf-responsive', SF_LOCAL_PATH . '/css/responsive.css', array(), null, 'screen' );

            if ( sf_woocommerce_activated() ) {
                wp_enqueue_style( 'sf-woocommerce' );
            }

            if ( is_rtl() || $enable_rtl || isset( $_GET['RTL'] ) ) {
                wp_enqueue_style( 'sf-rtl' );
            }

            if ( $enable_responsive ) {
                wp_enqueue_style( 'sf-responsive' );
            }

        }

        add_action( 'wp_enqueue_scripts', 'sf_enqueue_styles', 99 );
    }


    /* LOAD FRONTEND SCRIPTS
    ================================================== */
    if ( ! function_exists( 'sf_enqueue_scripts' ) ) {
        function sf_enqueue_scripts() {

            // Variables
            global $sf_options;
            $enable_rtl         = $sf_options['enable_rtl'];
            $enable_min_scripts = $sf_options['enable_min_scripts'];
            $post_type          = get_query_var( 'post_type' );
			$gmaps_api_key 		= get_option('sf_gmaps_api_key');
			
            // Register Scripts
            wp_register_script( 'bootstrap-js', SF_LOCAL_PATH . '/js/combine/bootstrap.min.js', 'jquery', '3.3.5', true );
            wp_register_script( 'flexslider', SF_LOCAL_PATH . '/js/combine/jquery.flexslider-min.js', 'jquery', null, true );
            wp_register_script( 'flexslider-rtl', SF_LOCAL_PATH . '/js/combine/jquery.flexslider-rtl-min.js', 'jquery', null, true );
            wp_register_script( 'isotope', SF_LOCAL_PATH . '/js/combine/jquery.isotope.min.js', 'jquery', null, true );
            wp_register_script( 'imagesLoaded', SF_LOCAL_PATH . '/js/combine/imagesloaded.js', 'jquery', null, true );
            wp_register_script( 'owlcarousel', SF_LOCAL_PATH . '/js/combine/owl.carousel.min.js', 'jquery', null, true );
            wp_register_script( 'jquery-ui', SF_LOCAL_PATH . '/js/combine/jquery-ui-1.10.2.custom.min.js', 'jquery', null, true );
            wp_register_script( 'ilightbox', SF_LOCAL_PATH . '/js/combine/ilightbox.min.js', 'jquery', '1.0.1', true );
            wp_register_script(	'google-maps', '//maps.google.com/maps/api/js?key=' . $gmaps_api_key, 'jquery', NULL, TRUE);
            wp_register_script( 'elevatezoom', SF_LOCAL_PATH . '/js/combine/jquery.elevateZoom.min.js', 'jquery', null, true );
            wp_register_script( 'infinite-scroll', SF_LOCAL_PATH . '/js/combine/jquery.infinitescroll.min.js', 'jquery', null, true );
            wp_register_script( 'sf-theme-scripts', SF_LOCAL_PATH . '/js/combine/theme-scripts.js', 'jquery', '2.7.0', true );
            wp_register_script( 'sf-functions', SF_LOCAL_PATH . '/js/functions.js', 'jquery', null, true );

            // jQuery
            wp_enqueue_script( 'jquery' );

            if ( ! is_admin() ) {

                // Theme Scripts
            	wp_enqueue_script( 'bootstrap-js' );
                wp_enqueue_script( 'jquery-ui-widget' );
                wp_enqueue_script( 'jquery-ui-accordion' );
				
				if ( is_rtl() || $enable_rtl || isset( $_GET['RTL'] ) ) {
				    wp_enqueue_script( 'flexslider-rtl' );
				} else {
				    wp_enqueue_script( 'flexslider' );
				}

                wp_enqueue_script( 'owlcarousel' );
                wp_enqueue_script( 'sf-theme-scripts' );
                wp_enqueue_script( 'ilightbox' );

                if ( ! is_singular( 'tribe_events' ) && $post_type != 'tribe_events' && ! is_singular( 'tribe_venue' ) && $post_type != 'tribe_venue' && ! is_singular( 'ai1ec_event' ) ) {
                    wp_enqueue_script( 'google-maps' );
                }

                wp_enqueue_script( 'isotope' );
                wp_enqueue_script( 'imagesLoaded' );
                wp_enqueue_script( 'infinite-scroll' );

                if ( $sf_options['enable_product_zoom'] ) {
                    wp_enqueue_script( 'elevatezoom' );
                }

                wp_enqueue_script( 'sf-functions' );

                // Comments reply
                if ( is_singular() && comments_open() ) {
                    wp_enqueue_script( 'comment-reply' );
                }
            }
        }

        add_action( 'wp_enqueue_scripts', 'sf_enqueue_scripts' );
    }

    /* LOAD BACKEND SCRIPTS
    ================================================== */
    function sf_admin_scripts() {
        wp_enqueue_script( 'admin-functions', get_template_directory_uri() . '/js/sf-admin.js', 'jquery', '1.0', true );
    }

    add_action( 'admin_init', 'sf_admin_scripts' );

    
    /* CHECK THEME FEATURE SUPPORT
    ================================================== */
    if ( !function_exists( 'sf_theme_supports' ) ) {
        function sf_theme_supports( $feature ) {
        	$supports = get_theme_support( 'swiftframework' );
        	$supports = $supports[0];
    		if ($supports[ $feature ] == "") {
    			return false;
    		} else {
        		return isset( $supports[ $feature ] );
        	}
        }
    }
