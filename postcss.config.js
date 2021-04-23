const next = require('postcss-cssnext');

module.exports = {
    plugins: [
        next({
            features: {
                autoprefixer: { grid: true }
            }
        }),
    ]
};
