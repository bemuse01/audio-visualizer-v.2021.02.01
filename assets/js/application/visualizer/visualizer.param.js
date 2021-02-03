VISUALIZER.param = class{
    constructor(param = {}){
        this.offset = param.offset || 0.25
        this.width = param.width || 60
        this.height = param.height || 1
        this.radius = param.radius || 20
        this.seg = param.seg || 164
        this.boost = param.boost || 1.2
    }
}