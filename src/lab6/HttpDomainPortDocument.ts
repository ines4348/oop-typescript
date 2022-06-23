import {HttpUrl, Protocol} from './HttpUrl'

class HttpDomainPortDocument extends HttpUrl {
    constructor(domain: string, document: string, protocol: Protocol, port: number) {
        if (document[0] !== '/') {
            document = `/${document}`
        }
        super(`${protocol}://${domain}:${port.toString()}${document}`)
    }
}

export {
    HttpDomainPortDocument,
}