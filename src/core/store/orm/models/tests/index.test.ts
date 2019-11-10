import { createTestSessionWithData } from '@core/store/orm/models/tests/utils'

describe('General', () => {
  let state: any
  let session: any

  describe('Models', () => {
    beforeEach(() => ({ session, state } = createTestSessionWithData()))

    it('Initial data bootstrapping results in a correct state', () => {
      expect(state).toEqual(
        expect.objectContaining({
          Movie: expect.anything(),
          Category: expect.anything(),
        })
      )

      expect(state.Movie.items).toHaveLength(2)
      expect(state.Category.items).toHaveLength(2)
    })
  })

  describe('many-many forward/backward updates', () => {
    it('Category must contain movies', () => {
      const firstCategory = session.Category.first()

      expect(firstCategory.movies.toRefArray().length).toEqual(2)
    })
  })
})
