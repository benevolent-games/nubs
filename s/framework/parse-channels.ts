
export function parseChannels(raw: string) {
	return raw
		? [...new Set(
			raw
				.split(/\s/)
				.map(s => s.trim())
				.filter(s => !!s)
		)]
		: []
}
