AUDIO.build = class{
    constructor(src = ''){
        this.#init(src)
        this.#create()
    }

    // init 
    #init(src){
        this.src = src
        this.start = true
        this.param = new AUDIO.param()
        this.buf = []
    }

    // create
    #create(){
        this.#createAudio()
        this.#createContext()
    }
    #createAudio(){
        this.audio = new Audio()
        this.audio.loop = true
        this.audio.src = this.src
        this.audio.volume = 0.6
    }
    #createContext(){
        this.context = new AudioContext()
        
		const source = this.context.createMediaElementSource(this.audio)
        
        this.analyser = this.context.createAnalyser()
		source.connect(this.analyser)
		this.analyser.connect(this.context.destination)
		this.analyser.fftSize = this.param.fft
        
        const bufferLength = this.analyser.frequencyBinCount
        
        this.audioData = new Uint8Array(bufferLength)

        console.log(this.context)
        console.log(this.audioData)
    }

    // render
    animate(){
        this.analyser.getByteFrequencyData(this.audioData)

        const start = Math.floor(1 / this.param.fps * this.context.sampleRate)
        const sample = [...this.audioData.slice(start)]

        this.buf = windowing.kaiser(sample, 1.75).slice(0, this.param.display)
        // this.buf = sample.slice(0, this.param.display)

        const median = AUDIO.method.median(this.buf)
        // const offset = median

        for(let i = 0; i < this.buf.length; i++){
            // this.buf[i] = this.buf[i] - offset + i * (this.param.fft * 0.000005)
            this.buf[i] = Math.max(0, this.buf[i] - median)
        }
    }

    // event
    play(){
        if(this.start){
            this.audio.play()
            this.context.resume()
            this.start = false
        }
    }

    log_fft(arr, fft_length){
        const temp = [...arr]
        temp.forEach(e => {
            e = Math.log(e, fft_length)
        })
        return temp
    }
}