const {Router} = require('express')
const {createField,deleteField,updateField,getAllFields,getFieldById,getFieldByName} = require('../controllers/fields')
const { checkAuth } = require('../middleware/auth')

const router = Router()

router.use(checkAuth)


router.post('/',createField)
router.get('/',getAllFields)
router.get('/:name',getFieldByName)
router.get('/:fieldId',getFieldById)
router.put('/:fieldId',updateField)
router.delete('/:fieldId',deleteField)

module.exports = router