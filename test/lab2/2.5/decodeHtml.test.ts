import {
    decode,
    encode,
} from '../../../src/lab2/2.5/decodeHtml'
import {expect} from 'chai'
import {describe} from 'mocha'

describe('decodeHtml test', () => {
    describe('function decode got', () => {
        it('"Cat &lt;says&gt; &quot;Meow&quot;. M&amp;M&apos;s" and should be return "Cat <says> "Meow". M&M’s"', () => {
            expect(decode('Cat &lt;says&gt; &quot;Meow&quot;. M&amp;M&apos;s')).equals('Cat <says> "Meow". M&M’s')
        })

        it('"Cat &lt;&lt;&lt;says&gt; &quot;Meow&quot;. M&amp;M&apos;s" and should be return "Cat <<<says> "Meow". M&M’s"', () => {
            expect(decode('Cat &lt;&lt;&lt;says&gt; &quot;Meow&quot;. M&amp;M&apos;s')).equals('Cat <<<says> "Meow". M&M’s')
        })

        it('"" and should be return ""', () => {
            expect(decode('')).equals('')
        })
    })

    describe('function encode got', () => {
        it('"Cat <says> "Meow". M&M’s" and should be return "Cat &lt;says&gt; &quot;Meow&quot;. M&amp;M&apos;s"', () => {
            expect(encode(`Cat <says> "Meow". M&M’s`)).eql('Cat &lt;says&gt; &quot;Meow&quot;. M&amp;M&apos;s')
        })

        it('"Cat <<<says> "Meow". M&M’s" and should be return "Cat &lt;&lt;&lt;says&gt; &quot;Meow&quot;. M&amp;M&apos;s"', () => {
            expect(encode('Cat <<<says> "Meow". M&M’s')).equals('Cat &lt;&lt;&lt;says&gt; &quot;Meow&quot;. M&amp;M&apos;s')
        })

        it('"" and should be return ""', () => {
            expect(encode('')).equals('')
        })
    })
})