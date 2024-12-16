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
 * @param svgPath - The path to the SVG file.
 * @param pngPath - The path to the PNG file.
 * @param options - The options object.
 * @returns A promise that resolves when the PNG file has been created.
 * @example
 */
declare function svgToPng(
	svgPath: string,
	pngPath: string,
	options?: SvgToPngOptions
): Promise<void>;
