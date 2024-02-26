# Reveal.js fullscreen code plugin

This is a simple plugin to show code in full screen mode in your presentations.

To use this plugin, you will need to use both the included js script and stylesheet:
- copy `reveal.js-fullscreen-code.js` to your `plugin/reveal.js-fullscreen-code` folder
- copy `reveal.js-fullscreen-code.css.css` to your `plugin/reveal.js-fullscreen-code` folder
- include both files in your presentation:
```html
<link rel="stylesheet" href="plugin/reveal.js-fullscreen-code/reveal.js-fullscreen-code.css">
<script>
    Reveal.initialize({
        // ...
        dependencies: [
            // ...
            { src: 'plugin/reveal.js-fullscreen-code/jquery-3.1.1.min.js' },
            { src: 'plugin/reveal.js-fullscreen-code/reveal.js-fullscreen-code.js' }
        ]
        // ...
    });
</script>
```