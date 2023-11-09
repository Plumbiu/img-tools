import sharp from 'sharp'

export async function POST(req: Request) {
  const raw = await req.arrayBuffer()
  const { searchParams } = new URL(req.url)
  let quality = Number(searchParams.get('quality'))
  if (Number.isNaN(quality)) {
    quality = 80
  }
  let tool = sharp(raw).webp({
    quality,
  })
  const width = Number(searchParams.get('width'))
  const height = Number(searchParams.get('height'))
  if (width && height) {
    tool = tool.resize({
      width,
      height,
    })
  }
  const buffer = await tool.toBuffer()
  return Response.json({
    buffer,
    size: (buffer.byteLength / 1024).toFixed(2),
  })
}
