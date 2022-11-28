import {Bindings} from "../../../types.js"

export function parseBindingsText(text: string): Bindings {
	let bindings = <Bindings>{}
	const emojis = ['👼', '🖱️', '🕹️', '*️⃣']
	const indexes: number[] = []
	let chunks: string[][] = []
	const splitten = text.trim().split(/\s+/)
	function getAllIndexes(arr: string[], val: string) {
		
		for (let i = 0; i < arr.length; i++)
			if (arr[i] === val)
				indexes.push(i)
		return indexes
	}
	const merge = (data: any[]) => {
		return data.reduce((acc, curr) => {
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
	emojis.forEach(emoji => getAllIndexes(splitten, emoji))

	for (let i = 0; i < indexes.length; i++) {
		chunks.push(splitten.slice(indexes[i], indexes[i + 1]))
		
	}
	const arrayOfObjects: any[] = Object.assign(chunks.map(([k, ...v]) => ({[k]: v})))
	const merged = merge(arrayOfObjects)
	const translateArrayToObject = (data: any[]) => {
		return	Object.entries(data).map(([key, value]) => {
			return {
				[key]: value.reduce((object: any, el: any) => {

					if (key == "👼") {
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
	const merged2 = translateArrayToObject(merged)
	const objectOfObjects: Bindings = Object.assign({}, ...merged2) 
	console.log(objectOfObjects)
	bindings = objectOfObjects
	return bindings
}
