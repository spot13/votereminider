<?php

    /*
    *
    *	Custom Video Widget
    *	------------------------------------------------
    *	Swift Framework
    * 	Copyright Swift Ideas 2016 - http://www.swiftideas.com
    *
    */

    if (!function_exists('sf_video_widget')) {
        function sf_video_widget() {
            register_widget( 'SF_Video_Player_Widget' );
        }
        add_action( 'widgets_init', 'sf_video_widget' );
    }

    if ( !class_exists('SF_Video_Player_Widget') ) {
        class SF_Video_Player_Widget extends WP_Widget {

            function __construct() {
                $widget_ops  = array(
                    'classname'   => 'widget-video',
                    'description' => 'Embedded video from YouTube, Vimeo, etc'
                );
                $control_ops = array( 'width' => 250, 'height' => 200, 'id_base' => 'video-widget' ); //default width = 250
                parent::__construct( 'video-widget', 'Swift Framework Video Widget', $widget_ops, $control_ops );
            }

            function form( $instance ) {
                $defaults = array( 'title' => 'Video', 'url' => '', 'width' => 250, 'height' => 200 );
                $instance = wp_parse_args( (array) $instance, $defaults );

                ?>

                <p>
                    <label><?php _e( 'Title', 'swift-framework-plugin' ); ?>:</label>
                    <input id="<?php echo esc_attr($this->get_field_id( 'title' )); ?>"
                           name="<?php echo esc_attr($this->get_field_name( 'title' )); ?>" value="<?php echo esc_attr($instance['title']); ?>"
                           class="widefat" type="text"/>
                </p>
                <p>
                    <label><?php _e( 'Video URL', 'swift-framework-plugin' ); ?>:</label>
                    <input id="<?php echo esc_attr($this->get_field_id( 'url' )); ?>"
                           name="<?php echo esc_attr($this->get_field_name( 'url' )); ?>" value="<?php echo esc_url($instance['url']); ?>"
                           class="widefat" type="text"/>
                </p>
                <p>
                    <label><?php _e( 'Width', 'swift-framework-plugin' ); ?>:</label>
                    <input id="<?php echo esc_attr($this->get_field_id( 'width' )); ?>"
                           name="<?php echo esc_attr($this->get_field_name( 'width' )); ?>" value="<?php echo esc_attr($instance['width']); ?>"
                           class="widefat" type="text"/>
                </p>
                <p>
                    <label><?php _e( 'Height', 'swift-framework-plugin' ); ?>:</label>
                    <input id="<?php echo esc_attr($this->get_field_id( 'height' )); ?>"
                           name="<?php echo esc_attr($this->get_field_name( 'height' )); ?>"
                           value="<?php echo esc_attr($instance['height']); ?>" class="widefat" type="text"/>
                </p>

            <?php
            }

            function update( $new_instance, $old_instance ) {
                $instance = $old_instance;

                $instance['title']  = strip_tags( $new_instance['title'] );
                $instance['url']    = strip_tags( $new_instance['url'] );
                $instance['width']  = strip_tags( $new_instance['width'] );
                $instance['height'] = strip_tags( $new_instance['height'] );

                return $instance;
            }

            function widget( $args, $instance ) {

                extract( $args );

                $title  = apply_filters( 'widget_title', $instance['title'] );
                $url    = $instance['url'];
                $width  = $instance['width'];
                $height = $instance['height'];

                echo $before_widget;

                if ( $title ) {
                    echo $before_title . $title . $after_title;
                }

                if ( $url ) {
                    global $wp_embed;
                    $post_embed = $wp_embed->run_shortcode( '[embed width="' . $width . '" height="' . $height . '"]' . $url . '[/embed]' );

                    echo '<div class="video-widget-wrap">' . $post_embed . '</div>';
                }

                echo $after_widget;

            }

        }

    }
