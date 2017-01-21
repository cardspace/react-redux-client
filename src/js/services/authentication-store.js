
let authenticationStore = null;

export function getNonce() {
    return localStorage.getItem( 'nonce' );
}

export function setNonce( value ) {
    localStorage.setItem( 'nonce', value );
}

export function getIdToken() {
    return localStorage.getItem( 'id-token' );
}

export function setIdToken( value ) {
    localStorage.setItem( 'id-token', value );
}

export function clearIdToken() {
    localStorage.removeItem( 'id-token' );
}

export function hasIdToken() {
    return !!getIdToken();
}


