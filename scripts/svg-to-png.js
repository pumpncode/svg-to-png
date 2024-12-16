import { resolve } from "@std/path";

import { Command } from "@cliffy/command";

import svgToPng from "../svg-to-png.js";

const {
	args
} = Deno;

const {
	options: {
		height, input, output, width
	}
} = await new Command()
	.name("svg-to-png")
	.version("0.1.0")
	.description("Convert an SVG to a PNG")
	.option(
		"-i, --input <input:string>",
		"file path of input SVG image",
		{ required: true }
	)
	.option(
		"-o, --output <output:string>",
		"file path of output PNG image",
		{ required: true }
	)
	.option(
		"--width <width:number>",
		"width of output PNG image"
	)
	.option(
		"--height <height:number>",
		"height of output PNG image"
	)
	.parse(args);

await svgToPng(
	resolve(input),
	resolve(output),
	width || height
		? {
			resizeHeight: height || null,
			resizeWidth: width || null
		}
		: undefined
);
