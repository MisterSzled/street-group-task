module.exports = function (api) {
        api.cache(true);

        return {
                presets: [
                        [
                                'babel-preset-expo',
                                {
                                        // https://github.com/expo/expo/issues/36384
                                        unstable_transformImportMeta: true,
                                },
                        ],
                ],

                plugins: [
                        [
                                'module-resolver',
                                {
                                        root: ['./'],

                                        alias: {
                                                '@': './',
                                                '@src': './src',
                                        },
                                },
                        ],
                        ['react-native-unistyles/plugin', {
                                root: 'src'
                        }],
                        'react-native-worklets/plugin'
                ],
        };
};