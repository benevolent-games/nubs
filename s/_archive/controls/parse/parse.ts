
import {ModeBinds} from "../types/mode-binds.js"
import {ControlScheme} from "../types/control-scheme.js"

const regex = {
	commentLine: /^(-{3,}|\/{3,})$/gim,
}

const lexers = {
	mode: /\s*==>(.+)<==/my,
	kind: /\s*=(.+)=/my,
	bind: /\s*:(.+)\s+(.(?=(:|=|$)))+/my,
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

export type Cursor = {
	index: number
	mode: string | undefined
	kind: string | undefined
}

export function parseControls(
		text: string
	): ControlScheme {

	const modes: ModeBinds = {}
	const {comment, body} = extractCommandAndBody(text)

	let cursor: Cursor = {
		index: 0,
		mode: undefined,
		kind: undefined,
	}

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

	function commitBind(mode: string, kind: string, bind: string) {
		if (!modes.hasOwnProperty(mode))
			modes[mode] = {}

		const modeBinds = modes[mode]

		if (!modeBinds.hasOwnProperty(kind))
			modeBinds[kind] = {}

		const kindBinds = modeBinds[kind]

		const [action, ...binds] = bind.split(/\s+/gm)
		kindBinds[action] = binds
	}

	let done = false
	let iterations = 0
	const max_iterations = 10_000

	while (iterations < max_iterations && !done) {
		iterations += 1
		let matches = 0

		chomp(lexers.mode, match => {
			matches += 1
			counts.modes += 1
			cursor.mode = match[1]
			cursor.kind = undefined
		})

		chomp(lexers.kind, match => {
			matches += 1
			counts.kinds += 1
			cursor.kind = match[1]
		})

		chomp(lexers.bind, match => {
			matches += 1
			counts.binds += 1
			console.log("BIND", cursor.mode, cursor.kind, match[1])

			if (!cursor.mode)
				throw new Error("invalid bind before mode")

			if (!cursor.kind)
				throw new Error("invalid bind before kind")

			commitBind(cursor.mode, cursor.kind, match[1])
		})

		if (matches === 0)
			done = true
	}

	return {
		comment,
		modes,
	}
}
