/**
 * Compose URL Query Strings
 */
export function composeURLParams(data: object): string {
	const params = [];

	for (let i = 0; i < Object.values(data).length; i++) {
		const key = Object.keys(data)[i];
		const value = Object.values(data)[i];

		params.push(`${key}=${encodeURIComponent(value)}`);
	}

	return params.join("&");
}
