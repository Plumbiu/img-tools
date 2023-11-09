'use client'

import { useRef, useState } from 'react'
import {
  Button,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Slider,
  Stack,
} from '@mui/material'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import { GridRowParams } from '@mui/x-data-grid'
import {
  buffer2Base64,
  buffer2Base64Url,
  transWebp,
  openImgPreivew,
  removeSuffix,
} from '@/lib'
import Dialog from '@/components/Dialog'
import Header from '@/components/Header'
import Toast from '@/components/Toast'
import Table from '@/components/Table'

const zip = new JSZip()

export default function Home() {
  const iptRef = useRef<HTMLInputElement>(null)
  const [webpFile, setWebpFile] = useState<WebpFile[]>([
    {
      id: 1,
      name: '传入图片的名字',
      buffer: Buffer.from('0011'),
      zipedBuffer: Buffer.from('01'),
      size: '800kb = 初始大小',
      zipedSize: '400kb = 压缩为 webp 格式的图片大小',
      rate: '50% = 压缩大小/原始大小',
    },
  ])
  const [toastOpen, setToastOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState<[string, string]>()
  const [quality, setQuality] = useState(80)

  function download() {
    try {
      zip.generateAsync({ type: 'blob' }).then((content) => {
        saveAs(content, 'example.zip')
      })
    } catch {
      // noop
    } finally {
      setToastOpen(true)
    }
  }

  async function showImg() {
    const files = iptRef.current?.files
    if (!files) {
      return
    }
    const ziped: WebpFile[] = []
    let idx = 1
    for (const file of files) {
      const arrBuf = await file.arrayBuffer()
      const size = file.size
      const { zipedBuffer, zipedSize } = await transWebp(arrBuf, {
        quality,
      })
      const name = removeSuffix(file.name)
      ziped.push({
        id: idx++,
        name,
        buffer: Buffer.from(arrBuf),
        zipedBuffer,
        size: size + 'kb',
        zipedSize: zipedSize + 'kb',
        rate: size - zipedSize + 'kb',
      })
      zip.file(`${name}.webp`, buffer2Base64(zipedBuffer), { base64: true })
    }
    setWebpFile(ziped)
    console.log({ ziped })
  }

  function handleClose() {
    setDialogOpen(false)
  }

  function handleRowClick(params: GridRowParams<WebpFile>) {
    const { row } = params
    setSelectedValue([
      buffer2Base64Url(row.buffer),
      buffer2Base64Url(row.zipedBuffer),
    ])
    setDialogOpen(true)
  }
  return (
    <div>
      <Header />
      <main>
        <List
          subheader={<ListSubheader>压缩设置</ListSubheader>}
          sx={{
            width: '100%',
            maxWidth: '500px',
            bgcolor: 'background.paper',
            border: '1px solid rgba(0 ,0, 0, 0.15)',
            borderRadius: '4px',
          }}
        >
          <ListItem>
            <ListItemText>质量</ListItemText>
            <ListItemText primary={quality} />
            <Slider
              aria-label="Default"
              defaultValue={80}
              max={100}
              min={0}
              onChange={(_e, val) => {
                if (!Array.isArray(val)) {
                  setQuality(val)
                }
              }}
              sx={{
                maxWidth: '350px',
              }}
              value={quality}
              valueLabelDisplay="auto"
            />
          </ListItem>
        </List>
        <Table rowClick={handleRowClick} rows={webpFile} />
        <Stack
          direction="row"
          spacing={2}
          sx={{
            mt: 1,
          }}
        >
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
        <Toast open={toastOpen} />
        <Dialog
          onClose={handleClose}
          open={dialogOpen}
          origin={selectedValue?.[0]}
          title="压缩前后对比(左边为原始图片)"
          ziped={selectedValue?.[1]}
        >
          <Button
            onClick={() => openImgPreivew(selectedValue)}
            variant="contained"
          >
            查看网页效果
          </Button>
        </Dialog>
      </main>
    </div>
  )
}
