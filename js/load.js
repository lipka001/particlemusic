
function readFile(input) {
    let file = input.files[0];
  
    let audio = document.createElement('audio');
    audio.id = "audio";
    document.body.append(audio);

    audio.src = URL.createObjectURL(file);
        particleCanvas = new ParticleCanvas({
            selector: "#particleCanvas",
            width: window.innerWidth*0.7,
            height: window.innerHeight,
            color: "rgba(0, 0, 0, 1)",
            particleCount: 200
        });

        music = new Music({});
    // URL.revokeObjectURL(audio.src);
 }

 function dropHandler(ev) {
    document.querySelector('#dropzone').style.backgroundColor = "#000";
  
    ev.preventDefault();

    let file = ev.dataTransfer;
    readFile(file);

  
    // if (ev.dataTransfer.items) {
    //   // Use DataTransferItemList interface to access the file(s)
    //   for (var i = 0; i < ev.dataTransfer.items.length; i++) {
    //     // If dropped items aren't files, reject them
    //     if (ev.dataTransfer.items[i].kind === 'file') {
    //       var file = ev.dataTransfer.items[i].getAsFile();
    //       console.log('... file[' + i + '].name = ' + file.name);
    //     }
    //   }
    // } else {
    //   // Use DataTransfer interface to access the file(s)
    //   for (var i = 0; i < ev.dataTransfer.files.length; i++) {
    //     console.log('... file[' + i + '].name = ' + ev.dataTransfer.files[i].name);
    //   }
    // }
  }

  function dragOverHandler(ev) {
    document.querySelector('#dropzone').style.backgroundColor = "#202020";
    ev.preventDefault();
  }

  
  function dragOverLeave(ev) {
    document.querySelector('#dropzone').style.backgroundColor = "#000";
    ev.preventDefault();

  }