
export function jsonStorage(storage: Storage) {
	return {

		getItem<T>(key: string) {
			const text = storage.getItem(key)
			try {
				return text
					? <T>JSON.parse(text)
					: undefined
			}
			catch (error) {
				console.warn("json storage proxy, 'get' error", error)
			}
		},

		setItem<T>(key: string, data: T) {
			const text = JSON.stringify(data)
			storage.setItem(key, text)
			return true
		},
	}
}

export function jsonStorageProxy<T extends {[key: string]: any}>(
		storage: Storage
	) {

	return <T>new Proxy({}, {
		get(t, key: string) {
			const text = storage.getItem(key)
			try {
				return text
					? JSON.parse(text)
					: undefined
			}
			catch (error) {
				console.warn("json storage proxy, 'get' error", error)
			}
		},
		set(t, key: string, data) {
			const text = JSON.stringify(data)
			storage.setItem(key, text)
			return true
		},
	})
}
