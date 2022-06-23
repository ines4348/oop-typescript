import {HttpUrl, Protocol} from './HttpUrl'

class HttpDomainDocument extends HttpUrl {
    constructor(domain: string, document: string, protocol: Protocol = Protocol.HTTP) {
        if (document[0] !== '/') {
            document = `/${document}`
        }
        super(`${protocol}://${domain}${document}`)
    }
}

export {
    HttpDomainDocument,
}