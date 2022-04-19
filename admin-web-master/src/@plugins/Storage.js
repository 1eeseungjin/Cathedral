export default Storage = {
    token : {
        set(value) {
            window.localStorage.setItem('token', value)
        },
        get() {
            return window.localStorage.getItem('token')
        },
        reset() {
            window.localStorage.setItem('token', '')
        }
    }
}