
export function migrate_versions<I>({
		data, version, converters
	}: {
		data: any
		version: number
		converters: Map<number, (i: any) => any>
	}) {

	let d = data
	let convert = true
	let new_version = version

	while(convert) {
		const converter = converters.get(new_version)
		if (!converter) {
			convert = false
			break
		}
		else {
			d = converter(d)
		}
		new_version++
	}

	return {
		data: d as I,
		version: new_version
	}
}
