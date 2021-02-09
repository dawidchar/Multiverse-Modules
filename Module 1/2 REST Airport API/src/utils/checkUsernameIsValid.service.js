const usernameRegex = /^[a-zA-Z0-9]+$/;

export default (username) => usernameRegex.test(username)
