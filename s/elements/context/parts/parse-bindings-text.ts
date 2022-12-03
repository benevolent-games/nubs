import {Bindings} from "../../../types.js"

type Emojis = '👼' | '🖱' | '🕹️' | '*️⃣'

export function checker() {
	return {checkForDuplicateActions(actions: string[]) {
		const result = actions.some(element => {
			if (actions.indexOf(element) !== actions.lastIndexOf(element)) {
				throw new Error("duplicate action in channel")
			}
			return false
		})
		return result
	}
}
}

export const mergeIdenticalKeys = (data: {[s: string]: any}) => {
	return data.reduce((acc: {[x: string]: unknown[]}, curr: {[s: string]: string[]}) => {
		Object.entries(curr).forEach(([key, value]) => {
			if (acc[key] != null) {

				// console.log(acc[key])
				acc[key].push(value)
			} else {
				// console.log(acc[key])
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
export const translateNestedArrayToObject = (data: {[channel: string]: string[]}) => {
	const actions:string[] = []
	return {
		translated() {
			return Object.entries(data).map(([channel, value]: [string, any[]]) => {
		const ch = <Emojis>channel
		return {
			[ch]: value.reduce((object: {[channel: string]: string[]}, value: string[]) => {
				if (ch == "👼") {
					return [" " + value.join(" ")]
					// .join(" ")
				}
				else {
					const action = value[0]
					console.log(value[0], "ACTOIN", channel, "KEY")
					actions.push(action)
					object[action] = [...value].splice(2)
					return object
				}
			}, {})
		}
	})
	},
		actions() {
			this.translated()
			return actions
		}
	}
}

export function parseBindingsText(text: string): Bindings {
	let bindings = <Bindings>{}

	const emojis: Emojis[] = ['👼', '🖱', '🕹️', '*️⃣']
	const splitten = text.split(/\s+/)
	const indexes: number[] = []
	let chunks: string[][] = []

	emojis.forEach(emoji => getAllIndexes(splitten, emoji, indexes))

	for (let i = 0; i < indexes.length; i++) {
		chunks.push(splitten.slice(indexes[i], indexes[i + 1]))
	}

	const arrayOfObjectsWithDuplicateKeys = Object.assign(chunks.map(([k, ...v]) => ({[k]: v})))
	console.log(arrayOfObjectsWithDuplicateKeys)
	const arrayOfObjectsWithUniqueKeys: any = mergeIdenticalKeys(arrayOfObjectsWithDuplicateKeys)
	console.log(arrayOfObjectsWithUniqueKeys)
	const arrayOfObjects = translateNestedArrayToObject(arrayOfObjectsWithUniqueKeys).translated()
	console.log(arrayOfObjects)
	console.log(translateNestedArrayToObject(arrayOfObjectsWithUniqueKeys).actions())
	
	const finalResult: Bindings = Object.assign({}, ...arrayOfObjects)
	console.log(finalResult)
	bindings = finalResult
	checker().checkForDuplicateActions(translateNestedArrayToObject(arrayOfObjectsWithUniqueKeys).actions())
	return bindings
}
