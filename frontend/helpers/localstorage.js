const setData = ({ key, data }) => {
    localStorage.setItem(key, JSON.stringify(data))
}

const getData = ({ key }) => {
    return JSON.parse(localStorage.getItem(key))
}

const removeData = ({ key }) => {
    localStorage.removeItem(key)
}

export {
    setData,
    getData,
    removeData
}