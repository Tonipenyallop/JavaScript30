const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function PlayVideo(){
  navigator.mediaDevices.getUserMedia({video:true,audio:false}).then(localMediaStream=>{
    video.srcObject = localMediaStream
    video.play()
    
  }).catch(err=> {
    console.error('camera cannot be found',err)
  })
}


function paintToCanvas(){
  const [width,height] = [video.videoWidth,video.videoHeight]
  canvas.width = width
  canvas.height = height

  setInterval(()=> {
    ctx.drawImage(video,0,0,width,height)
    let pixel = ctx.getImageData(0,0,width,height)
    pixel = yellowEffect(pixel)
    ctx.putImageData(pixel,0,0)
  })
}

function takePhoto(){
  snap.currentTime = 0
  snap.play()

  const data = canvas.toDataURL('image/jpeg')
  const link = document.createElement('a')
  link.href = data
  link.setAttribute('download', 'handsome Taesu picture')
  link.innerHTML = `<img src="${data}" alt="Handsome Taesu is smiling"/>`
  strip.insertBefore(link, strip.firstChild)



}

function yellowEffect(pixel){
  for(let i = 0; i < pixel.data.length; i += 4){
    pixel.data[i + 0] = pixel.data[i + 0] + 100
    pixel.data[i + 1] = pixel.data[i + 1] + 500
    pixel.data[i + 2] = pixel.data[i + 2] - 100
  }

  return pixel
  
}

PlayVideo()
video.addEventListener('canplay',paintToCanvas)