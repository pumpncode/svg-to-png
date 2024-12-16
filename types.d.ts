declare interface SvgToPngOptions {
	compress?: boolean,
	resizeHeight?: number,
	resizeWidth?: number
}

/**
 * Converts an SVG file to a PNG file.
 *
 * @param {string} svgPath - The path to the SVG file.
 * @param {string} pngPath - The path to the PNG file.
 * @param {SvgToPngOptions} [options] - The options object.
 * @returns {Promise<void>} - A promise that resolves when the PNG file has been created.
 * @example
 */
declare function svgToPng(
	svgPath: string,
	pngPath: string,
	options?: SvgToPngOptions
): Promise<void>;
