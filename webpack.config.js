const path = require('path');

module.exports = {
    entry: './user_shape.js', // Entry file
    output: {
        filename: 'bundle.js', // Output bundle
        path: path.resolve(__dirname, 'dist'), // Output directory
    },
    mode: 'development', // or 'production'
};

