/* eslint-disable @stylistic/multiline-ternary */
'use client'

import { useRef, useState } from 'react'
import { Alert, Button, Snackbar, Stack } from '@mui/material'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid'
import {
  buffer2Base64,
  buffer2Base64Url,
  getData,
  openImgPreivew,
  removeSuffix,
} from '@/lib'
import Dialog from '@/components/Dialog'

const columns: GridColDef[] = [
  { field: 'id', headerName: '序号', width: 180 },
  {
    field: 'name',
    headerName: '图片名称',
    flex: 1,
  },
  {
    field: 'size',
    headerName: '原始大小',
    width: 360,
  },
  {
    field: 'zipedSize',
    headerName: '压缩大小',
    type: 'number',
    width: 360,
  },
  {
    field: 'rate',
    headerName: '减少比',
    width: 360,
  },
]

const zip = new JSZip()

export default function Home() {
  const iptRef = useRef<HTMLInputElement>(null)
  const [webpFile, setWebpFile] = useState<WebpFile[]>([])
  const [toastOpen, setToastOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState<[string, string]>()

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
      const { zipedBuffer, zipedSize } = await getData(arrBuf)
      const name = removeSuffix(file.name)
      ziped.push({
        id: idx++,
        name,
        buffer: Buffer.from(arrBuf),
        zipedBuffer,
        size: size + 'kb',
        zipedSize: zipedSize + 'kb',
        rate: (zipedSize / size * 100).toFixed(2) + '%',
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
    <main>
      <DataGrid
        columns={columns}
        disableColumnSelector
        disableRowSelectionOnClick
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        onRowClick={handleRowClick}
        rows={webpFile}
      />
      <Stack
        direction="row"
        spacing={2}
        sx={{
          mt: 2,
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
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        autoHideDuration={6000}
        open={toastOpen}
      >
        <Alert severity="success" sx={{ width: '100%' }} variant="filled">
          压缩成功
        </Alert>
      </Snackbar>
      <Dialog
        onClose={handleClose}
        open={dialogOpen}
        title="压缩前后对比(左边为原始图片)"
      >
        <Stack direction="row" spacing={2}>
          <img
            alt="ziped img"
            className="preview-img"
            height="400"
            src={selectedValue?.[1]}
          />
          <img
            alt="origin img"
            className="preview-img"
            height="400"
            src={selectedValue?.[0]}
          />
        </Stack>
        <Button
          onClick={() => openImgPreivew(selectedValue)}
          variant="contained"
        >
          查看网页效果
        </Button>
      </Dialog>
    </main>
  )
}
