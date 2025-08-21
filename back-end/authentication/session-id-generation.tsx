function generateSecureRandomString(): string {
	const alphabet = "abcdefghijkmnpqrstuvwxyz23456789";
	const bytes = new Uint8Array(24);
	crypto.getRandomValues(bytes);

	let id = "";
	for (let i = 0; i < bytes.length; i++) {
		id += alphabet[bytes[i] >> 3];
	}
	return id;
}

export default generateSecureRandomString;