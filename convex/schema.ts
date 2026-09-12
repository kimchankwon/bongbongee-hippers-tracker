import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  hippers: defineTable({
    number: v.number(),
    status: v.union(v.literal('available'), v.literal('interested'), v.literal('sold')),
    buyerName: v.optional(v.string()),
    note: v.optional(v.string()),
  }),
})
