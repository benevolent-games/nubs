
export type SetWritingFunctions<T> = {
	add(x: T): void
	delete(x: T): void
	clear(): void
}
