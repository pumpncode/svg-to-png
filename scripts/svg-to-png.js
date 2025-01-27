import { resolve } from "@std/path";

import { Command } from "@cliffy/command";

import svgToPng from "../svg-to-png.js";

const {
	args,
	readTextFile
} = Deno;

let version = "unknown";

try {
	const moduleFilePath = import.meta.filename;

	if (moduleFilePath === undefined) {
		throw new Error("Module file path is undefined.");
	}

	const rootFolderPath = resolve(moduleFilePath, "..");

	const configFilePath = resolve(rootFolderPath, "deno.json");

	const configContent = await readTextFile(configFilePath);

	({ version } = JSON.parse(configContent));
}
catch {
	// do nothing
}

const {
	options: {
		height, input, output, width
	}
} = await new Command()
	.name("svg-to-png")
	.version(version)
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
