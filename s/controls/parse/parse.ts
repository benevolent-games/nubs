
import {ModeBinds} from "../types/mode-binds.js"
import {ControlScheme} from "../types/control-scheme.js"

const regex = {
	commentLine: /^(-{3,}|\/{3,})$/gim,
}

const lexers = {
	mode: /\s*==>(.+)<==/my,
	kind: /\s*=(.+)=/my,
	bind: /\s*:(.+)\s+(.(?=(:|=)))+/my,
}

export function extractCommandAndBody(text: string): {
		comment: undefined | string
		body: string
	} {

	if (regex.commentLine.test(text)) {
		const [comment, line, body] = text.split(regex.commentLine)
		return {comment, body}
	}
	else {
		return {comment: undefined, body: text}
	}
}

export function parseControls(
		text: string
	): ControlScheme {

	const {comment, body} = extractCommandAndBody(text)
	const modes: ModeBinds = {}

	let done = false
	let cursor = {index: 0}
	const counts = {
		modes: 0,
		kinds: 0,
		binds: 0,
	}

	function chomp(regex: RegExp, action: (match: RegExpExecArray) => void) {
		regex.lastIndex = cursor.index
		const match = regex.exec(body)
		if (match) {
			cursor.index = regex.lastIndex
			action(match)
		}
		return match
	}

	let iterations = 0
	const max_iterations = 10_000

	while (iterations < max_iterations && !done) {
		iterations += 1
		let matches = 0

		chomp(lexers.mode, match => {
			matches += 1
			counts.modes += 1
		})

		chomp(lexers.kind, match => {
			matches += 1
			counts.kinds += 1
		})

		chomp(lexers.bind, match => {
			matches += 1
			counts.binds += 1
		})

		if (matches === 0)
			done = true
	}

	return {
		comment,
		modes,
	}
}
