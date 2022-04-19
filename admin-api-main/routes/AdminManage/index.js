const router = require('express').Router()
const { db } = require('../../config')

router.get('/', async (req, res) => {
    const adminList = await new Promise((resolve, reject) => {
        db().query('SELECT * FROM admin', (e, rows) => {
            if (e) {
                reject(e)
            } else {
                resolve(rows)
            }
        })
    })

    res.json({
        success: true,
        adminList: adminList
    })
})

router.get('/detail', async (req, res) => {

    const { idx } = req.query

    const admin = await new Promise((resolve, reject) => {
        db().query('SELECT * FROM admin WHERE idx = ?', [idx], (e, rows) => {
            if (e) {
                reject(e)
            } else {
                resolve(rows[0])
            }
        })
    })

    res.json({
        success: true,
        admin: admin
    })
    
})

module.exports = router