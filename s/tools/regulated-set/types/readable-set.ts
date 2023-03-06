
export type ReadableSet<X> = {
	forEach(f: (item: X) => void): void
	has(item: X): boolean
	array(): X[]
}
