/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const UsersController = () => import('#controllers/users_controller')
const ProfilesController = () => import('#controllers/profiles_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const HealthChecksController = () => import('#controllers/health_checks_controller')
const FilesController = () => import('#controllers/files_controller')

router.post('/login', [UsersController, 'login'])
router.get('/health', [HealthChecksController])
router.get('profile/download/:id', [ProfilesController, 'downloadPdf'])
router
  .group(() => {
    router.patch('profile', [ProfilesController, 'update'])
    router.resource('educations', () => import('#controllers/educations_controller'))
    router.resource('experiences', () => import('#controllers/experiences_controller'))
    router.resource('services', () => import('#controllers/services_controller'))
    router.resource('skills', () => import('#controllers/skills_controller'))
    router.post('upload', [FilesController, 'uploadFile'])

    router.post('/logout', [UsersController, 'logout'])
  })
  .use(middleware.auth({ guards: ['api'] }))
