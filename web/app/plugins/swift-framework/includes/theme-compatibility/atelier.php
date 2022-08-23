<?php
    /*
    *
    *   Atelier Theme Compatibility
    *   ------------------------------------------------
    *   Swift Framework
    *   Copyright Swift Ideas 2019 - http://www.swiftideas.com
    *
    */

    if (!function_exists('sf_portfolio_item_link')) {
        function sf_portfolio_item_link() {
            if (function_exists('atelier_portfolio_item_link')) {
                return atelier_portfolio_item_link();
            }
        }
    }

    if (!function_exists('sf_get_icons_list')) {
        function sf_get_icons_list() {
            if (function_exists('atelier_get_icons_list')) {
                return atelier_get_icons_list();
            }
        }
    }

    if (!function_exists('sf_get_tweets')) {
        function sf_get_tweets( $twitterID, $count, $type = "", $item_class = "col-sm-4" ) {
            if (function_exists('atelier_get_tweets')) {
                return atelier_get_tweets( $twitterID, $count, $type, $item_class );
            }
        }
    }

    if (!function_exists('sf_latest_tweet')) {
        function sf_latest_tweet( $count, $twitterID ) {
            if (function_exists('atelier_latest_tweet')) {
                return atelier_latest_tweet( $count, $twitterID );
            }
        }
    }


    /* Portfolio functions
    ================================================== */
    if (!function_exists('sf_portfolio_items')) {
        function sf_portfolio_items($atts) {
            if (function_exists('atelier_portfolio_items')) {
                return atelier_portfolio_items($atts);
            }
        }
    }

    if (!function_exists('sf_portfolio_filter')) {
        function sf_portfolio_filter($style = "basic", $post_type = "portfolio", $parent_category = "", $frontend_display = false) {
            if (function_exists('atelier_portfolio_filter')) {
                return atelier_portfolio_filter($style, $post_type, $parent_category, $frontend_display);
            }
        }
    }

    if (!function_exists('sf_portfolio_thumbnail')) {
        function sf_portfolio_thumbnail( $display_type, $masonry_thumb_size, $multi_size_ratio, $columns, $hover_show_excerpt, $excerpt_length, $gutters, $fullwidth ) {
            if (function_exists('atelier_portfolio_thumbnail')) {
                return atelier_portfolio_thumbnail( $display_type, $masonry_thumb_size, $multi_size_ratio, $columns, $hover_show_excerpt, $excerpt_length, $gutters, $fullwidth );
            }
        }
    }


    /* Blog functions
    ================================================== */
    if (!function_exists('sf_blog_items')) {
        function sf_blog_items($atts) {
            if (function_exists('atelier_product_items')) {
                return atelier_blog_items($atts);
            }
        }
    }

    if (!function_exists('sf_get_recent_post_item')) {
        function sf_get_recent_post_item($post, $display_type, $excerpt_length, $item_class) {
            if (function_exists('atelier_get_recent_post_item')) {
                return atelier_get_recent_post_item($post, $display_type, $excerpt_length, $item_class);
            }
        }
    }

    if (!function_exists('sf_post_filter')) {
        function sf_post_filter( $filter_style, $override_post_type, $category ) {
            if (function_exists('atelier_post_filter')) {
                return atelier_post_filter( $filter_style, $override_post_type, $category );
            }
        }
    }


    /* Product functions
    ================================================== */
    if (!function_exists('sf_product_items')) {
        function sf_product_items($atts) {
            if (function_exists('atelier_product_items')) {
                return atelier_product_items($atts);
            }
        }
    }

    if (!function_exists('sf_mini_product_items')) {
        function sf_mini_product_items( $asset_type, $category, $item_count, $sidebars, $width ) {
            if (function_exists('atelier_mini_product_items')) {
                return atelier_mini_product_items( $asset_type, $category, $item_count, $sidebars, $width );
            }
        }
    }
    

    /* Directory functions
    ================================================== */
    if (!function_exists('sf_directory_items')) {
        function sf_directory_items( $excerpt_length, $pagination, $item_count, $directory_category, $order ) {
            if (function_exists('atelier_directory_items')) {
                return atelier_directory_items( $excerpt_length, $pagination, $item_count, $directory_category, $ordery );
            }
        }
    }

    if (!function_exists('sf_directory_location_filter')) {
        function sf_directory_location_filter() {
            if (function_exists('atelier_directory_location_filter')) {
                return atelier_directory_location_filter();
            }
        }
    }

    if (!function_exists('sf_directory_category_filter')) {
        function sf_directory_category_filter( $selected_category = "" ) {
            if (function_exists('atelier_directory_category_filter')) {
                return atelier_directory_category_filter( $selected_category );
            }
        }
    }


    /* Gallery functions
    ================================================== */
    if (!function_exists('sf_galleries')) {
        function sf_galleries( $display_type, $link_type, $fullwidth, $gutters, $columns, $show_title, $show_subtitle, $show_excerpt, $excerpt_length, $item_count, $category, $pagination, $sidebars, $hover_style ) {
            if (function_exists('atelier_galleries')) {
                return atelier_galleries( $display_type, $link_type, $fullwidth, $gutters, $columns, $show_title, $show_subtitle, $show_excerpt, $excerpt_length, $item_count, $category, $pagination, $sidebars, $hover_style );
            }
        }
    }

    if (!function_exists('sf_gallery_filter')) {
        function sf_gallery_filter( $style = "basic", $parent_category = "" ) {
            if (function_exists('atelier_gallery_filter')) {
                return atelier_gallery_filter( $style, $parent_category );
            }
        }
    }
    
