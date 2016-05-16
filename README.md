# v2.0.0 (2016-05-16 )

## Updates

### Print Styles
- Added print stylesheet to brew.css
- https://github.com/h5bp/html5-boilerplate/blob/master/dist/doc/css.md#print-styles

> The print styles are included along with the other css to avoid the additional HTTP request. Also, they should always be included last, so that the other styles can be overwritten.

- `src/base/print.css`

### Import Order

- `@media` blocks were getting added to the bottom of the compiled stylesheet and this led to certain style blocks that serve the same purpose appear in different areas (E.g grid.css). `grid.css` is now imported directly into `./brew.css` as opposed to `base/base.css`

- Base selector styles (`*, html, body, a, hr`) that were located in `./brew.css` have been merged into `src/base/normalize.css`

- `./brew.css` currently used to `import` files only

### Z-Index Scale

Implement [z-index scale](https://goo.gl/w8b6CQ) in brew.css

- CSS variables implemented using [postcss-css-variables plugin](https://goo.gl/uyNjPB)

- For more see [#issue 8](https://github.com/Real-Estate-Webmasters/brew/issues/8)

### Selector Modifiers

- Applied to styles that are likely to change over time

- [Descendant selectors](https://goo.gl/Blkft0) and multiple class selectors are used for styles that are not likely to change E.g Sizing (`.btn.S2`) and Positioning (`.tail.TR`)

- Implemented a standard naming convention that looks similar to CSS syntax (`block-element--modifier`) where appropriate