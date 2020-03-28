class ParticleCanvas {
    constructor(options){

        this.init(options);
        this.createParticle();

        setInterval(() => {
            this.redrawParticle();
        }, 100)

    }

    init(options) {
        
        this.canvas = document.querySelector(options.selector);
        this.context = this.canvas.getContext('2d');

        this.canvas.width = options.width;
        this.canvas.height = options.height;
        this.canvas.style.backgroundColor = options.color;

        this.count = options.particleCount;

        this.particleArray = new Array();
        this.lineLengnt = 0;
        this.lineColor = "rgba(255, 255, 255, 0.5)";

    }

    createParticle() {
        for (let i = 0; i < this.count; i++){
            this.particleArray.push(new Particle({
                canvas: this.canvas,
                context: this.context,
                color: "rgba(255, 255, 255, 0.5)",
                radius: 2
            }));
            this.particleArray[i].create();
        }
    }


    redrawParticle () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let i = 0; i < this.count; i++){  
            this.particleArray[i].move();
        }
        this.rebornParticle();
        this.createLines();
       
    }

    createLines() {
        for (let i = 0; i < this.count; i++){
            for (let j = 0; j < this.count; j++){
                if ((Math.sqrt(Math.pow((this.particleArray[j].x- this.particleArray[i].x), 2)+Math.pow((this.particleArray[j].y- this.particleArray[i].y), 2))) < this.lineLengnt) {
                this.context.strokeStyle = this.lineColor;
                this.context.beginPath();
                this.context.moveTo(this.particleArray[i].x, this.particleArray[i].y);
                this.context.lineTo(this.particleArray[j].x, this.particleArray[j].y);
                this.context.stroke();
                this.context.closePath();
                }
            }
        }
    }

    rebornParticle(){
        for (let i = 0; i < this.count; i++){
            if(this.particleArray[i].lifeTime > Math.random()*3000) {
                this.particleArray[i].reborn();
            }
        }
    }
}

let array;

class Particle {
    constructor(options){

        this.canvas = options.canvas;
        this.context = options.context;
        this.color = options.color;
        this.radius = options.radius;
        this.lifeTime = 0;

        this.speedX = Math.random() * (1 + 1) - 1;
        this.speedY = Math.random() * (1 + 1) - 1;

        this.x = this.canvas.width*Math.random();
        this.y = this.canvas.height*Math.random();

        setInterval(() => this.lifeTime+=1, 5000);

    }

    create() {

        this.context.fillStyle = this.color;
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        this.context.fill();
        this.context.closePath();
    }

    move() {
        if(this.x > this.canvas.width || this.y > this.canvas.height || this.x < 0 || this.y < 0) {
            this.speedX*=-1;
            this.speedY*=-1;
        }

        this.x+=this.speedX;
        this.y+=this.speedY;

        this.create();
    }

    reborn() {
        this.x = this.canvas.width*Math.random();
        this.y = this.canvas.height*Math.random();
        this.lifeTime = 0;
    }
}


class Music {
    constructor(options) {
        this.play();
    }

    preparations() {
        this.context = new AudioContext();
        this.analyser = this.context.createAnalyser();
        this.audio = document.querySelector('#audio');
        this.src = this.context.createMediaElementSource(this.audio);
        this.src.connect(this.analyser);
        this.analyser.connect(this.context.destination);
    }
    play() {
        document.querySelector('#play').addEventListener('click', () => {
            if(!this.context){
                this.preparations();
            }
            if(this.audio.paused){
                this.audio.play();
                window.requestAnimationFrame(() => this.loop());
                document.querySelector('#play').innerHTML = `<i class="fa fa-pause"></i>`;
            } else {
                this.audio.pause();
                document.querySelector('#play').innerHTML = `<i class="fa fa-play"></i>`
            }
        });
    }

    loop() {
        if (!this.audio.paused) {
            window.requestAnimationFrame(() => this.loop());
        }
        array = new Uint8Array(this.analyser.frequencyBinCount);
        this.analyser.getByteFrequencyData(array);

        for (let i = 0; i < particleCanvas.count; i++) {
            particleCanvas.lineLengnt = array[100]*0.5;
            particleCanvas.particleArray[i].color = `rgba(${array[100]}, ${array[100]}, ${array[100]}, 0.8)`;
            particleCanvas.lineColor = `rgba(${array[100]}, ${array[100]}, ${array[100]}, 0.8)`;
        }
    }
}
let particleCanvas;
let music;