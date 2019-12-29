import Model, { fk } from 'redux-orm'

import { insertResourcesByType, VIDEO } from '@core/store/constants'

interface ActionProps {
  type: string
  result: any
  resourceId: number
  relationShip: string
}

export default class Video extends Model<typeof Video, VideoItem> {
  static reducer(
    { type, result, resourceId, relationShip }: ActionProps,
    Video: any
  ): any {
    switch (type) {
      case insertResourcesByType(VIDEO):
        const createVideo = (video: any) =>
          Video.upsert({
            ...video,
            [`${relationShip}Id`]: resourceId,
          })
        return result.forEach(createVideo)
    }
  }
}

export interface VideoItem {
  type: string
  value: string
}

Video.modelName = 'Video'
Video.fields = {
  movieId: fk({
    to: 'Movie',
    as: 'Movie',
    relatedName: 'videos',
  }),
  tvId: fk({
    to: 'Tv',
    as: 'Tv',
    relatedName: 'videos',
  }),
}
