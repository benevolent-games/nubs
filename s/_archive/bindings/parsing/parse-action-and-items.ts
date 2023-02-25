
export function parseActionAndItems(content: string) {
	const parts = content.split("::")

	if (parts.length < 2)
		throw new Error("invalid action")

	let [rawaction, rawitems] = parts

	const action = rawaction
		.replace(/(?:^\uFE0F|\uFE0F$)/u, "")
		.trim()

	const items = rawitems
		.split(/\s+/)
		.map(item => item.trim())
		.filter(item => !!item)

	if (!action)
		throw new Error("action missing in bind")

	return {action, items}
}
