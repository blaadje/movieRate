import Model, { fk } from 'redux-orm'

import { insertResourceByType, VIDEO } from '@core/store/constants'

interface ActionProps {
  type: string
  item: any
  resourceId: number
  relationShip: string
}

export default class Video extends Model<typeof Video, VideoItem> {
  static reducer(
    { type, item, resourceId, relationShip }: ActionProps,
    Video: any
  ): any {
    switch (type) {
      case insertResourceByType(VIDEO):
        Video.upsert({
          ...item,
          [`${relationShip}Id`]: resourceId,
        })
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
