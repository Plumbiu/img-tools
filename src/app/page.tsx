/* eslint-disable @stylistic/multiline-ternary */
'use client'

import { useRef, useState } from 'react'
import { Button, Stack } from '@mui/material'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import styles from './page.module.css'
import Mask from '@/components/ui/Mask'
import { buffer2Base64 } from '@/lib'

interface WebpFile {
  buf: Buffer
  name: string
}

export default function Home() {
  const iptRef = useRef<HTMLInputElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const [webpFile, setWebpFile] = useState<WebpFile[]>([])
  async function download() {
    const zip = new JSZip()
    webpFile.forEach(({ buf, name }, i) => {
      zip.file(`${name}.webp`, buffer2Base64(buf), { base64: true })
    })
    zip.generateAsync({ type: 'blob' }).then((content) => {
      saveAs(content, 'example.zip')
    })
  }

  async function showImg() {
    const files = iptRef.current?.files
    if (!files) {
      return
    }
    const newimgs: WebpFile[] = []
    for (const file of Array.from(files)) {
      const rawJSON = await fetch('/api/', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: await file.arrayBuffer(),
      })
      const { buf } = await rawJSON.json()
      console.log({ size: file.size, buf })
      newimgs.push({ buf: buf.data, name: file.name })
    }
    setWebpFile(newimgs)
  }
  return (
    <main className={styles.main}>
      {/* {imgInstance.length > 0 ? (
        <div>
          <img
            alt="upload img"
            height={500}
            ref={imgRef}
            src={buffer2Base64(imgInstance[0])}
          />
          <div>size: {imgInstance[0]?.buffer?.byteLength}</div>
        </div>
      ) : (
        <Mask />
      )} */}
      <Stack direction="row" spacing={2}>
        <Button onClick={() => iptRef.current?.click()} variant="contained">
          选择文件
        </Button>
        <input
          accept="image/*"
          hidden
          multiple
          onChange={showImg}
          ref={iptRef}
          type="file"
        />
        <Button
          disabled={webpFile.length <= 0}
          onClick={() => download()}
          variant="outlined"
        >
          点击下载
        </Button>
      </Stack>
    </main>
  )
}
