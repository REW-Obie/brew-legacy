# v2.0.0 (2016-05-19)

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

Implemented [z-index scale](https://goo.gl/w8b6CQ) in brew.css

- CSS variables implemented using [postcss-css-variables plugin](https://goo.gl/uyNjPB)

- For more information: see [#8](https://github.com/Real-Estate-Webmasters/brew/issues/8)

### Selector Modifiers

- Applied to styles that are likely to change

- [Descendant selectors](https://goo.gl/Blkft0) and multiple class selectors are used for styles that are less likely to change E.g Sizing (`.btn.S2`) and Positioning (`.tail.TR`)

- Implemented a standard naming convention that looks similar to CSS syntax (`block-element--modifier`) [where appropriate](https://goo.gl/HjZvuS)

### Modifier Classes

- Updated modifier classes for different use cases

- The modifier classes in brew can be more flexible E.g Breakpoints for positioning:

    ```css
    .L {
        float: left;
        margin-right: auto;
    }
    ```
    ```html
    <div class="L"></div>
    ```
    Based on the code above the div will always be floated left and if a designer wanted that float to only apply after a certain breakpoint she would need to write a stronger selector in a media query block to override `.L`

    By making use of modifiers we can wrap the selector in a media query to ensure that the float only occurs at a certain viewport width E.g

    ```css
    @media (--medium-viewport) {
        .L-md {
            float: left;
            margin-right: auto;
        }

        .R-md {
            float: right;
            margin-left: auto;
        }
    }
    ```
- Currently the modifiers for spacing have a fixed value E.g

```css
.padL {
    padding-left: 15px;
}
```    
- If another designer were to make use of this class she may need a gap wider than 15px and could end up in one of the three scenarios:

    - writing a new selector
    - or modifying `.padL`
    - or not using the modifier class

- To make things more flexible the spacing values have been stored in [variables](https://goo.gl/7OLYg9)

- This way the spacing can be changed on a per project basis

- Also modifiers have been added to the classes for different sizes E.g

```css
.marL-sm {
    margin-left: var(--mar-sm);
}

.marL-md {
    margin-left: var(--mar-md);
}

.marL-lg {
    margin-left: var(--mar-lg);
}

.marL-xl {
    margin-left: var(--mar-xl);
}
```
