
export function decimalsToHexes(decimals: readonly number[]) {
	return decimals.map(decimal => decimal.toString(16))
}
