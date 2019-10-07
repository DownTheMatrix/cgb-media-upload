/**
 * BLOCK: image-placeholder
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import "./editor.scss";
import "./style.scss";

// WP Imports
const { InspectorControls, RichText, MediaUpload } = wp.editor;

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType("cgb/block-image-placeholder", {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __("image-placeholder - CGB Block"), // Block title.
	description: __("Simple image placeholder generator"),
	icon: "format-gallery", // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: "layout", // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__("image-placeholder"),
		__("gallery-formatting"),
		__("create-guten-block")
	],

	// Attributes (State)
	attributes: {
		bodyContent: {
			source: "html",
			selector: ".editable-text"
		},
		imgUrl: {
			type: "string",
			default: "https://via.placeholder.com/300"
		}
	},

	// Example here > Preview Block (optional)

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
	edit: props => {
		// Creates a <p class='wp-block-cgb-block-image-placeholder'></p>.
		const { setAttributes } = props;
		const { attributes } = props;

		// Edit Text Function
		const changeBodyContent = changes => setAttributes({ bodyContent: changes }); 

		// Upload Image Function
		const selectImage = value => setAttributes({ imgUrl: value.sizes.full.url });

		return (
			<div className="main-wrapper">
				<InspectorControls>
					<div>
						<h3>Options</h3>
					</div>
				</InspectorControls>
				<div className={props.className}>
					<div className="media">
						<MediaUpload 
							onSelect={selectImage}
							render={ ({open}) => {
								return <img 
									src={attributes.imgUrl}
									onClick={open}
								/>
							}}
						/>
					</div>
					<div className="text">
						<h4>Heading</h4>
						<RichText 
							className="editable-text"
							tagName="div"
							placeholder="Edit Text"
							value={attributes.bodyContent}
							onChange={changeBodyContent}
						/>
					</div>
				</div>
			</div>
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */
	save: props => {
		const { attributes } = props;
		return (
			<div className="main-wrapper">
				<div className={props.className}>
					<div className="media">
						<img src={attributes.imgUrl} />
					</div>
					<div className="text">
						<h4>Heading</h4>
						<RichText.Content 
							className="editable-text"
							tagName="div"
							placeholder="Edit Text"
							value={attributes.bodyContent}
						/>
					</div>
				</div>
			</div>
		);
	}
});
