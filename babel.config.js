module.exports = (api) => {
	api.cache(true);
	return {
		presets: [
			["babel-preset-expo", { jsxImportSource: "nativewind" }],
			"nativewind/babel",
		],
		plugins:[
			[
				'module-resolver',
				{
					root: ['.'],
					alias: {
						"@/ui": "./components/ui",
						"@/page": "./components/page",
						"@/components": "./components",
						"@/app": "./app",
						"@/": "."
					}
				}
			]
		]
	};
};
