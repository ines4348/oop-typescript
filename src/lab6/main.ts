import {createInterface, Interface} from 'node:readline'
import {stdin as input, stdout as output} from 'process'
import {HttpUrl} from './HttpUrl'
import {UrlParsingError} from './UrlParsingError'

const MESSAGE_WELCOME_INPUT = 'For close enter "exit".\nEnter url: '
const EXIT = 'exit'
const ERROR_URL = 'Wrong url'

function printMessage(error: string) {
    console.log(error)
}
//http://domain://document
function printUrlInfo(httpUrl: HttpUrl) {
    console.log(`Protocol: ${httpUrl.getProtocol()}`)
    console.log(`Domain: ${httpUrl.getDomain()}`)
    console.log(`Port: ${httpUrl.getPort()}`)
    console.log(`Document: ${httpUrl.getDocument()}`)
    console.log(`Constructed url: ${httpUrl.getUrl()}`)
}

//сделать статическим или свободной функцией
function isCorrectUrlCharacter(url: string): boolean {
    if (!url) {
        return false
    }

    //убрать экранирование
    return !Boolean(url.match(/[^0-9a-zA-Z-.:_!~*'()/?&=]/))
}

//считывать несколько строкон
// протокол нечувствителен к регистру
//http://abc:65535 выдает ошибку на валидном порте
//http://abc/:777 - должен быть валидным урлом с документом /:777
function main(): void {
    const readLineInterface: Interface = createInterface({input, output})
    printMessage(MESSAGE_WELCOME_INPUT)
    readLineInterface.on('line', (message: string) => {
        if (message === EXIT) {
            readLineInterface.close()
            return
        }

        if (!isCorrectUrlCharacter(message)) {
            throw new UrlParsingError(ERROR_URL)
        }

        try {
            const httpUrl: HttpUrl = new HttpUrl(message)
            printUrlInfo(httpUrl)
        } catch (error) {
            const err: UrlParsingError = error as UrlParsingError
            printMessage(err.message)
        }
    })
}

main()