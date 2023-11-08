import sharp from 'sharp'

export async function POST(req: Request) {
  const raw = await req.arrayBuffer()
  const buf = await sharp(raw).webp().toBuffer()
  return Response.json({ buf })
}
