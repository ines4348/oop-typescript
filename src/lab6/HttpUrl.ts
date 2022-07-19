import {
    HTTP_DEFAULT_PORT,
    HTTPS_DEFAULT_PORT,
    HttpUrlComponent,
    parseUrl,
    Protocol
} from './HttpUrlsComponents'

class HttpUrl {
    private readonly domain: string
    private readonly document: string
    private readonly port: number
    private readonly protocol: Protocol

    constructor(url: string) {
        const urlComponents: HttpUrlComponent = parseUrl(url)

        this.protocol = urlComponents.protocol
        this.domain = urlComponents.domain
        this.port = urlComponents.port
        this.document = urlComponents.document
    }

    public getDocument(): string {
        return this.document
    }

    public getDomain(): string {
        return this.domain
    }

    public getPort(): number {
        return this.port
    }

    public getProtocol(): string {
        return this.protocol
    }

    public getUrl(): string {
        //portStr
        let portAsString = ''
        if (this.protocol === Protocol.HTTP && this.port !== HTTP_DEFAULT_PORT) {
            portAsString = `:${this.port}`
        }

        if (this.protocol === Protocol.HTTPS && this.port !== HTTPS_DEFAULT_PORT) {
            portAsString = `:${this.port}`
        }
        return `${this.protocol}://${this.domain}${portAsString}${this.document}`
    }
}

export {
    HttpUrl,
    Protocol,
}