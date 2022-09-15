const {Router} = require('express')
const {createCourse,getAllCourses,getCourseById,getCourseByName,updateCourse,deleteCourse} = require('../controllers/courses')
const { checkAuth } = require('../middleware/auth')

const router = Router()

router.use(checkAuth)

router.post('/',createCourse)

router.get('/',getAllCourses)

router.get('/:id',getCourseById)

router.get('/:name',getCourseByName)

router.put('/:id',updateCourse)

router.delete('/:id',deleteCourse)

module.exports = router