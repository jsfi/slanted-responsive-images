# slanted-responsive-images

> Create images that are responsive with arbitrary top and/or bottom slants.

## Usage

```html
<img class="img" id="img" src="img/dresden.jpg" alt="Dresden" />
<script src="js/slanted-responsive-images.js"></script>
```

```js
window.addEventListener('load', function() {
    var img = document.getElementById('img');
    slanted.init(img);
});
```

The script only adds the responsive image before the selected container. A possible implementation looks like this.

```html
<div class="img-container">
    <img class="img" id="img" src="img/dresden.jpg" alt="Dresden" />
</div>
```

```css
/* 1 */
.img-container {
    display: inline-block;
    position: relative;
}

/* 2 */
.img-svg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
}

/* 3 */
.img {
    display: block;
    max-width: 100%;
}

/* 4 */
.img-svg + .img {
    position: relative;
    z-index: 1;
    opacity: 0;
}
```

The CSS does the following:

1. The container will be as big as the inner element.
* The element is set to block so the container is exactly as big as the element.
* By default the SVG-element is added with the class `img-svg`. The CSS sets this SVG to the same position and size as the original image.
* After the SVG is added before the original element, the element could be hidden (`visibility: hidden`), but a better solution is to make it invisible and move it in front of the SVG so event-listeners and right-click -> save are still working correctly.

## functions

### init

```js
var svg = slanted.init(el);
//returns SVG-element that is inserted before the passed element
```

### resize

This function should be called after the dimensions of the original element have changed.

```js
//after resize event
slanted.resize(img);
```

It is possible to pass either the original element or the inserted SVG-element.

## options

### usage

```js
slanted.init(img, options);
slanted.resize(img, options);
```


### defaults

```js
{
    image: true,
    fill: false,
    position: 'xMidYMid',
    top: -4,
    bottom: 4,
    svgClass: 'img-svg'
}
```

#### image

If `true` the src of an image or the background-image of the passed element will be used. Works with responsive images (picture or srcset) as currentSrc is requested first.

Alternatively a string with an image-src can be passed.

#### fill

If `true`the background-color of the passed element will be used.

Alternatively a string can be passed, e.g. an anchor to a gradient:
```html
<svg height="0" width="0">
    <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:rgb(255,255,0);stop-opacity:1" />
            <stop offset="100%" style="stop-color:rgb(255,0,0);stop-opacity:1" />
        </linearGradient>
    </defs>
</svg>
```

```js
{
    fill: 'url(#grad1)'
}
```

When using `fill` you should probably set `image` to false, except it is your intention to have a color or gradient behind the image.


#### position

This option defines the [position](https://developer.mozilla.org/en/docs/Web/SVG/Attribute/preserveAspectRatio) of the image.

#### top

This option defines the top-slant in degrees.

#### bottom

This option defines the bottom-slant in degrees.

#### svgClass

This option defines the class that is added to the SVG-element

## todos

### automated testing

### Cross Browser Testing

| Browser | Version | Checked |
| ------- |:-------:|:-------:|
| Chrome | ≥ 47 | ✓ |
| Firefox | ≥ 41 | ✓ |
| Safari | ≥ 9 | ✓ |
| IE | ≥ 9 | ? |

### jQuery Plugin for easier usage

### check if right/left slant is useful
