import {Bindings} from "../../../types.js"

type Emojis = '👼' | '🖱️' | '🕹️' | '*️⃣'

export const mergeIdenticalKeys = (data: {[s: string]: any}) => {
	return data.reduce((acc: {[x: string]: unknown[]}, curr: {[s: string]: string[]}) => {
		Object.entries(curr).forEach(([key, value]) => {
			if (acc[key] != null) {
				acc[key].push(value)
			} else {
				acc[key] = [value]
			}
		})
		return acc
	}, [])
}
export function getAllIndexes(arr: string[], val: Emojis, indexes: number[]) {
	for (let i = 0; i < arr.length; i++)
		if (arr[i] === val)
			indexes.push(i)
			return indexes
}
export const translateNestedArrayToObject = (data: {[key: string]: string[]}) => {
	return Object.entries(data).map(([key, value]: [string, any[]]) => {
		const k = <Emojis>key
		return {
			[k]: value.reduce((object: {[key: string]: string[]}, el: string[]) => {
				if (k == "👼") {
					return el
				}
				else {
					object[el[0]] = [...el].splice(2)
					return object
				}
			}, {})
		}
	})
}

export function parseBindingsText(text: string): Bindings {
	let bindings = <Bindings>{}

	const emojis: Emojis[] = ['👼', '🖱️', '🕹️', '*️⃣']
	const splitten = text.trim().split(/\s+/)
	const indexes: number[] = []
	let chunks: string[][] = []

	emojis.forEach(emoji => getAllIndexes(splitten, emoji, indexes))

	for (let i = 0; i < indexes.length; i++) {
		chunks.push(splitten.slice(indexes[i], indexes[i + 1]))
	}

	const arrayOfObjectsWithDuplicateKeys = Object.assign(chunks.map(([k, ...v]) => ({[k]: v})))
	const arrayOfObjectsWithUniqueKeys:any = mergeIdenticalKeys(arrayOfObjectsWithDuplicateKeys)
	const arrayOfObjects = translateNestedArrayToObject(arrayOfObjectsWithUniqueKeys)
	const finalResult: Bindings = Object.assign({}, ...arrayOfObjects) 
	bindings = finalResult

	return bindings
}
