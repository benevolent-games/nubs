
export function when<X>(x: X, actuate: (x: NonNullable<X>) => any) {
	return x
		? actuate(x)
		: undefined
}
