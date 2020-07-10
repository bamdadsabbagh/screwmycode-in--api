import express from 'express'

const router = express.Router ()

router.get ('/', (req, res) => {

    res.send ({
        'success': true,
        'message': 'Hello',
    })

})

export default router
