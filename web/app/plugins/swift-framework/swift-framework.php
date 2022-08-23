<?php

/**
    *
    *	Plugin Name: Swift Framework
    *	Plugin URI: http://www.swiftideas.com/swift-framework/
    *	Description: The Swift Framework plugin.
    *	Version: 2.8.0
    *	Author: Swift Ideas
    *	Author URI: http://swiftideas.com
    *	Requires at least: 5.0.0
    *	Tested up to: 6.0.1
    *
    *	Text Domain: swift-framework-plugin
    *	Domain Path: /languages/
    *
    *	@package Swift Framework
    *	@category Core
    *	@author Swift Ideas
    *
    **/

if (! defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-swiftframework-activator.php
 */
function activate_swiftframework()
{
    require_once plugin_dir_path(__FILE__) . 'includes/class-swiftframework-activator.php';
    SwiftFramework_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-swiftframework-deactivator.php
 */
function deactivate_swiftframework()
{
    require_once plugin_dir_path(__FILE__) . 'includes/class-swiftframework-deactivator.php';
    SwiftFramework_Deactivator::deactivate();
}

register_activation_hook(__FILE__, 'activate_SwiftFramework');
register_deactivation_hook(__FILE__, 'deactivate_SwiftFramework');

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path(__FILE__) . 'includes/class-swiftframework.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function init_swiftframework()
{
    $swiftframework = new SwiftFramework();
    $swiftframework->run();

    require plugin_dir_path(__FILE__) . 'includes/kernl-update-checker/kernl-update-checker.php';
    $MyUpdateChecker = Puc_v4_Factory::buildUpdateChecker(
        'https://kernl.us/api/v1/updates/564cb2337ad3303b210d6b4b/',
        __FILE__,
        'swift-framework'
    );
}
init_swiftframework();

/**
 * Theme opts name return
 */
if (!function_exists('swiftframework_theme_opts_name')) {
    function swiftframework_theme_opts_name()
    {
        $theme_opts_name = "";
        if (get_option('sf_theme') != "") {
            $theme_opts_name = 'sf_' . get_option('sf_theme') . '_options';
        }
        return $theme_opts_name;
    }
}

/* PERFORMANCE FRIENDLY GET META FUNCTION
================================================== */
if (!function_exists('sf_get_post_meta')) {
    function sf_get_post_meta($id, $key = "", $single = false)
    {
        $GLOBALS['sf_post_meta'] = isset($GLOBALS['sf_post_meta']) ? $GLOBALS['sf_post_meta'] : array();
        if (! isset($id)) {
            return;
        }
        if (! is_array($id)) {
            if (! isset($GLOBALS['sf_post_meta'][ $id ])) {
                //$GLOBALS['sf_post_meta'][ $id ] = array();
                $GLOBALS['sf_post_meta'][ $id ] = get_post_meta($id);
            }
            if (! empty($key) && isset($GLOBALS['sf_post_meta'][ $id ][ $key ]) && ! empty($GLOBALS['sf_post_meta'][ $id ][ $key ])) {
                if ($single) {
                    return maybe_unserialize($GLOBALS['sf_post_meta'][ $id ][ $key ][0]);
                } else {
                    return array_map('maybe_unserialize', $GLOBALS['sf_post_meta'][ $id ][ $key ]);
                }
            }

            if ($single) {
                return '';
            } else {
                return array();
            }
        }

        return get_post_meta($id, $key, $single);
    }
}

/* GET CUSTOM POST TYPE TAXONOMY LIST
================================================== */
if (! function_exists('swiftframework_get_category_list')) {
    function swiftframework_get_category_list($category_name, $filter = 0, $category_child = "", $frontend_display = false)
    {
        if (!$frontend_display && !is_admin()) {
            return;
        }

        if ($category_name == "product-category") {
            $category_name = "product_cat";
        }

        if (! $filter) {
            $get_category  = get_categories(array( 'taxonomy' => $category_name ));
            $category_list = array( '0' => 'All' );

            foreach ($get_category as $category) {
                if (isset($category->slug)) {
                    $category_list[] = $category->slug;
                }
            }

            return $category_list;
        } elseif ($category_child != "" && $category_child != "All") {
            $childcategory = get_term_by('slug', $category_child, $category_name);
            $get_category  = get_categories(array(
                    'taxonomy' => $category_name,
                    'child_of' => $childcategory->term_id
                ));
            $category_list = array( '0' => 'All' );

            foreach ($get_category as $category) {
                if (isset($category->cat_name)) {
                    $category_list[] = $category->slug;
                }
            }

            return $category_list;
        } else {
            $get_category  = get_categories(array( 'taxonomy' => $category_name ));
            $category_list = array( '0' => 'All' );

            foreach ($get_category as $category) {
                if (isset($category->cat_name)) {
                    $category_list[] = $category->cat_name;
                }
            }

            return $category_list;
        }
    }
}

/* CHECK THEME FEATURE SUPPORT
================================================== */
if (!function_exists('spb_theme_supports')) {
    function spb_theme_supports($feature)
    {
        $supports = get_theme_support('swiftframework');
        $supports = $supports[0];
        if (!isset($supports[ $feature ]) || $supports[ $feature ] == "") {
            return false;
        } else {
            return isset($supports[ $feature ]);
        }
    }
}
