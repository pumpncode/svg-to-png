import { toFileUrl } from "@std/path";

import { launch } from "@astral/astral";

const {
	Command,
	writeFile
} = Deno;

// TODO[2025-01-01]: Implement animated SVG
// SVGElement.pauseAnimations() to stop animation
// SVGAnimationElement.setCurrentTime() to set time
// calculate time somehow using some fps and maybe duration attributes or maybe just use 5 seconds
// export each frame to png, compare each png to correct png and take average as score

/**
 * Converts an SVG file to a PNG file.
 *
 * @param {string} svgPath - The path to the SVG file.
 * @param {string} pngPath - The path to the PNG file.
 * @param {object} [options] - The options object.
 * @param {number} [options.resizeWidth] - The width to resize the SVG to.
 * @param {number} [options.resizeHeight] - The height to resize the SVG to.
 * @param {boolean} [options.compress] - Whether to compress the PNG file.
 * @returns {Promise<void>}
 * @example
 */
const svgToPng = async (
	svgPath,
	pngPath,
	{
		compress = true,
		resizeHeight,
		resizeWidth
	} = {}
) => {
	const svgFileUrl = toFileUrl(svgPath);

	const browser = await launch();

	const page = await browser.newPage();

	await page.goto(svgFileUrl.toString(), { waitUntil: "networkidle0" });

	await page.waitForSelector("svg", { timeout: 5_000 });

	const { height, width } = await page.evaluate(() => {
		const svgElement = document.querySelector("svg");

		if (!svgElement) {
			throw new Error("SVG element not found");
		}

		const viewBoxString = svgElement.getAttribute("viewBox");

		svgElement.removeAttribute("style");

		svgElement.style.width = "revert";
		svgElement.style.height = "revert";
		svgElement.removeAttribute("width");
		svgElement.removeAttribute("height");

		const [
			xString,
			yString,
			viewBoxWidthString,
			viewBoxHeightString
		] = viewBoxString?.split(" ") ?? [];

		if (
			viewBoxWidthString &&
			viewBoxHeightString &&
			document.querySelector("parsererror") === null
		) {
			return {
				height: Number(viewBoxHeightString),
				width: Number(viewBoxWidthString)
			};
		}

		throw new Error("SVG viewBox attribute is missing or malformed or SVG code is invalid");
	});

	if (width !== undefined && height !== undefined) {
		if (resizeWidth !== undefined && resizeHeight !== undefined) {
			await page.setViewportSize({
				height: resizeHeight,
				width: resizeWidth
			});
		}
		else if (resizeWidth && resizeHeight === undefined) {
			await page.setViewportSize({
				height: Math.round(height * (resizeWidth / width)),
				width: resizeWidth
			});
		}
		else if (resizeWidth === undefined && resizeHeight) {
			await page.setViewportSize({
				height: resizeHeight,
				width: Math.round(width * (resizeHeight / height))
			});
		}
		else {
			await page.setViewportSize({
				height,
				width
			});
		}

		const imageContent = await page.screenshot({
			captureBeyondViewport: false,
			format: "png",
			fromSurface: true
		});

		await page.close();

		await writeFile(pngPath, imageContent);

		if (compress) {
			const compressCommand = new Command(
				"oxipng",
				{
					args: [
						"-o",
						"6",
						"--strip",
						"safe",
						pngPath
					]
				}
			);

			await compressCommand.output();
		}
	}
	else {
		throw new Error("SVG viewBox attribute is missing or malformed");
	}

	await browser.close();
};

export default svgToPng;
