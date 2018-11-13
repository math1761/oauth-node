import { Router } from 'express'
import { middleware as query } from 'querymen'
import { create, index, show, update, destroy } from './controller'

const router = new Router()

/**
 * @api {post} /auth Create api
 * @apiName CreateApi
 * @apiGroup Api
 * @apiSuccess {Object} api Api's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Api not found.
 */
router.post('/',
  create)

/**
 * @api {get} /auth Retrieve apis
 * @apiName RetrieveApis
 * @apiGroup Api
 * @apiUse listParams
 * @apiSuccess {Object[]} apis List of apis.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /auth/:id Retrieve api
 * @apiName RetrieveApi
 * @apiGroup Api
 * @apiSuccess {Object} api Api's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Api not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /auth/:id Update api
 * @apiName UpdateApi
 * @apiGroup Api
 * @apiSuccess {Object} api Api's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Api not found.
 */
router.put('/:id',
  update)

/**
 * @api {delete} /auth/:id Delete api
 * @apiName DeleteApi
 * @apiGroup Api
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Api not found.
 */
router.delete('/:id',
  destroy)

export default router
