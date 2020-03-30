const generateUniqeId = require('../../src/utils/generateUniqueId')

describe('Gerate Unique ID', () => {
    it('should generate an unique ID', () => {
        const id = generateUniqeId()

        expect(id).toHaveLength(8)
    })
})