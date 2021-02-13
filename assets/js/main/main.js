new Vue({
    el: '#wrap',
    data(){
        return{
        }
    },
    mounted(){
        this.init()
    },
    methods: {
        // init
        init(){
            this.initThree()
            this.initAudio()
            this.animate()

            window.addEventListener('resize', this.onWindowResize, false)
        },


        // three
        initThree(){
            COMP.app = new APP.build()
            
            this.createObject(COMP.app)
        },
        renderThree(){
            COMP.app.animate()
            COMP.visualizer.animate(COMP.audio.buf)
        },
        createObject(app){
            this.createVisualizer(app)
        },
        createVisualizer(app){
            COMP.visualizer = new VISUALIZER.build(app)
        },


        // audio
        initAudio(){
            COMP.audio = new AUDIO.build('assets/song/LiSA - Unlasting.mp3')

            window.addEventListener('click', this.playAudio)
        },
        playAudio(){
            COMP.audio.play()
        },
        updateAudioData(){
            COMP.audio.animate()
        },


        // event
        onWindowResize(){
            WIDTH = window.innerWidth
            HEIGHT = window.innerHeight

            COMP.app.resize()
        },


        // render
        render(){
            this.renderThree()
            this.updateAudioData()
        },
        animate(){
            this.render()
            requestAnimationFrame(this.animate)
        }
    }
})