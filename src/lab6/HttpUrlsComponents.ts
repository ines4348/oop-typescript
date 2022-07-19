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

type HttpUrlComponent = {
    domain: string
    document: string
    port: number
    protocol: Protocol
}

function parseUrl(url: string): HttpUrlComponent {
    const extractedProtocol: string[] = url.split('://', 2)
    if(extractedProtocol.length < 2) {
        throw new Error(ERROR_URL)
    }

    const extractedDomainAndPort: string[] = extractedProtocol[1].split('/', 2)
    const extractedDomain: string[] = extractedDomainAndPort[0].split(':', 2)

    const protocol: Protocol = getProtocol(extractedProtocol[0])
    const domain: string = getDomain(extractedDomain[0])
    const port: number =  getPort(protocol, extractedDomain[1])
    const document: string = getDocument(extractedDomainAndPort[1])

    return {
        protocol: protocol,
        domain: domain,
        port: port,
        document: document,
    }
}

//статический метод, порт в виде строки с другим названием
function isCorrectPortString(portAsString: string): boolean {
    if (portAsString.match(/[^0-9]/)) {
        return false
    }

    const portByNumber: number = parseInt(portAsString, 10)
    return portByNumber < 65536 && portByNumber != 0
}

function getPort(protocol: Protocol, port: string | undefined): number {
    if (port === '') {
        throw new UrlParsingError(ERROR_PORT)
    }

    if (!port) {
        return getDefaultPort(protocol)
    }

    if (!isCorrectPortString(port)) {
        throw new UrlParsingError(ERROR_PORT)
    }

    return parseInt(port, 10)
}

function getProtocol(protocol: string | undefined): Protocol {
    if (protocol?.toLowerCase() === Protocol.HTTPS) {
        return Protocol.HTTPS
    } else if (protocol?.toLowerCase() === Protocol.HTTP) {
        return Protocol.HTTP
    } else {
        throw new UrlParsingError(ERROR_PROTOCOL)
    }
}

function getDocument(document: string | undefined): string {
    if (!document) {
        document = '/'
    }

    if (document[0] !== '/') {
        document = `/${document}`
    }

    if (document && !isCorrectDocument(document)) {
        throw new UrlParsingError(ERROR_DOCUMENT)
    }

    return document
}

function getDomain(domainAsString: string): string {
    if (!domainAsString || !isCorrectDomain(domainAsString)) {
        throw new UrlParsingError(ERROR_DOMAIN)
    }

    return domainAsString
}

function isCorrectDocument(domain: string): boolean {
    return !Boolean(domain.match(/[^0-9a-zA-Z-._!~*'()/?=:]/))
}

function isCorrectDomain(domain: string): boolean {
    if (Boolean(domain.match(/[^0-9a-zA-Z\-.]/))) {
        return false
    }

    if (domain.includes('--')) {
        return false
    }

    return !(domain[0] === '-' && domain[domain.length - 1] === '-')
}

function getDefaultPort(protocol: Protocol): number {
    if (protocol === Protocol.HTTP) {
        return HTTP_DEFAULT_PORT
    } else {
        return HTTPS_DEFAULT_PORT
    }
}

export {
    parseUrl,
    Protocol,
    HttpUrlComponent,
    HTTP_DEFAULT_PORT,
    HTTPS_DEFAULT_PORT,
}