import { Schema, model } from 'mongoose'

const ArticleSchema = new Schema(
  {
    id: {
      type: Number,
      required: true
    },
    featured: Boolean,
    title: String,
    url: String,
    imageUrl: String,
    newsSite: String,
    summary: String,
    publishedAt: String,
    launches: [
      {
        id: String,
        provider: String
      }
    ],
    events: [
      {
        id: String,
        provider: String
      }
    ]
  }

)

export default model('Article', ArticleSchema)
