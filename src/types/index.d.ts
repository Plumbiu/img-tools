interface WebpFile {
  id: number
  name: string
  buffer: Buffer
  zipedBuffer: Buffer
  size: string
  zipedSize?: string
  rate?: string
}
