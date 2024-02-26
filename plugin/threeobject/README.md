# threeobject

Little revealjs plugin that create threejs object that renders to the background or in a div inside a section


![example](./example.jpg)


usage

the object to ad to the scene have to be "commented" inside a `<!--code` `code-->`

```javascript
<section data-background-3d=true>
  <!--code
  var cube_geometry = new THREE.BoxGeometry( 10, 10, 11 );
  var cube_material = new THREE.MeshLambertMaterial( { color: 0x404040 } );
  var cube_mesh = new THREE.Mesh( cube_geometry, cube_material );
  scene.add( cube_mesh );
  code-->
  Voxel
</section>
```
you can replace `data-background-3d` for `data-3d` for render inside a div.
the boolean can be replaced for the path of a `.stl` file.


how to load:

```javascript
<script>
    Reveal.initialize({

        // ... add your settings here ...

        // Optional reveal.js plugins
        dependencies: [
            // other dependencies ...

            // add THIS dependency for threeobject plugin
            { src: 'plugin/threeobject/threeobject.js', async: true }

        ]
    });

</script>
```
