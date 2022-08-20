<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package WP_Bootstrap_Starter
 */

?>
<?php if(!is_page_template( 'blank-page.php' ) && !is_page_template( 'blank-page-with-container.php' )): ?>
			</div><!-- .row -->
		</div><!-- .container -->
	</div><!-- #content -->
    <?php get_template_part( 'footer-widget' ); ?>
	<footer id="colophon" class="site-footer <?php echo wp_bootstrap_starter_bg_class(); ?>" role="contentinfo">
    <footer>
            <div class="container">
                <div id="text-3" class="widget widget_text">			<div class="textwidget"><hr>
Copyright © <?php echo date('Y'); ?>, Pickering Public Library <span style="float:right;"><a target="_blank" href="https://pickering.bibliocommons.com/info/privacy">Privacy</a> | <a target="_blank" href="https://pickering.bibliocommons.com/info/accessibility/">Accessibility</a> | <a target="_blank" href="https://pickering.bibliocommons.com/info/terms">Terms of Service</a></span></div>
		</div>            </div><!-- /container -->
        </footer>
		<!-- #colophon -->
<?php endif; ?>
</div><!-- #page -->

<?php wp_footer(); ?>
</body>
</html>