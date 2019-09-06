const formatCodetoClass = (equipmentAll, str) => {
    if (str) {
        let code1 = str.slice(0, 2)
        let code2 = str.slice(2, 4)
        let code3 = str.slice(2, str.length)

        let item1 = equipmentAll.find(i => i.code === code1)
        if (item1) {
            let item2 = item1.content.find(i => i.code === code2)
            if (item2) {
                let item3 = item2.content.find(i => i.code === code3)
                return item3 ? item3.name : ''
            }
        }
    }
}
module.exports = {
    formatCodetoClass
}