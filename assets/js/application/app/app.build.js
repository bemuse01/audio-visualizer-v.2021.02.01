APP.build = class{
    constructor(){
        this.#init()
        this.#create()
    }

    // init
    #init(){
        this.param = new APP.param()
    }

    // create
    #create(){
        const canvas = document.querySelector('#canvas')

        this.scene = new THREE.Scene()
    
        this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true, canvas: canvas})
        this.renderer.setSize(WIDTH, HEIGHT)
        this.renderer.setPixelRatio(RATIO)
        this.renderer.setClearColor(0x000000)
        this.renderer.setClearAlpha(0.0)

        this.camera = new THREE.PerspectiveCamera(this.param.fov, WIDTH / HEIGHT, this.param.near, this.param.far)
        this.camera.position.z = this.param.pos
        this.scene.add(this.camera)
    }

    // render
    animate(){
        this.#render()
    }
    #render(){
        this.camera.lookAt(this.scene.position)
        this.renderer.render(this.scene, this.camera)
    }

    // event
    resize(){
        this.camera.aspect = WIDTH / HEIGHT
        this.camera.updateProjectionMatrix()

        this.renderer.setSize(WIDTH, HEIGHT)
    }
}