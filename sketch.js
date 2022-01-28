const dim = 400
let deg = 0

let canvas
let recorder

function setup() {
  canvas = createCanvas(dim, dim)
}

function draw() {
  background('white')

  if (frameCount === 1) {
    recorder = startRecording()
  }

  fill('black')
  translate(dim / 2, dim / 2)
  circle(100 * cos(radians(deg)), 100 * sin(radians(deg)), 10)

  deg++

  if (deg === 360) {
    recorder.stop()
    noLoop()
  }
}

function startRecording() {
  console.log('start recording')

  const chunks = []
  const stream = canvas.elt.captureStream()
  const recorder = new MediaRecorder(stream)
  recorder.ondataavailable = (e) => chunks.push(e.data)
  recorder.onstop = (e) => {
    exportVid(new Blob(chunks, { type: 'video/webm' }))
    console.log('done recording')
  }

  recorder.start()
  return recorder
}

function exportVid(blob) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.style.display = 'none'
  a.href = url
  a.download = 'test.webm'
  a.click()
  window.URL.revokeObjectURL(url)
}
