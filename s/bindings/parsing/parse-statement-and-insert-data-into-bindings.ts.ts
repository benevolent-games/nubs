import {emojis} from "../emojis.js"
import {Bindings} from "../types.js"
import {parseActionAndItems} from "./parse-action-and-items.js"

export function parseStatementAndInsertDataIntoBindings(
		bindings: Bindings,
		match: RegExpExecArray,
	) {

	const [, rawemoji, content] = match

	const emoji = rawemoji
		.trim()
		.replace(/(?:^\uFE0F|\uFE0F$)/u, "")

	if (emoji === emojis.comment)
		bindings.comment.push(content)

	else {
		const {action, items} = parseActionAndItems(content)
		const [channel] = Object
			.entries(emojis)
			.find(([,e]) => e === emoji)
				?? []

		if (!channel)
			throw new Error(`invalid emoji "${emoji}"`)

		const binds = (<any>bindings)[channel]

		if (!!binds[action])
			throw new Error(`duplicate action "${action}" in channel ${emoji} "${channel}"`)

		if (binds)
			binds[action] = items
		else
			throw new Error(`invalid channel "${emoji}"`)
	}
}
