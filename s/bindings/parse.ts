
import {Bindings} from "./types.js"
import {freshBindings} from "./parsing/fresh-bindings.js"
import {regexForEmojiStatement} from "./parsing/regex-for-emoji-statement.js"
import {parseStatementAndInsertDataIntoBindings} from "./parsing/parse-statement-and-insert-data-into-bindings.ts.js"

export function parseBindings(text: string): Bindings {
	const bindings = freshBindings()
	const regex = regexForEmojiStatement()

	let count = 0
	let match: RegExpExecArray | null

	while ((match = regex.exec(text)) !== null) {
		count += 1
		parseStatementAndInsertDataIntoBindings(
			bindings,
			match,
		)
	}

	if (count === 0)
		throw new Error("no valid statements found")

	return bindings
}
