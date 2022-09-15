const {Router} = require('express')
const { createUnit,getAllUnits,getUnitById,deleteUnit,updateUnit } = require('../controllers/units')
const { checkAuth } = require('../middleware/auth')

const router = Router()

router.use(checkAuth)


router.post('/',createUnit)
router.get('/',getAllUnits)
router.get('/:id',getUnitById)
router.put('/:id',updateUnit)
router.delete('/:id',deleteUnit)

module.exports = router