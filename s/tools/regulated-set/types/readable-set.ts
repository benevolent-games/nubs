
export type ReadableSet<T> = {
	forEach(f: (x: T) => void): void
	has(x: T): boolean
	array(): T[]
}
