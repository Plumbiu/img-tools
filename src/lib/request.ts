interface RequestOptions {
  method: 'get' | 'post'
  body?: BodyInit | null
}

interface GetOptions {
  params?: Params
}

interface PostOptions {
  params?: Params
  body?: BodyInit | null
}

type Params = Record<string, string | number | undefined>

export function RequestInit(base: string) {
  if (base[0] !== '/') {
    base = '/' + base
  }

  function resolveApiUrl(route: string, params: Params | undefined) {
    let url = base + route
    if (params) {
      url += '?'
      for (const [key, val] of Object.entries(params)) {
        if (val) {
          url += `${key}=${val}&`
        }
      }
      url = url.slice(0, url.length - 1)
    }

    return url
  }
  return {
    async get<T>(
      url: string,
      options: GetOptions = {
        params: undefined,
      },
    ): Promise<T> {
      const { params } = options
      const apiUrl = resolveApiUrl(url, params)
      const raw = await fetch(apiUrl)
      return await raw.json()
    },
    async post<T>(
      url: string,
      options: PostOptions = {
        params: undefined,
        body: undefined,
      },
    ): Promise<T> {
      const { params, body } = options
      const apiUrl = resolveApiUrl(url, params)
      const raw = await fetch(apiUrl, {
        method: 'POST',
        body,
      })
      return await raw.json()
    },
  }
}
