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
	const merge = (data: any[]) => {
  // reduce the array down to a single object
  return data.reduce((acc, curr) => {
    // loop over the entries of each object
    Object.entries(curr).forEach(([key, value]) => {
      // if this key already exists, append to it with \n
      if(acc[key] != null) {
        acc[key] += `${value}`;

      // else, just add it as is
      } else {
        acc[key] = value;
      }
    });
    
    return acc;
  }, {});
}
	emojis.forEach(emoji => getAllIndexes(splitten, emoji))

	for (let i = 0; i < indexes.length; i++) {
		chunks.push(splitten.slice(indexes[i], indexes[i + 1]))
		
	}
	const arrayOfObjects: any[] = Object.assign(chunks.map(([k, ...v]) => ({[k]: v})))

	const merged = merge(arrayOfObjects)
	const objectOfObjects:Bindings = Object.assign({}, ...arrayOfObjects) 
	console.log(Object.assign({}, ...arrayOfObjects))
	return objectOfObjects
	// bindings = {}
}
