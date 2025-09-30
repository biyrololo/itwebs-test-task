import z from "zod";

export const PostSchema = z.object({
    userId: z.number(),
    id: z.number(),
    title: z.string('Enter title').min(3).max(50),
    body: z.string('Enter body').min(3).max(1000),
})

export const PostCreateSchema = PostSchema.omit({ id: true })

export type PostCreate = z.infer<typeof PostCreateSchema>

export type Post = z.infer<typeof PostSchema>