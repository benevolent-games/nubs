
export type SetWritingFunctions<X> = {
	add(...items: X[]): void
	delete(item: X): void
	clear(): void
	assign(items: X[]): void
}
