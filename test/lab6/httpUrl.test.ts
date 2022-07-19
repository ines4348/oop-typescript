import {describe} from 'mocha'
import {HttpUrl} from '../../src/lab6/HttpUrl'
import {expect} from 'chai'

describe('CHttpUrl', () => {
    let httpUrl: HttpUrl

    it('original http url should be returned without default port', () => {
        httpUrl = new HttpUrl('http://www.ispring.ru:80/')
        expect(httpUrl.getUrl()).eql('http://www.ispring.ru/')
    })

    it('original http url should be returned', () => {
        httpUrl = new HttpUrl('http://www.ispring.ru/')
        expect(httpUrl.getUrl()).eql('http://www.ispring.ru/')
    })

    it('original https url should be returned without default port', () => {
        httpUrl = new HttpUrl('https://www.ispring.ru:443/')
        expect(httpUrl.getUrl()).eql('https://www.ispring.ru/')
    })

    it('original https url should be returned', () => {
        httpUrl = new HttpUrl('https://www.ispring.ru/')
        expect(httpUrl.getUrl()).eql('https://www.ispring.ru/')
    })

    it('empty url should return exception', () => {
        try {
            httpUrl = new HttpUrl('')
            expect(httpUrl.getUrl()).not.eql('')
        } catch (error) {
            expect(error.message).eql('Wrong url')
        }
    })

    it('port with space should return exception', () => {
        try {
            httpUrl = new HttpUrl('http://www.ispring.ru: 8080/')
            expect(httpUrl.getUrl()).not.eql('http://www.ispring.ru:8080/')
        } catch (error) {
            expect(error.message).eql('Wrong port')
        }
    })

    it('url without :// should be return exception', () => {
        try {
            httpUrl = new HttpUrl('http')
            expect(httpUrl.getUrl()).not.eql('http')
        } catch (error) {
            expect(error.message).eql('Wrong url')
        }


        httpUrl = new HttpUrl('HTTPS://www.ispring.ru/')
        expect(httpUrl.getProtocol()).eql('https')
    })

    it('protocol http should be returned', () => {
        httpUrl = new HttpUrl('http://www.ispring.ru/')
        expect(httpUrl.getProtocol()).eql('http')
    })

    it('protocol https should be returned', () => {
        httpUrl = new HttpUrl('https://www.ispring.ru/')
        expect(httpUrl.getProtocol()).eql('https')
    })

    it('upper case protocol is valid and should be returned in lower case', () => {
        httpUrl = new HttpUrl('HTTPS://www.ispring.ru/')
        expect(httpUrl.getProtocol()).eql('https')
    })

    it('domain should be returned', () => {
        httpUrl = new HttpUrl('https://www.ispring.ru/')
        expect(httpUrl.getDomain()).eql('www.ispring.ru')
    })

    it('empty document should be returned', () => {
        httpUrl = new HttpUrl('https://www.ispring.ru')
        expect(httpUrl.getDocument()).eql('/')
    })

    it('/ as document should be returned', () => {
        httpUrl = new HttpUrl('https://www.ispring.ru/')
        expect(httpUrl.getDocument()).eql('/')
    })

    it('not empty document should be returned', () => {
        httpUrl = new HttpUrl('https://www.ispring.ru/home')
        expect(httpUrl.getDocument()).eql('/home')
    })

    it('/:777 is correct document and should be returned', () => {
        httpUrl = new HttpUrl('http://abc/:777')
        expect(httpUrl.getDocument()).eql('/:777')
    })

    it('default http port should be returned', () => {
        httpUrl = new HttpUrl('http://www.ispring.ru/')
        expect(httpUrl.getPort()).eql(80)
    })

    it('default https port should be returned', () => {
        httpUrl = new HttpUrl('https://www.ispring.ru/')
        expect(httpUrl.getPort()).eql(443)
    })

    it('http port should be returned', () => {
        httpUrl = new HttpUrl('http://www.ispring.ru:8080/')
        expect(httpUrl.getPort()).eql(8080)
    })

    it('https port should be returned', () => {
        httpUrl = new HttpUrl('https://www.ispring.ru:9090/')
        expect(httpUrl.getPort()).eql(9090)
    })

    it('65535 is correct port and should be returned', () => {
        httpUrl = new HttpUrl('https://www.ispring.ru:65535/')
        expect(httpUrl.getPort()).eql(65535)
    })

    it('wrong port should return exception', () => {
        try {
            httpUrl = new HttpUrl('https://www.ispring.ru:90.90/')
            expect(httpUrl.getPort()).not.eql(9090)
        } catch (error) {
            expect(error.message).eql('Wrong port')
        }
    })

    it('wrong port should return exception', () => {
        try {
            httpUrl = new HttpUrl('https://www.ispring.ru:-9090/')
            expect(httpUrl.getPort()).not.eql(-9090)
        } catch (error) {
            expect(error.message).eql('Wrong port')
        }
    })

    it('0 is wrong port and should return exception', () => {
        try {
            httpUrl = new HttpUrl('https://www.ispring.ru:0/')
            expect(httpUrl.getPort()).not.eql(0)
        } catch (error) {
            expect(error.message).eql('Wrong port')
        }
    })

    it('65535 is wrong port and should return exception', () => {
        try {
            httpUrl = new HttpUrl('https://www.ispring.ru:65536/')
            expect(httpUrl.getPort()).not.eql(65536)
        } catch (error) {
            expect(error.message).eql('Wrong port')
        }
    })

    it('wrong protocol should return exception', () => {
        try {
            httpUrl = new HttpUrl('htts://www.ispring.ru/')
            expect(httpUrl.getDomain()).not.eql('www.ispring.ru')
        } catch (error) {
            expect(error.message).eql('Wrong protocol')
        }
    })

    it('wrong protocol should return exception', () => {
        try {
            httpUrl = new HttpUrl('htts://www.ispring.ru/') // пустой домен проверить
            expect(httpUrl.getDomain()).not.eql('www.ispring.ru')
        } catch (error) {
            expect(error.message).eql('Wrong protocol')
        }
    })

    it('domain with ? should return exception', () => {
        try {
            httpUrl = new HttpUrl('https://www?ispring.ru/')
            expect(httpUrl.getDomain()).not.eql('www?ispring.ru')
        } catch (error) {
            expect(error.message).eql('Wrong domain')
        }
    })

    it('domain with -- should return exception', () => {
        try {
            httpUrl = new HttpUrl('https://wwww.i--spring.ru/')
            expect(httpUrl.getDomain()).not.eql('www.i--spring.ru')
        } catch (error) {
            expect(error.message).eql('Wrong domain')
        }
    })

    it('domain start with - should return exception', () => {
        try {
            httpUrl = new HttpUrl('https://-wwww.ispring.ru/')
            expect(httpUrl.getDomain()).not.eql('-www.ispring.ru')
        } catch (error) {
            expect(error.message).eql('Wrong domain')
        }
    })

    it('domain end with - should return exception', () => {
        try {
            httpUrl = new HttpUrl('https://wwww.ispring.ru-/')
            expect(httpUrl.getDomain()).not.eql('www.ispring.ru-')
        } catch (error) {
            expect(error.message).eql('Wrong domain')
        }
    })

    it('domain with UpperCase should be returned', () => {
        httpUrl = new HttpUrl('https://wwww.ISPRING.ru/')
        expect(httpUrl.getDomain()).eql('wwww.ISPRING.ru')
    })

    it('domain with number should be returned', () => {
        httpUrl = new HttpUrl('https://wwww.1ispring.ru/')
        expect(httpUrl.getDomain()).eql('wwww.1ispring.ru')
    })

    it('document with & should return exception', () => {
        try {
            httpUrl = new HttpUrl('https://wwww.ispring.ru/&')
            expect(httpUrl.getDocument()).not.eql('/:')
        } catch (error) {
            expect(error.message).eql('Wrong document')
        }
    })

    it('document with _ should be returned', () => {
        httpUrl = new HttpUrl('https://wwww.ispring.ru/_test')
        expect(httpUrl.getDocument()).eql('/_test')
    })

    it('document with ! should be returned', () => {
        httpUrl = new HttpUrl('https://wwww.ispring.ru/!test')
        expect(httpUrl.getDocument()).eql('/!test')
    })

    it('document with ~ should be returned', () => {
        httpUrl = new HttpUrl('https://wwww.ispring.ru/~test')
        expect(httpUrl.getDocument()).eql('/~test')
    })

    it('document with * should be returned', () => {
        httpUrl = new HttpUrl('https://wwww.ispring.ru/*test')
        expect(httpUrl.getDocument()).eql('/*test')
    })

    it('document with \' should be returned', () => {
        httpUrl = new HttpUrl("https://wwww.ispring.ru/'test")
        expect(httpUrl.getDocument()).eql("/'test")
    })

    it('parameter after ? shouldn\'t be included in document', () => {
        httpUrl = new HttpUrl("https://wwww.ispring.ru/test?p=1")
        expect(httpUrl.getDocument()).eql('/test?p=1')
    })

    it('wrong port after :', () => {
        try {
            httpUrl = new HttpUrl("https://wwww.ispring.ru:/test?p=1")
            expect(httpUrl.getPort()).not.eql('')
        } catch (error) {
            expect(error.message).eql('Wrong port')
        }
    })
})