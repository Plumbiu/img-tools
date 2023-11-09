import { RequestInit } from './request'

const request = RequestInit('/api')

export function buffer2Base64(buffer: Buffer) {
  var binary = ''
  var bytes = new Uint8Array(buffer)
  for (var len = bytes.byteLength, i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return window.btoa(binary)
}

export function arrayBuffer2Base64(arrayBuffer: ArrayBuffer) {
  return window.btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)))
}

interface TransOptions {
  quality?: number
  width?: number
  height?: number
}

interface WebpRequest {
  buffer: {
    type: 'Buffer'
    data: Buffer
  }
  size: number
}

export async function transWebp(
  arrBuf: ArrayBuffer,
  options: TransOptions = {
    quality: 80,
  },
) {
  const { buffer, size } = await request.post<WebpRequest>('/webp', {
    body: arrBuf,
    params: { ...options },
  })

  return {
    zipedBuffer: buffer.data,
    zipedSize: size,
  }
}

export function removeSuffix(name: string) {
  return name.slice(0, name.lastIndexOf('.'))
}

export function buffer2Base64Url(buffer: Buffer) {
  return 'data:image/png;base64,' + buffer2Base64(buffer)
}

function openWin(originHTML: string, zipedHTML: string) {
  const win = window.open('', '_blank')
  const html = `
<div style="display: flex; gap: 32px;">
  <div>
    <h1>压缩前</h1>
    ${originHTML}
  </div>
  <div>
    <h1>压缩后</h1>
    ${zipedHTML}
  </div>
</div>  
`
  if (win) {
    win.document.write(html)
    win.document.title = '压缩预览'
    win.document.close()
  }
}

export function openImgPreivew(base64Url: [string, string] | undefined) {
  if (base64Url === undefined) {
    return
  }
  const originImg = new Image()
  const zipedImg = new Image()
  originImg.src = base64Url[0]
  zipedImg.src = base64Url[0]
  openWin(originImg.outerHTML, zipedImg.outerHTML)
}
