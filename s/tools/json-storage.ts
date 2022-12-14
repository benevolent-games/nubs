
export function jsonStorage(storage: Storage) {
	return {

		getItem<T>(key: string): T | undefined {
			return jsonGet(storage, key)
		},

		setItem<T>(key: string, data: T | undefined) {
			return jsonSet(storage, key, data)
		},
	}
}

export function jsonStorageProxy<T extends {[key: string]: any}>(
		storage: Storage
	) {
	return <{[P in keyof T]: T[P] | undefined}>new Proxy({}, {

		get(t, key: string) {
			return jsonGet(storage, key)
		},

		set(t, key: string, data) {
			return jsonSet(storage, key, data)
		},
	})
}

function jsonGet<T>(storage: Storage, key: string): T | undefined {
	const text = storage.getItem(key)
	try {
		return text
			? JSON.parse(text)
			: undefined
	}
	catch (error) {
		console.warn("json storage 'get' error", error)
	}
}

function jsonSet<T>(storage: Storage, key: string, data: T | undefined) {
	const dataIsUnset = data === undefined || data === null
	const text = dataIsUnset
		? ""
		: JSON.stringify(data)
	storage.setItem(key, text)
	return true
}
