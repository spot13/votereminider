<?php

    /*
    *
    *	Custom Instagram Widget
    *	------------------------------------------------
    *	Swift Framework
    * 	Copyright Swift Ideas 2016 - http://www.swiftideas.com
    *
    */

    if (!function_exists('sf_instagram_images_widget')) {
        function sf_instagram_images_widget() {
            register_widget( 'SF_Instagram_Images_Widget' );
        }
        add_action( 'widgets_init', 'sf_instagram_images_widget' );
    }

    if (!class_exists('SF_Instagram_Images_Widget')) {
        class SF_Instagram_Images_Widget extends WP_Widget {

            function __construct() {
                $widget_ops = array(
                    'classname'   => 'instagram-widget',
                    'description' => 'Show off your favorite Instagram photos'
                );
                parent::__construct( 'instagram-widget', 'Swift Framework Instagram Widget', $widget_ops );
            }

            function form( $instance ) {

                $instance   = wp_parse_args( (array) $instance, array(
                        'title'      => 'Instagram',
                        'number'     => 8,
                        'instagram_id' => '',
                        'instagram_token'  => ''
                    ) );
                $title      = esc_attr( $instance['title'] );
                $instagram_id = $instance['instagram_id'];
                $instagram_token  = $instance['instagram_token'];
                $number     = absint( $instance['number'] );
                ?>
                <p>
                	<strong>NOTE: using this widget requires you to first set up authentication to your instagram account. This can be done by visiting <a href="<?php echo admin_url('admin.php?page=swift-framework-instagram'); ?>" target="_blank">this page</a>.</strong>
                </p>
                <p>
                    <label
                        for="<?php echo esc_attr($this->get_field_id( 'title' )); ?>"><?php _e( 'Title', 'swift-framework-plugin' ); ?>
                        :</label>
                    <input class="widefat" id="<?php echo esc_attr($this->get_field_id( 'title' )); ?>"
                           name="<?php echo esc_attr($this->get_field_name( 'title' )); ?>" type="text"
                           value="<?php echo esc_attr($title); ?>"/>
                </p>
    			
                <p>
                    <label
                        for="<?php echo esc_attr($this->get_field_id( 'number' )); ?>"><?php _e( 'Number of Photos', 'swift-framework-plugin' ); ?>
                        :</label>
                    <input class="widefat" id="<?php echo esc_attr($this->get_field_id( 'number' )); ?>"
                           name="<?php echo esc_attr($this->get_field_name( 'number' )); ?>" type="text"
                           value="<?php echo esc_attr($number); ?>"/>
                </p>

            <?php
            }

            function update( $new_instance, $old_instance ) {

                $instance = $old_instance;

                $instance['title']      = strip_tags( $new_instance['title'] );
                $instance['number']     = $new_instance['number'];

                return $instance;
            }

            function widget( $args, $instance ) {

                extract( $args );

                $title    	   		= apply_filters( 'widget_title', $instance['title'] );
                $instagram_token 	= get_option('sf_instagram_access_token');
                $instagram_id 		= get_option('sf_instagram_user_id');
                $instagram_client 	= '641129180090039';
                $count     	   		= $instance['number'];
                $widget_id 	   		= "sf-instagram-widget-" . rand();

                if ( $title ) {
                    echo $before_title . $title . $after_title;
                }

                echo $before_widget;
                ?>

                <ul id="<?php echo esc_attr($widget_id); ?>" class="instagram_images clearfix"></ul>

                <script type="text/javascript">
                    jQuery( document ).ready(
                        function() {
                        	var instagrams = jQuery('#<?php echo esc_attr($widget_id); ?>'),
                        		count = parseInt( <?php echo esc_attr($count); ?>, 10 );
                        	
                        	jQuery.ajax({
                                url: 'https://graph.instagram.com/<?php echo esc_attr($instagram_id); ?>/media?fields=media_url,thumbnail_url,caption,id,media_type,timestamp,username,comments_count,like_count,permalink,children{media_url,id,media_type,timestamp,permalink,thumbnail_url}&limit=' + count + '&access_token=' + <?php echo esc_attr($instagram_token); ?>,
                        		dataType: 'jsonp',
                        		type: 'GET',
                        		data: {client_id: '<?php echo esc_attr($instagram_client); ?>', count: count},
                        		success: function(data) {
                        			for (var i = 0; i < count; i++) {
                                        var item = data.data[i];
                                        if (typeof item !== 'undefined') {
                                            var caption = "",
                                            imageURL = item.media_url;
                                            if (item.caption) {
                                                caption = item.caption;
                                            }
                                            var date = new Date(item.timestamp);
                                            instagrams.append("<li class='instagram-item' data-date='"+item.timestamp+"'><figure class='animated-overlay'><a target='_blank' href='" + item.permalink +"'></a><div class='img-wrap'><img class='instagram-image' src='" + imageURL +"' width='306px' height='306px' /></div><figcaption><div class='thumb-info'><i class='fa-instagram'></i></div></figcaption></figure></li>");  

                                        }
    	                			}
                        		},
                        		error: function(error) {
                        			console.log(error);
                        		}
                        	});
                        }
                    );
                </script>
                <?php

                echo $after_widget;
            }

        }

    }
