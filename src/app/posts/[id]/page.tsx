import { Post } from "@/entities/post/model/model"
import instance from "@/shared/api/instance"

export const generateStaticParams = async () => {
    const { data: posts } = await instance.get<Post[]>('/posts?_limit=10')
    return posts.map(post => ({ id: post.id.toString() }))
}

const PostPage = async ({ params }: { params: { id: string } }) => {
    const { data: post } = await instance.get<Post>(`/posts/${params.id}`)
    
    return (
        <div className="max-w-3xl mx-auto py-6">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl p-4 sm:p-6 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                    <span className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-xs sm:text-sm">
                        Static Site Generation
                    </span>
                    <span className="text-xs sm:text-sm opacity-90">Post #{post.id}</span>
                </div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3">{post.title}</h1>
                <p className="text-sm sm:text-base opacity-90">{post.body}</p>
            </div>
            
            <div className="bg-card border rounded-xl p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold mb-4">Post Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <h3 className="font-medium text-muted-foreground text-sm">User ID</h3>
                        <p className="text-base sm:text-lg">{post.userId}</p>
                    </div>
                    <div className="space-y-2">
                        <h3 className="font-medium text-muted-foreground text-sm">Post ID</h3>
                        <p className="text-base sm:text-lg">{post.id}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostPage