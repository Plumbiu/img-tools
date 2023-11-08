import sharp from 'sharp'

export async function POST(req: Request) {
  const raw = await req.arrayBuffer()
  const { searchParams } = new URL(req.url)
  let quality = Number(searchParams.get('quality'))
  if (Number.isNaN(quality)) {
    quality = 75
  }
  const buffer = await sharp(raw)
    .webp({
      quality,
    })
    .toBuffer()
  return Response.json({
    buffer,
    size: (buffer.byteLength / 1024).toFixed(2),
  })
}
