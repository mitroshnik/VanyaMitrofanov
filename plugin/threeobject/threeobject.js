function loadScript(url, callback) {

  var script = document.createElement("script")
  script.type = "text/javascript";

  if (script.readyState) { //IE
    script.onreadystatechange = function() {
      if (script.readyState == "loaded" ||
        script.readyState == "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else { //Others
    script.onload = function() {
      callback();
    };
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};


(function() {
  if (typeof window.addEventListener === 'function') {
    var gl_node = document.querySelectorAll('section');

    loadScript("plugin/threeobject/build/three.min.js", function() {
      loadScript("plugin/threeobject/js/loaders/STLLoader.js", function() {
        loadScript("plugin/threeobject/js/Detector.js", function() {

          var scenes = [];

          for (var i = 0, len = gl_node.length; i < len; i++) {
            var element, stl_to_load;

            if (gl_node[i].hasAttribute('data-3d') | gl_node[i].hasAttribute('data-background-3d')) {
              gl_n = gl_node[i];

              if (gl_n.hasAttribute('data-3d')) {
                element = gl_n;
                stl_to_load = element.getAttribute('data-3d')
              } else if (gl_n.hasAttribute('data-background-3d')) {
                element = document.querySelectorAll('.slide-background')[i]
                stl_to_load = gl_n.getAttribute('data-background-3d')
              }

              if (!Detector.webgl) Detector.addGetWebGLMessage();

              //Parse code inside a comment
              function getsettings(string) {
                var start = string.search('<!--settings') + 12;
                var end = string.search('settings-->');
                if ((start < end) && (start) && (end)) {
                  var code = string.substring(start, end).trim();
                  return code;
                } else {
                  return "{}"
                }
              }

              function getcode(string) {
                var start = string.search('<!--code') + 8;
                var end = string.search('code-->');
                if ((start < end) && (start) && (end)) {
                  var code = string.substring(start, end).trim();
                  return code;
                } else {
                  return "{}"
                }
              }

              function MergeRecursive(obj1, obj2) {
                for (var p in obj2) {
                  try {
                    // Property in destination object set; update its value.
                    if (obj2[p].constructor == Object) {
                      obj1[p] = MergeRecursive(obj1[p], obj2[p]);
                    } else {
                      obj1[p] = obj2[p];
                    }
                  } catch (e) {
                    // Property in destination object not set; create it and set its value.
                    obj1[p] = obj2[p];
                  }
                }
                return obj1;
              }

              //wait until element exist (for background compatibility)
              var existCondition = setInterval(function() {
                if (element) {
                  clearInterval(existCondition);
                }
              }, 100); // check every 100ms

              scenes.push(new App(element, gl_n, stl_to_load))

              function App(element, gl_n, stl_to_load) {

                var original_settings = {
                  stl: [],
                  camera: {
                    position: {
                      x: 300,
                      y: 300,
                      z: 300
                    },
                    target: {
                      x: 0,
                      y: 0,
                      z: 0
                    }
                  }
                };
                var new_settings = JSON.parse(getsettings(gl_n.innerHTML.trim()));
                var settings = MergeRecursive(original_settings, new_settings);
                var code = getcode(gl_n.innerHTML.trim())

                var container;
                var camera, cameraTarget, scene, renderer;

                init();
                // animate();

                function init() {

                  container = document.createElement('div');
                  element.appendChild(container);

                  camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 2000);
                  camera.position.set(settings.camera.position.x, settings.camera.position.y, settings.camera.position.z);

                  cameraTarget = new THREE.Vector3(settings.camera.target.x, settings.camera.target.y, settings.camera.target.z);

                  scene = new THREE.Scene();
                  // scene.fog = new THREE.Fog( 0x72645b, 100, 500 );
                  var loader = new THREE.STLLoader();
                  for (var i = 0; i < settings.stl.length; i++) {
                    loadstl(settings.stl[i]);
                  }

                  if ((typeof stl_to_load === 'string' || stl_to_load instanceof String) && (stl_to_load != 'true')  ) {
                    var stla = {file: stl_to_load};
                    try {
                      loadstl(stla);
                    } catch (e) {
                      console.log('ERROR =>', e)
                    }
                  }

                  function loadstl(new_stl) {
                    default_stl = {
                      file: null,
                      material: {
                        color: 0xff5533,
                        specular: 0x111111,
                        shininess: 200
                      },
                      position: {
                        x: 0,
                        y: 0,
                        z: -30
                      },
                      scale: 1
                    };
                    stl = MergeRecursive(default_stl, new_stl);
                    loader.load(stl.file, function(geometry) {
                      var material = new THREE.MeshPhongMaterial({
                        color: stl.material.color,
                        specular: stl.material.specular,
                        shininess: stl.material.shininess
                      });
                      var mesh = new THREE.Mesh(geometry, material);
                      mesh.position.set(stl.position.x, stl.position.y, stl.position.z);
                      // mesh.rotation.set( 0, - Math.PI / 2, 0 );
                      mesh.scale.set(stl.scale, stl.scale, stl.scale);
                      mesh.castShadow = true;
                      mesh.receiveShadow = true;
                      scene.add(mesh);
                    });

                  }

                  //EXEcute slide commented code.
                  eval(code);
                  // Lights

                  scene.add(new THREE.HemisphereLight(0x443333, 0x111122));

                  addShadowedLight(1, 1, 1, 0xffffff, 1.35);
                  addShadowedLight(0.5, 1, -1, 0xffaa00, 1);
                  // renderer

                  renderer = new THREE.WebGLRenderer({
                    antialias: false
                  });
                  // renderer.setClearColor( scene.fog.color );
                  renderer.setPixelRatio(window.devicePixelRatio);
                  renderer.setSize(window.innerWidth, window.innerHeight);

                  renderer.gammaInput = true;
                  renderer.gammaOutput = true;

                  renderer.shadowMap.enabled = true;
                  renderer.shadowMap.renderReverseSided = false;

                  container.appendChild(renderer.domElement);


                  window.addEventListener('resize', onWindowResize, false);

                }

                function addShadowedLight(x, y, z, color, intensity) {
                  var directionalLight = new THREE.DirectionalLight(color, intensity);
                  directionalLight.position.set(x, y, z);
                  scene.add(directionalLight);
                  directionalLight.castShadow = true;
                  var d = 1;
                  directionalLight.shadow.camera.left = -d;
                  directionalLight.shadow.camera.right = d;
                  directionalLight.shadow.camera.top = d;
                  directionalLight.shadow.camera.bottom = -d;
                  directionalLight.shadow.camera.near = 1;
                  directionalLight.shadow.camera.far = 4;
                  directionalLight.shadow.mapSize.width = 1024;
                  directionalLight.shadow.mapSize.height = 1024;
                  directionalLight.shadow.bias = -0.005;
                }

                function onWindowResize() {
                  camera.aspect = window.innerWidth / window.innerHeight;
                  camera.updateProjectionMatrix();
                  renderer.setSize(window.innerWidth, window.innerHeight);
                }

                this.animate = function() {
                  render();
                };

                // function animate() {
                //   requestAnimationFrame(animate);
                //   render();
                // }

                function render() {
                  var timer = Date.now() * 0.0005;
                  camera.position.x = Math.cos(timer) * 100;
                  camera.position.y = Math.cos(timer) * 100;
                  camera.position.z = Math.sin(timer) * 100;
                  camera.lookAt(cameraTarget);
                  renderer.render(scene, camera);
                }

              }


            }
          }
          animate();

          function animate() {
            scenes.forEach(function(scene) {
              scene.animate()
            });
            requestAnimationFrame(animate);
          }


        })
      })
    })

  }
})();
