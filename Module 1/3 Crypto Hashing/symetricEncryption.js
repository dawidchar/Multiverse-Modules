const algorithm = {
    name: 'AES-GCM',
    length: 128
}

const _settings = {
    name: 'AES-GCM',
    iv: new Uint8Array([160, 212, 188, 14, 54, 229, 197, 169, 205, 64, 78, 225, 220, 47, 11, 59])
}

async function getKey() {
    const key = await crypto.subtle.generateKey(algorithm, true, ["encrypt", "decrypt"])
    return key
}

async function _encrypt(msg) {
    const toEncode = new TextEncoder().encode(msg)
    const key = await getKey()
    const shareableKey = await crypto.subtle.exportKey('jwk', key)
    const ciphertext = await crypto.subtle.encrypt(_settings, key, toEncode)

    const encryptedBufferToString = Array
        .from(new Uint8Array(ciphertext))
        .map(byte => String.fromCharCode(byte)).join('')

    const toTransfer = btoa(encryptedBufferToString + "|" + JSON.stringify(shareableKey))

    return [toTransfer, btoa(encryptedBufferToString), btoa(JSON.stringify(shareableKey))]
}


async function _decrypt(encrypted_msg, encrypted_key) {
    const errorText = 'Invalid Combination'
    if (!encrypted_msg) return errorText
    try {
        const settings = (encrypted_key.includes(',')) ? { name: _settings.name, iv: new Uint8Array(encrypted_key.split(',').map(x => parseInt(x))) } : false

        const [encryptedBufferToString, shareableKey] = encrypted_key && !settings ? [atob(encrypted_msg), atob(encrypted_key)] : atob(encrypted_msg).split('|')

        const ciphertext = new Uint8Array(encryptedBufferToString.match(/[\s\S]/g).map(ch => ch.charCodeAt(0)))

        const key = await crypto.subtle.importKey('jwk', JSON.parse(shareableKey), algorithm, false, ["decrypt"])

        const decrypted = await crypto.subtle.decrypt(!!settings ? settings : _settings, key, ciphertext)

        const decodedMessage = new TextDecoder().decode(decrypted)

        // console.log(decodedMessage)

        return decodedMessage

    } catch (error) {
        console.log(error)
        return errorText
    }

}