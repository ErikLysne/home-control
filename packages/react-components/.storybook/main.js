const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
	stories: [
		'../src/**/*.stories.mdx',
		'../src/**/*.stories.@(js|jsx|ts|tsx)'
	],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'storybook-dark-mode'
	],
	framework: '@storybook/react',
	webpackFinal: async (config, { configType }) => {
		config.resolve.plugins = [new TsconfigPathsPlugin()];
		return config;
	}
};
