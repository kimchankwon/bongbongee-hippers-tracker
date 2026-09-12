import { query, mutation } from './_generated/server'
import { v } from 'convex/values'

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('hippers').order('asc').collect()
  },
})

export const stats = query({
  args: {},
  handler: async (ctx) => {
    const all = await ctx.db.query('hippers').collect()
    return {
      total: all.length,
      available: all.filter((h) => h.status === 'available').length,
      interested: all.filter((h) => h.status === 'interested').length,
      sold: all.filter((h) => h.status === 'sold').length,
    }
  },
})

export const add = mutation({
  args: { buyerName: v.optional(v.string()), note: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const existing = await ctx.db.query('hippers').collect()
    const nextNumber = existing.length + 1
    return await ctx.db.insert('hippers', {
      number: nextNumber,
      status: 'available',
      buyerName: args.buyerName,
      note: args.note,
    })
  },
})

export const updateStatus = mutation({
  args: {
    id: v.id('hippers'),
    status: v.union(v.literal('available'), v.literal('interested'), v.literal('sold')),
    buyerName: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      status: args.status,
      buyerName: args.buyerName,
    })
  },
})
