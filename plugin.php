<?php
/**
 * Plugin Name: image-placeholder — CTA Placeholder Image
 * Plugin URI: https://github.com/ahmadawais/create-guten-block/
 * Description: image-placeholder — is a Gutenberg plugin created via create-guten-block.
 * Author: Bruno Mazza
 * Author URI: https://AhmadAwais.com/
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
