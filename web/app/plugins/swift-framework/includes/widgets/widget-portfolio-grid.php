<?php

    /*
    *
    *	Custom Portfolio Widget
    *	------------------------------------------------
    *	Swift Framework
    * 	Copyright Swift Ideas 2016 - http://www.swiftideas.com
    *
    */

    if (!function_exists('sf_portfolio_grid_widget')) {
        function sf_portfolio_grid_widget() {
            register_widget( 'SF_Portfolio_Grid_Widget' );
        }
        add_action( 'widgets_init', 'sf_portfolio_grid_widget' );
    }

    if (!class_exists('SF_Portfolio_Grid_Widget')) {
        class SF_Portfolio_Grid_Widget extends WP_Widget {
        
            function __construct() {
                parent::__construct( 'sf_custom_portfolio_grid', $name = 'Swift Framework Portfolio Grid' );
            }

            function widget( $args, $instance ) {
                global $post;
                extract( $args );

                // Widget Options
                $title    = apply_filters( 'widget_title', $instance['title'] ); // Title
                $number   = $instance['number']; // Number of posts to show
                $category = $instance['category']; // Category to show

                if ( $category == "All" ) {
                    $category = "all";
                }
                if ( $category == "all" ) {
                    $category = '';
                }
                $category_slug = str_replace( '_', '-', $category );

                echo $before_widget;

                if ( $title ) {
                    echo $before_title . $title . $after_title;
                }

                $recent_portfolio = new WP_Query(
                    array(
                        'post_type'          => 'portfolio',
                        'posts_per_page'     => $number,
                        'portfolio-category' => $category_slug,
                    )
                );

                $count = 0;

                if ( $recent_portfolio->have_posts() ) :

                    ?>

                    <ul class="portfolio-grid">

                        <?php while ( $recent_portfolio->have_posts() ) : $recent_portfolio->the_post();

                            $post_permalink = get_permalink();

                            $thumb_image = rwmb_meta( 'sf_thumbnail_image', 'type=image&size=full' );
                            foreach ( $thumb_image as $detail_image ) {
                                $thumb_img_url = $detail_image['url'];
                                break;
                            }

                            if ( ! $thumb_image ) {
                                $thumb_image   = get_post_thumbnail_id();
                                $thumb_img_url = wp_get_attachment_url( $thumb_image, 'full' );
                            }

                            $image     = spb_image_resizer( $thumb_img_url, 85, 85, true, false );
                            $image_alt = esc_attr( sf_get_post_meta( $thumb_image, '_wp_attachment_image_alt', true ) );
                            ?>
                            <?php if ( $image ) { ?>
                                <li class="grid-item-<?php echo esc_attr($count); ?>">
                                    <a href="<?php echo esc_url($post_permalink); ?>" class="grid-image">
                                        <img src="<?php echo esc_url($image[0]); ?>" width="<?php echo esc_attr($image[1]); ?>"
                                             height="<?php echo esc_attr($image[2]); ?>" alt="<?php echo esc_attr($image_alt); ?>"/>
                                        <span class="tooltip"><?php echo get_the_title(); ?><span class="arrow"></span></span>
                                    </a>
                                </li>
                            <?php } ?>

                            <?php $count ++;
                            	endwhile;
                            	wp_reset_postdata();
                            ?>
                    </ul>

                <?php endif; ?>

                <?php

                echo $after_widget;
            }

            /* Widget control update */
            function update( $new_instance, $old_instance ) {
                $instance = $old_instance;

                $instance['title']    = strip_tags( $new_instance['title'] );
                $instance['number']   = strip_tags( $new_instance['number'] );
                $instance['category'] = strip_tags( $new_instance['category'] );

                return $instance;
            }

            /* Widget settings */
            function form( $instance ) {

                // Set defaults if instance doesn't already exist
                if ( $instance ) {
                    $title    = $instance['title'];
                    $number   = $instance['number'];
                    $category = $instance['category'];
                } else {
                    // Defaults
                    $title    = '';
                    $number   = '5';
                    $category = '';
                }

                // The widget form
                ?>
                <p>
                    <label
                        for="<?php echo esc_attr($this->get_field_id( 'title' )); ?>"><?php echo __( 'Title:', 'swift-framework-plugin' ); ?></label>
                    <input id="<?php echo esc_attr($this->get_field_id( 'title' )); ?>"
                           name="<?php echo esc_attr($this->get_field_name( 'title' )); ?>" type="text" value="<?php echo esc_attr($title); ?>"
                           class="widefat"/>
                </p>
                <p>
                    <label
                        for="<?php echo esc_attr($this->get_field_id( 'number' )); ?>"><?php echo __( 'Number of items to show:', 'swift-framework-plugin' ); ?></label>
                    <input id="<?php echo esc_attr($this->get_field_id( 'number' )); ?>"
                           name="<?php echo esc_attr($this->get_field_name( 'number' )); ?>" type="text"
                           value="<?php echo esc_attr($number); ?>" size="3"/>
                </p>
                <p>
                    <label
                        for="<?php echo esc_attr($this->get_field_id( 'category' )); ?>"><?php _e( 'Category', 'swift-framework-plugin' ); ?></label>
                    <select name="<?php echo esc_attr($this->get_field_name( 'category' )); ?>"
                            id="<?php echo esc_attr($this->get_field_id( 'category' )); ?>" class="">
                        <?php
                            $options = swiftframework_get_category_list( 'portfolio-category' );
                            foreach ( $options as $option ) {
                                echo '<option value="' . $option . '" id="' . $option . '"', $category == $option ? ' selected="selected"' : '', '>', $option, '</option>';
                            }
                        ?>
                    </select>
                </p>
                </p>
            <?php
            }

        }

    }
