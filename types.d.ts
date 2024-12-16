/* eslint-disable no-unused-vars */
/* eslint-disable import-x/unambiguous */

/**
 * The options object for the `svgToPng` function.
 */
declare type SvgToPngOptions = {

	/**
	 * Whether to compress the PNG file.
	 */
	compress?: boolean,

	/**
	 * The height to resize the SVG to.
	 */
	resizeHeight?: number,

	/**
	 * The width to resize the SVG to.
	 */
	resizeWidth?: number
};

/**
 * Converts an SVG file to a PNG file.
 *
 * @param svgPath
 * @param pngPath
 * @param options
 * @returns A promise that resolves when the PNG file has been created.
 * @example
 */
declare function svgToPng(

	/**
	 * The path to the SVG file.
	 */
	svgPath: string,

	/**
	 * The path to the PNG file.
	 */
	pngPath: string,

	/**
	 * The options object.
	 */
	options?: SvgToPngOptions
): Promise<void>;
