# Img-tools

> 提供图片工具 web-ui 和 API [web-ui](https://img-tools.plumbiu.top/)

# API

## 转换为 webp

> `Post`: https://img-tools.plumbiu.top/api/webp

**请求参数：**

| 参数名  | 参数说明         | 是否必须 | 默认         |
| ------- | ---------------- | -------- | ------------ |
| quality | 压缩的质量       | 否       | 80           |
| width   | 压缩后的图片宽度 | 否       | 原始图片宽度 |
| height  | 压缩后的图片高度 | 否       | 原始图片高度 |

**请求体：**

```ts
type body = Buffer
        | ArrayBuffer
        | Uint8Array
        | Uint8ClampedArray
        | Int8Array
        | Uint16Array
        | Int16Array
        | Uint32Array
        | Int32Array
        | Float32Array
        | Float64Array
        | string
```

**返回类型：**

```ts
interface ReturnedType {
  buffer: {
    type: 'Buffer',
    data: Buffer
  },
  size: number
}
```



# Todo

- [x] 转换为 webp 格式
- [ ] 图片大小
- [ ] 其他文件格式
- [ ] 图片剪切
