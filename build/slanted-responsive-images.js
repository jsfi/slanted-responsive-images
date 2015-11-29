'use strict';

(function () {
    'use strict';

    var xmlnsNS = 'http://www.w3.org/2000/xmlns/';
    var xlinkNS = 'http://www.w3.org/1999/xlink';
    var svgNS = 'http://www.w3.org/2000/svg';
    var defaults = {
        image: true,
        position: 'xMidYMid',
        top: -4,
        bottom: 4,
        svgClass: 'img-svg'
    };

    var id = 0;

    window.slanted = {
        init: init,
        resize: resize
    };

    function init(el, options) {
        var settings = Object.assign({}, defaults, options);

        if (!el.parentElement) {
            return;
        }

        var svg = create(settings);
        setContent(svg, el, settings);
        el.parentElement.insertBefore(svg, el);
        setClipPath(svg, settings);

        return svg;
    }

    function resize(el, options) {
        var settings = Object.assign({}, defaults, options);
        var svg = undefined;

        if (is(el, 'svg')) {
            svg = el;
        } else if (is(el.previousSibling, 'svg')) {
            svg = el.previousSibling;
        }

        if (!svg) {
            return;
        }

        if (settings.image && settings.image === true) {
            var src = getSrc(svg.nextSibling);
            var image = getSvgElementByTagName(svg, 'image');

            if (image.length) {
                image[0].setAttributeNS(xlinkNS, 'xlink:href', src);
            }
        }

        setClipPath(svg, settings);

        return svg;
    }

    function create(settings) {
        var svg = document.createElementNS(svgNS, 'svg');

        svg.setAttributeNS(xmlnsNS, 'xmlns', svgNS);
        svg.setAttributeNS(xmlnsNS, 'xmlns:xlink', xlinkNS);
        svg.setAttribute('preserveAspectRatio', 'none');
        svg.setAttribute('class', settings.svgClass);

        var defs = document.createElementNS(svgNS, 'defs');

        var clipPath = document.createElementNS(svgNS, 'clipPath');
        clipPath.setAttribute('clipPathUnits', 'objectBoundingBox');
        clipPath.setAttribute('id', 'clip-' + id++);
        defs.appendChild(clipPath);

        svg.appendChild(defs);

        return svg;
    }

    function setContent(svg, el, settings) {
        var clipPath = getClipPath(svg);
        if (!clipPath) {
            return;
        }

        if (settings.fill) {
            var fill = undefined;
            if (settings.fill === true) {
                fill = el.style.backgroundColor;
            } else {
                fill = settings.fill;
            }
            var rect = document.createElementNS(svgNS, 'rect');
            rect.setAttribute('fill', fill);
            rect.setAttribute('preserveAspectRatio', 'none');
            setPos(rect, clipPath.id);
            svg.appendChild(rect);
        }

        if (settings.image) {
            var src = undefined;
            if (settings.image === true) {
                src = getSrc(el);
            } else {
                src = settings.image;
            }

            var image = document.createElementNS(svgNS, 'image');
            image.setAttributeNS(xlinkNS, 'xlink:href', src);
            image.setAttribute('preserveAspectRatio', settings.position + ' slice');
            setPos(image, clipPath.id);
            svg.appendChild(image);
        }
    }

    function setPos(el, clipPathId) {
        el.setAttribute('x', 0);
        el.setAttribute('y', 0);
        el.setAttribute('width', '100%');
        el.setAttribute('height', '100%');
        el.setAttribute('clip-path', 'url(#' + clipPathId + ')');
    }

    function getClipPath(svg) {
        var clipPath = getSvgElementByTagName(svg, 'clipPath');

        if (clipPath.length !== 1) {
            return;
        }

        return clipPath[0];
    }

    function setClipPath(svg, settings) {
        var clipPath = getClipPath(svg);
        if (!clipPath) {
            return;
        }

        var y1 = 0;
        var y2 = 0;
        var y3 = 1;
        var y4 = 1;

        var box = svg.getBBox();

        if (settings.top) {
            var top = getDist(settings.top, box.width, box.height);

            if (settings.top > 0) {
                y2 = top;
            } else {
                y1 = top;
            }
        }

        if (settings.bottom) {
            var bottom = 1 - getDist(settings.bottom, box.width, box.height);
            if (settings.bottom > 0) {
                y4 = bottom;
            } else {
                y3 = bottom;
            }
        }

        while (clipPath.firstChild) {
            clipPath.removeChild(clipPath.firstChild);
        }

        var path = document.createElementNS(svgNS, 'path');
        path.setAttribute('d', 'M0,' + y1 + 'L1,' + y2 + 'L1,' + y3 + 'L0,' + y4 + 'Z');
        clipPath.appendChild(path);
    }

    function getSrc(el) {
        if (is(el, 'img')) {
            return el.currentSrc || el.src;
        }

        var image = el.style.backgroundImage.match(/url\(?(.*?)?\)/);
        if (image) {
            return image[1].replace(/"/g, '');
        }
    }

    function getSvgElementByTagName(svg, tag) {
        return Array.from(svg.getElementsByTagNameNS(svgNS, tag));
    }

    function getRad(deg) {
        return deg * Math.PI / 180;
    }

    function getDist(deg, adjacent, max) {
        //opposite = adjacent * tan(deg)
        //dist = opposite / max
        return adjacent * Math.tan(getRad(Math.abs(deg))) / max;
    }

    function is(el, tag) {
        return el.tagName && el.tagName.toLowerCase() === tag;
    }
})();
//# sourceMappingURL=slanted-responsive-images.js.map
