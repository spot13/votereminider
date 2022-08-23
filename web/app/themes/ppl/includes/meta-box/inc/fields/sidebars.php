<?php
// Prevent loading this file directly
defined( 'ABSPATH' ) || exit;

if ( !class_exists( 'RWMB_Sidebars_Field' ) )
{
	class RWMB_Sidebars_field extends RWMB_Field
	{
		/**
		 * Enqueue scripts and styles
		 *
		 * @return void
		 */
		static function admin_enqueue_scripts()
		{
			wp_enqueue_style( 'rwmb-select', RWMB_CSS_URL . 'select.css', array(), RWMB_VER );
		}

		/**
		 * Get field HTML
		 *
		 * @param mixed  $meta
		 * @param array  $field
		 *
		 * @return string
		 */
		static function html( $meta, $field )
		{			
			$html = '<select name="'.$field['id'].'" id="'.$field['id'].'">';
			foreach ( $GLOBALS['wp_registered_sidebars'] as $sidebar ) {
				if ( ! empty( $meta ) && ! strcmp( ucwords( $meta[0] ), ucwords( $sidebar['id'] ) ) ) {
					$html .= '<option value="'. ucwords( $sidebar['id'] ) .'" selected="selected">';
					$html .= ucwords( $sidebar['name'] );
					$html .= '</option>';
				} else {
			    	$html .= '<option value="'. ucwords( $sidebar['id'] ) .'">';
			    	$html .= ucwords( $sidebar['name'] );
			    	$html .= '</option>';
				}
			}
			$html .= '</select>';

			return $html;
		}

		/**
		 * Get meta value
		 * If field is cloneable, value is saved as a single entry in DB
		 * Otherwise value is saved as multiple entries (for backward compatibility)
		 *
		 * @see "save" method for better understanding
		 *
		 * TODO: A good way to ALWAYS save values in single entry in DB, while maintaining backward compatibility
		 *
		 * @param $post_id
		 * @param $saved
		 * @param $field
		 *
		 * @return array
		 */
		static function meta( $post_id, $saved, $field )
		{
			$single = $field['clone'] || !$field['multiple'];
			$meta = sf_get_post_meta( $post_id, $field['id'], $single );
			$meta = ( !$saved && '' === $meta || array() === $meta ) ? $field['std'] : $meta;

			$meta = array_map( 'esc_attr', (array) $meta );

			return $meta;
		}

		/**
		 * Save meta value
		 * If field is cloneable, value is saved as a single entry in DB
		 * Otherwise value is saved as multiple entries (for backward compatibility)
		 *
		 * TODO: A good way to ALWAYS save values in single entry in DB, while maintaining backward compatibility
		 *
		 * @param $new
		 * @param $old
		 * @param $post_id
		 * @param $field
		 */
		static function save( $new, $old, $post_id, $field )
		{
			if ( !$field['clone'] )
			{
				parent::save( $new, $old, $post_id, $field );
				return;
			}

			if ( empty( $new ) )
				delete_post_meta( $post_id, $field['id'] );
			else
				update_post_meta( $post_id, $field['id'], $new );
		}

		/**
		 * Normalize parameters for field
		 *
		 * @param array $field
		 *
		 * @return array
		 */
		static function normalize_field( $field )
		{
			$field = wp_parse_args( $field, array(
				'desc'        => '',
				'name'        => $field['id'],
				'size'        => $field['multiple'] ? 5 : 0,
				'placeholder' => '',
			) );
			if ( !$field['clone'] && $field['multiple'] )
				$field['field_name'] .= '[]';
			return $field;
		}

		/**
		 * Creates html for options
		 *
		 * @param array $field
		 * @param mixed $meta
		 *
		 * @return array
		 */
		static function options_html( $field, $meta )
		{
			$html = '';
			if ( $field['placeholder'] )
				$html = 'select' == $field['type'] ? "<option value=''>{$field['placeholder']}</option>" : '<option></option>';

			$option = '<option value="%s"%s>%s</option>';

			foreach ( $field['options'] as $value => $label )
			{
				$html .= sprintf(
					$option,
					$value,
					selected( in_array( $value, (array)$meta ), true, false ),
					$label
				);
			}

			return $html;
		}
	}
}
