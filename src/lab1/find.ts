import {readFile} from 'fs'

const NO_SUCH_FILE = 'ENOENT'
const MESSAGE_СALL_APP_WITH_ARGUMENTS = 'Сall app with 2 arguments <file name> <text to search>'
const MESSAGE_TEXT_NOT_FOUND = 'Text not found'
const MESSAGE_NO_SUCH_FILE = 'No such file or directory'
const MESSAGE_SOME_ERROR = 'Some error'

find(process.argv)

function find(argv: string[]) {
	if (argv[2] && argv[3]) {
		processFile(argv[2], argv[3])
	} else {
		console.log(MESSAGE_СALL_APP_WITH_ARGUMENTS)
	}
}

function processFile(path: string, searchQuery: string) {
	readFile(path, 'utf8', (err: NodeJS.ErrnoException, data: string) => {
		const isFindError = checkError(err)

		if(!isFindError) {
			const isFind: boolean = processLineList(data, searchQuery)
	
			if (!isFind) {
				console.log(MESSAGE_TEXT_NOT_FOUND)
			}
		}
	})
}

function checkError(err: NodeJS.ErrnoException): boolean {
	let isFindError = false
	if (err.code && err.code === NO_SUCH_FILE) {
		console.log(MESSAGE_NO_SUCH_FILE)
		isFindError = true
	} else if (err) {
		console.log(MESSAGE_SOME_ERROR)
		isFindError = true
	}
	return isFindError
}

function processLineList(data: string, searchQuery: string): boolean {
	const lineList: string[] = data.split('\n')
	let isFind = false

	lineList.forEach((line, index) => {
		if (line.includes(searchQuery)) {
			console.log(index)
			isFind = true
		}
	})

	return isFind
}