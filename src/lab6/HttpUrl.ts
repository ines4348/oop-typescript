import {UrlParsingError} from './UrlParsingError'

enum Protocol {
    'HTTP' = 'http',
    'HTTPS' = 'https',
}

const HTTP_DEFAULT_PORT = 80
const HTTPS_DEFAULT_PORT = 443
const ERROR_URL = 'Wrong url'
const ERROR_PROTOCOL = 'Wrong protocol'
const ERROR_DOMAIN = 'Wrong domain'
const ERROR_PORT = 'Wrong port'
const ERROR_DOCUMENT = 'Wrong document'

class HttpUrl {
    private readonly domain: string
    private readonly document: string
    private readonly port: number
    private readonly protocol: Protocol

    constructor(url: string) {
        if (!HttpUrl.isCorrectUrlCharacter(url)) {
            throw new UrlParsingError(ERROR_URL)
        }

        //строку сначала разделить на элементы
        const urlMap: Map<string, string> = HttpUrl.getUrlMap(url)

        this.protocol = HttpUrl.convertStringToProtocol(urlMap.get('protocol'))
        this.domain = HttpUrl.getCorrectDomain(urlMap.get('domain'))
        this.port = this.getCorrectPort(urlMap.get('port'))
        this.document = HttpUrl.getCorrectDocument(urlMap.get('document'))
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

    private getDefaultPort(): number {
        if (this.protocol === Protocol.HTTP) {
            return HTTP_DEFAULT_PORT
        } else {
            return HTTPS_DEFAULT_PORT
        }
    }

    private getCorrectPort(port: string | undefined): number {
        if (!port) {
            return this.getDefaultPort()
        }

        if (!HttpUrl.isCorrectPort(port)) {
            throw new UrlParsingError(ERROR_PORT)
        }

        return parseInt(port, 10)
    }

    private static convertStringToProtocol(protocol: string | undefined): Protocol {
        if (protocol?.toLowerCase() === Protocol.HTTPS) {
            return Protocol.HTTPS
        } else if (protocol?.toLowerCase() === Protocol.HTTP) {
            return Protocol.HTTP
        } else {
            throw new UrlParsingError(ERROR_PROTOCOL)
        }
    }

    private static getUrlMap(url: string): Map<string, string> {
        const urlMap: Map<string, string> = new Map()
        const extractedProtocol: string[] = url.split('://', 2)

        urlMap.set('protocol', extractedProtocol[0])

        const extractedDomainAndPort: string[] = extractedProtocol[1].split('/', 2)
        const extractedDomain: string[] = extractedDomainAndPort[0].split(':', 2)
        urlMap.set('domain', extractedDomain[0])
        urlMap.set('port', extractedDomain[1])
        urlMap.set('document', extractedDomainAndPort[1])

        return urlMap
    }

    private static getCorrectDomain(domain: string | undefined): string {
        if (!domain || !HttpUrl.isCorrectDomain(domain)) {
            throw new UrlParsingError(ERROR_DOMAIN)
        }

        return domain
    }

    private static getCorrectDocument(document: string | undefined): string {
        if (!document) {
            document = '/'
        }

        if (document[0] !== '/') {
            document = `/${document}`
        }

        if (document && !HttpUrl.isCorrectDocument(document)) {
            throw new UrlParsingError(ERROR_DOCUMENT)
        }

        return document
    }

    private static isCorrectDocument(domain: string): boolean {
        return !Boolean(domain.match(/[^0-9a-zA-Z-._!~*'()/?=:]/))
    }

    private static isCorrectDomain(domain: string): boolean {
        if (Boolean(domain.match(/[^0-9a-zA-Z\-.]/))) {
            return false
        }

        if (domain.includes('--')) {
            return false
        }

        return !(domain[0] === '-' && domain[domain.length - 1] === '-')
    }

    //статический метод, порт в виде строки с другим названием
    private static isCorrectPort(portAsString: string): boolean {
        if (portAsString.match(/[^0-9]/)) {
            return false
        }

        const portByNumber: number = parseInt(portAsString, 10)
        return portByNumber < 65536 && portByNumber != 0
    }

    //сделать статическим или свободной функцией
    private static isCorrectUrlCharacter(url: string): boolean {
        if (!url) {
            return false
        }

        //убрать экранирование
        return !Boolean(url.match(/[^0-9a-zA-Z-.:_!~*'()/?&=]/))
    }
}

export {
    HttpUrl,
    Protocol,
}