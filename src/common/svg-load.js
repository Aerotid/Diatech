function requireAll(r) {
    r.keys()
        .forEach(r);
}

requireAll(require.context('../components/', true, /\.svg$/));
// requireAll(require.context('../icons/', true, /\.svg$/));