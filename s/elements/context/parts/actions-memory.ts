
import {Actions, Nub} from "../../../types.js"
import {objectMap} from "../../../tools/object-map.js"

export function makeActionsMemory() {
	const stuff = {
		key: prepareEventMemory<Nub.Detail.Key>(),
		mouse: prepareEventMemory<Nub.Detail.Mouse>(),
		vector2: prepareEventMemory<Nub.Detail.Vector2>(),
	}
	return {
		readable: <Actions>objectMap(stuff, channel => channel.readable),
		writable: <Actions>objectMap(stuff, channel => channel.writable),
	}
}

function prepareEventMemory<xDetail extends Nub.Detail.Any>() {
	const memory = new Map<string, undefined | xDetail>()

	const get = (t: any, action: string) => memory.get(action)

	const set = (t: any, action: string, detail: xDetail) => {
		memory.set(action, detail)
		return true
	}

	const noSet = () => {
		throw new Error("cannot change readonly actions")
	}

	return {
		readable: new Proxy(<any>{}, {get, set: noSet}),
		writable: new Proxy(<any>{}, {get, set}),
	}
}
