<?php

    /*
    *
    *	Custom In Focus Widget
    *	------------------------------------------------
    *	Swift Framework
    * 	Copyright Swift Ideas 2016 - http://www.swiftideas.com
    *
    */

    if (!function_exists('sf_infocus_widget')) {
        function sf_infocus_widget() {
            register_widget( 'SF_InFocus_Widget' );
        }
        add_action( 'widgets_init', 'sf_infocus_widget' );
    }

    if (!class_exists('SF_InFocus_Widget')) {
        class SF_InFocus_Widget extends WP_Widget {
        
          	function __construct() {
                parent::__construct( 'sf_infocus_widget', $name = 'Swift Framework In Focus' );
            }

            function widget( $args, $instance ) {
                global $post, $sf_options;
                extract( $args );
                
                $remove_dates  = $sf_options['remove_dates'];

                // Widget Options
                $title   = apply_filters( 'widget_title', $instance['title'] ); // Title
                $post_id = $instance['post_id']; // Post ID

                echo $before_widget;

                if ( $title ) {
                    echo $before_title . $title . $after_title;
                }

                if ( function_exists( 'icl_object_id' ) ) {
                	$post_id = icl_object_id( $post_id, 'post', true );
                }

                $infocus_post = get_post( $post_id );

                ?>

                <div class="infocus-item">

                    <?php
                        $post_title     = $infocus_post->post_title;
                        $post_permalink = get_post_permalink( $infocus_post );

                        $thumb_image = rwmb_meta( 'sf_thumbnail_image', 'type=image&size=full', $post_id );
                        $thumb_video = sf_get_post_meta( $post_id, 'sf_thumbnail_video_url', true );

                        foreach ( $thumb_image as $detail_image ) {
                            $thumb_img_url = $detail_image['url'];
                            break;
                        }

                        if ( ! $thumb_image ) {
                            $thumb_image   = get_post_thumbnail_id( $post_id );
                            $thumb_img_url = wp_get_attachment_url( $thumb_image, 'full' );
                        }

                        $image     = spb_image_resizer( $thumb_img_url, 300, 225, true, false );
                        $image_alt = esc_attr( sf_get_post_meta( $thumb_image, '_wp_attachment_image_alt', true ) );
                    ?>
                    <figure class="animated-overlay overlay-alt">

                    	<?php if ( swiftframework_theme_opts_name() == "sf_atelier_options" ) {
    	                	$post_date_month = get_the_date('M');
                			$post_date_day = get_the_date('d');
                    	?>
                    	<div class="date-overlay narrow-date-block"><span class="month"><?php echo esc_html($post_date_month); ?></span><span class="day"><?php echo esc_html($post_date_day); ?></span></div>
                    	<?php } ?>

                        <?php if ( $thumb_video != "" ) { ?>
                            <?php echo sf_video_embed( $thumb_video, 300, 200 ); ?>
                        <?php } else if ( $image ) { ?>
                            <img src="<?php echo esc_url($image[0]); ?>" width="<?php echo esc_attr($image[1]); ?>"
                                 height="<?php echo esc_attr($image[2]); ?>" alt="<?php echo esc_attr($image_alt); ?>"/>
                            <a href="<?php echo esc_url($post_permalink); ?>" class="infocus-image"></a>
                            <div class="figcaption-wrap"></div>
                            <figcaption>
                                <div class="thumb-info thumb-info-alt">
                                    <?php echo apply_filters( 'sf_next_icon' , '<i class="ss-navigateright"></i>' ); ?>
                                </div>
                            </figcaption>
                        <?php } ?>
                    </figure>

                    <div class="infocus-title clearfix">

    	                <?php if ( swiftframework_theme_opts_name() == "sf_atelier_options" ) { ?>

    						<h4><a href="<?php echo esc_url($post_permalink); ?>"
                               title="<?php echo esc_attr($post_title); ?>"><?php echo esc_html($post_title); ?></a></h4>

    					<?php } else if ( swiftframework_theme_opts_name() == "sf_uplift_options" ) { ?>
    						
    						<h5><a href="<?php echo esc_url($post_permalink); ?>"
    						   title="<?php echo esc_attr($post_title); ?>"><?php echo esc_html($post_title); ?></a></h5>
    						  
    						<?php if ( ! $remove_dates ) {
    						    echo '<div class="blog-item-details">' . sprintf( __( '<time datetime="%1$s">%2$s</time>', 'swift-framework-plugin' ), get_the_date('Y-m-d'), get_the_date() ) . '</div>';
    						} ?>
    						   
    	                <?php } else { ?>

    	                    <h5><a href="<?php echo esc_url($post_permalink); ?>"
                               title="<?php echo esc_attr($post_title); ?>"><?php echo esc_html($post_title); ?></a></h5>

    	                    <div class="comments-likes">
    	                        <?php if ( function_exists( 'lip_love_it_link' ) ) {
    	                            echo lip_love_it_link( $post_id, '<i class="ss-heart"></i>', '<i class="ss-heart"></i>', false );
    	                        } ?>
    	                    </div>

                        <?php } ?>
                    </div>

                </div>

                <?php

                echo $after_widget;
            }

            /* Widget control update */
            function update( $new_instance, $old_instance ) {
                $instance = $old_instance;

                $instance['title']   = strip_tags( $new_instance['title'] );
                $instance['post_id'] = strip_tags( $new_instance['post_id'] );

                return $instance;
            }

            /* Widget settings */
            function form( $instance ) {

                // Set defaults if instance doesn't already exist
                if ( $instance ) {
                    $title   = $instance['title'];
                    $post_id = $instance['post_id'];
                } else {
                    // Defaults
                    $title   = '';
                    $post_id = 0;
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
                        for="<?php echo esc_attr($this->get_field_id( 'post_id' )); ?>"><?php echo __( 'Post ID:', 'swift-framework-plugin' ); ?></label>
                    <input id="<?php echo esc_attr($this->get_field_id( 'post_id' )); ?>"
                           name="<?php echo esc_attr($this->get_field_name( 'post_id' )); ?>" type="text"
                           value="<?php echo esc_attr($post_id); ?>" size="widefat"/>
                </p>
            <?php
            }

        }
    }
