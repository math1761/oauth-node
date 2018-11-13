import {
  Router
} from 'express'
import {
  middleware as query
} from 'querymen'
import {
  create,
  index,
  show,
  update,
  destroy,
  auth
} from './controller'
import Instagram from 'node-instagram'

const instagram = new Instagram({
  clientId: '4bcd6ead67584b0193a1a71b2bf25eaf',
  clientSecret: '841a0971b4874bc2a975f28a5a6ab1c9'
})
const redirectUri = 'http://0.0.0.0:9000/instagram/auth/callback'

const router = new Router()

/**
 * @api {post} /instagram Create socials
 * @apiName CreateSocials
 * @apiGroup Socials
 * @apiSuccess {Object} socials Socials's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Socials not found.
 */
router.post('/',
  create)

/**
 * @api {get} /instagram Retrieve socials
 * @apiName RetrieveSocials
 * @apiGroup Socials
 * @apiUse listParams
 * @apiSuccess {Object[]} socials List of socials.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/', query(), index)

router.get('/auth', (req, res) => {
  auth(req, res, instagram, redirectUri)
})

router.get('/auth/callback', async (req, res) => {
  try {
    const data = await instagram.authorizeUser(req.query.code, redirectUri)
    // access_token in data.access_token
    // let newInstagram = new Instagram({
    //   clientId: '4bcd6ead67584b0193a1a71b2bf25eaf',
    //   clientSecret: '841a0971b4874bc2a975f28a5a6ab1c9',
    //   accessToken: data.access_token
    // })
    res.json(data)
  } catch (err) {
    res.json(err)
  }
})
/**
 * @api {get} /instagram/:id Retrieve socials
 * @apiName RetrieveSocials
 * @apiGroup Socials
 * @apiSuccess {Object} socials Socials's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Socials not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /instagram/:id Update socials
 * @apiName UpdateSocials
 * @apiGroup Socials
 * @apiSuccess {Object} socials Socials's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Socials not found.
 */
router.put('/:id',
  update)

/**
 * @api {delete} /instagram/:id Delete socials
 * @apiName DeleteSocials
 * @apiGroup Socials
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Socials not found.
 */
router.delete('/:id',
  destroy)

export default router
