const path = require('path');

module.exports = {
    cache:false,
    entry: './user_shape.js', // Entry file
    output: {
        filename: 'bundle.js', // Output bundle
        path: path.resolve(__dirname, 'dist'), // Output directory
    },
    mode: 'development', // or 'production',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    }
};

