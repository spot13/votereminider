<?php

	/*
	*
	*	Post - Timeline
	*	------------------------------------------------
	* 	Copyright Swift Ideas 2015 - http://www.swiftideas.com
	*
	*	Output for timeline type blog posts
	*
	*/
	
	// Show/Hide
	$show_details = "yes";
	
	// Post Date
	$post_date_month = get_the_date('M');
	$post_date_day = get_the_date('d');
	$post_date_year = get_the_date('Y');
	
	// Media
	$item_figure = "";
	if ( $thumb_type != "none" ) {
	    $item_figure = sf_post_thumbnail( 'standard', $fullwidth );
	}
?>

<?php if ( $show_details == "yes" ) { ?>
    <span class="standard-post-date" itemprop="datePublished"><?php echo $post_date; ?></span>
<?php } ?>

<?php 
	/* Post Media
	================================================== */
	echo $item_figure;
?>

<?php if ( $item_figure == "" ) { ?>
    <div class="standard-post-content no-thumb clearfix"><!-- open standard-post-content -->
<?php } else { ?>
    <div class="standard-post-content clearfix"><!-- open standard-post-content -->
<?php } ?>

<?php if ( $show_title == "yes" && $post_format != "link" && $post_format != "quote" ) { ?>
    <h1 itemprop="name headline"><a ' . $post_permalink_config . '>' . $post_title . '</a></h1>';
<?php } ?>

<?php if ($show_details == "yes" && $post_format != "quote" && $post_format != "link" ) { ?>
	<?php if ( sf_theme_opts_name() == "sf_atelier_options" ) { ?>
		<?php if ( ! $single_author ) { ?>
		    <div class="blog-item-details">
		    	<?php echo sprintf(
		    		__( '<span class="author">By <a href="%2$s" rel="author" itemprop="author">%1$s</a></span> in %3$s', 'swiftframework' ),
		    		$post_author,
		    		get_author_posts_url( get_the_author_meta( 'ID' ) ),
		    		$post_categories
		    	); ?>
		    </div>
		<?php } ?>
	<?php } else { ?>
    	<?php sf_get_content_view( 'post', 'meta-details', false ); ?>
	<?php } ?>
<?php } ?>

<?php if ( $show_excerpt == "yes" ) { ?>
    <div class="excerpt" itemprop="description"><?php echo $post_excerpt; ?></div>
<?php } else if ( $post_format == "quote" ) { ?>
    <div class="quote-excerpt heading-font" itemprop="description"><?php echo $post_excerpt; ?></div>
<?php } else if ( $post_format == "link" ) { ?>
    <div class="link-excerpt heading-font" itemprop="description"><?php echo $link_icon . $post_excerpt; ?></div>
<?php } ?>

<?php if ( is_sticky() ) { ?>
    <div class="sticky-post-icon"><?php echo $sticky_icon; ?></div>
<?php } ?>


<?php if ( $download_button ) { ?>
    <?php if ( $download_shortcode != "" ) { ?>
        <?php echo do_shortcode( $download_shortcode ); ?>
    <?php } else { ?>
        <a href="<?php echo wp_get_attachment_url( $download_file ); ?>" class="download-button read-more-button"><?php echo $download_text; ?></a>
    <?php } ?>
<?php } ?>

<?php if ( $show_read_more == "yes" && $post_format != "quote" && $post_format != "link" ) { ?>
    <a class="read-more-button" href="<?php echo get_permalink(); ?>"><?php _e( "Read more", "swiftframework" ); ?></a>
<?php } ?>

<?php if ( $show_details == "yes" ) { ?>

    <div class="comments-likes">';

    <?php if ( $post_format == "quote" || $post_format == "link" ) { ?>
        <?php sf_get_content_view( 'post', 'meta-details', false ); ?>
    <?php } ?>

    <?php if ( comments_open() ) { ?>
        <div class="comments-wrapper">
        	<a href="<?php echo $post_permalink; ?>#comment-area"><?php echo $comments_icon; ?><span><?php echo $post_comments; ?></span></a>
        </div>
    <?php } ?>

    <?php if ( function_exists( 'lip_love_it_link' ) ) {
        echo lip_love_it_link( get_the_ID(), false );
    } ?>

    </div>
<?php } ?>

</div><!-- close standard-post-content -->
