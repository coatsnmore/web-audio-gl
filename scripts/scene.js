App.Scene = App.Scene || (function () {

    var scene, renderer, camera, sphere;

    var setup = function () {
        scene = new THREE.Scene();
        renderer = new THREE.WebGLRenderer();
        addCamera();
        addLight();
        addSphere();
        draw();
    }

    var changeSphere = function () {
        console.log('changeSphere');
        sphere.geometry.dispose();
        sphere.geometry = sphere.geometry.clone();
        sphere.geometry.radius = 100;
    }

    var addCamera = function () {
        // Set the scene size.
        const WIDTH = window.innerWidth;
        const HEIGHT = window.innerHeight;

        // Set some camera attributes.
        const VIEW_ANGLE = 45;
        const ASPECT = WIDTH / HEIGHT;
        const NEAR = 0.1;
        const FAR = 10000;

        // Get the DOM element to attach to
        const container =
            document.querySelector('#container');

        // Create a WebGL renderer, camera
        // and a scene
        camera =
            new THREE.PerspectiveCamera(
                VIEW_ANGLE,
                ASPECT,
                NEAR,
                FAR
            );

        // const scene = new THREE.Scene();

        // Add the camera to the scene.
        scene.add(camera);

        // Start the renderer.
        renderer.setSize(WIDTH, HEIGHT);

        // Attach the renderer-supplied
        // DOM element.
        container.appendChild(renderer.domElement);
    }

    var addSphere = function () {

        // var geometry = new THREE.SphereGeometry( 5, 32, 32 );
        // var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
        // var sphere = new THREE.Mesh( geometry, material );

        // create the sphere's material
        const sphereMaterial =
            new THREE.MeshLambertMaterial(
                {
                    color: 0xCC0000
                });

        // Set up the sphere vars
        const RADIUS = 10;
        const SEGMENTS = 8;
        const RINGS = 8;

        // Create a new mesh with
        // sphere geometry - we will cover
        // the sphereMaterial next!

        var geometry = new THREE.SphereGeometry(
            RADIUS,
            SEGMENTS,
            RINGS);
        geometry.dynamic = true;
        geometry.verticesNeedUpdate = true;

        sphere = new THREE.Mesh(
            geometry,
            sphereMaterial);

        // Move the Sphere back in Z so we
        // can see it.
        sphere.position.z = -300;

        // Finally, add the sphere to the scene.
        scene.add(sphere);

    }

    var addLight = function () {
        // create a point light
        const pointLight =
            new THREE.PointLight(0xFFFFFF);

        // set its position
        pointLight.position.x = 10;
        pointLight.position.y = 50;
        pointLight.position.z = 130;

        // add to the scene
        scene.add(pointLight);
    }

    var draw = function () {

        function update() {
            // Draw!
            renderer.render(scene, camera);

            // Schedule the next frame.
            requestAnimationFrame(update);
        }

        // Schedule the first frame.
        requestAnimationFrame(update);
    }

    return { setup: setup, changeSphere: changeSphere };
})();