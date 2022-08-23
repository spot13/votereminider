<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @link       http://swiftideas.com/swift-framework
 * @since      1.0.0
 *
 * @package    swift-framework
 * @subpackage swift-framework/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    swift-framework
 * @subpackage swift-framework/public
 * @author     Swift Ideas
 */
class SwiftFramework_Public {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $SwiftFramework    The ID of this plugin.
	 */
	private $SwiftFramework;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $SwiftFramework       The name of the plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $SwiftFramework, $version ) {

		$this->SwiftFramework = $SwiftFramework;
		$this->version = $version;

	}

	/**
	 * Register the stylesheets for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in SwiftFramework_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The SwiftFramework_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		// wp_enqueue_style( $this->SwiftFramework, plugin_dir_url( __FILE__ ) . 'css/swiftframework-public.css', array(), $this->version, 'all' );

	}

	/**
	 * Register the stylesheets for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in SwiftFramework_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The SwiftFramework_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		//wp_enqueue_script( $this->SwiftFramework, plugin_dir_url( __FILE__ ) . 'js/swiftframework-public.js', array( 'jquery' ), $this->version, false );
		wp_enqueue_script( 'imagesLoaded', plugin_dir_url( __FILE__ ) . 'js/lib/imagesloaded.pkgd.min.js', array( 'jquery' ), NULL, false );
		wp_enqueue_script( 'jquery-viewports', plugin_dir_url( __FILE__ ) . 'js/lib/jquery.viewports.min.js', array( 'jquery' ), NULL, false );
		wp_enqueue_script( 'jquery-smartresize', plugin_dir_url( __FILE__ ) . 'js/lib/jquery.smartresize.min.js', array( 'jquery' ), NULL, false );

	}

}