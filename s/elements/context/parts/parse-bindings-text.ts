import {Bindings} from "../../../types.js"

export function parseBindingsText(text: string): Bindings {
	let bindings = <Bindings>{}
	const emojis = ['👼','🖱️','🕹️', '*️⃣']
	const indexes: number[] = []
	let chunks: string[][] = []
	const splitten = text.trim().split(/\s+/)
	function getAllIndexes(arr: string[], val: string) {
		
		for (let i = 0; i < arr.length; i++)
			if (arr[i] === val)
				indexes.push(i)
		return indexes
	}
	emojis.forEach(emoji => getAllIndexes(splitten, emoji))

	for (let i = 0; i < indexes.length; i++) {
		chunks.push(splitten.slice(indexes[i], indexes[i + 1]))
		
	}
	const arrayOfObjects: any[] = Object.assign(chunks.map(([k, ...v]) => ({[k]: v})))
	console.log(arrayOfObjects)
	console.log(Object.assign({}, ...arrayOfObjects))
	
	// bindings = {}
}
