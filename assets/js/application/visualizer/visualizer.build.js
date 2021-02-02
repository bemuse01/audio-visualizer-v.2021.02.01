VISUALIZER.build = class{
    constructor(app = {}){
        this.#init()
        this.#create()
        this.#render(app)
    }

    #init(){
        this.param = new VISUALIZER.param()
    }

    #render(app){
        app.scene.add(this.mesh)
    }

    #create(){
        this.#createGeometry()
        this.#createMaterial()
        this.#createMesh()
    }

    #createMesh(){
        this.mesh = new THREE.Mesh(this.geometry, this.material)
    }

    #createGeometry(){
        this.geometry = new THREE.PlaneGeometry(this.param.width, this.param.height, this.param.seg)
    }

    #createMaterial(){
        this.material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 1.0
        })
    }

    animate(audioData){
        this.geometry.vertices.forEach((e, i) => {
            // if(i < this.geometry.vertices.length / 2) e.y = audioData[i] * 0.1
            if(i < this.geometry.vertices.length / 2) e.y = this.param.offset + audioData[i]
            else e.y = -this.param.offset + -audioData[i % audioData.length - 1]
        })
        this.geometry.verticesNeedUpdate = true
    }
}