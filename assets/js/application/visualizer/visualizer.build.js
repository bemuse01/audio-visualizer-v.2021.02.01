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
        // this.geometry = new THREE.CircleGeometry(this.param.radius, this.param.seg)
        // this.sample = new THREE.CircleGeometry(this.param.radius, this.param.seg).vertices
        console.log(this.geometry.vertices.length / 2)
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
            if(i < this.geometry.vertices.length / 2) e.y = this.param.offset + audioData[i] * 2
            else e.y = -this.param.offset + -audioData[i % audioData.length] * 2
        })
      
        // const geometry = this.geometry
        // const vertices = geometry.vertices

        // for(let i = 1; i < vertices.length; i++){
        //     const x = this.sample[i].x + (this.sample[i].x * audioData[i - 1]) / 10
        //     const y = this.sample[i].y + (this.sample[i].y * audioData[i - 1]) / 10

        //     vertices[i].x = x
        //     vertices[i].y = y
        // }

        this.geometry.verticesNeedUpdate = true
    }
}