import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { Post } from "@/entities/post/model/model"
import instance from "@/shared/api/instance"

export const dynamic = 'force-static'
export const revalidate = 60

const ISRPostsPage = async () => {
    const { data: posts } = await instance.get<Post[]>('/posts?_limit=12')
    
    return (
        <div className="space-y-6 py-6">
            <div className="text-center space-y-2">
                <div className="inline-block bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                    Incremental Static Regeneration
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold">Posts</h1>
                <p className="text-sm sm:text-base text-muted-foreground px-4">
                    This page is generated at build time and revalidated every 60 seconds
                </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {posts.map(post => (
                    <Card key={post.id} className="hover:shadow-lg transition-all duration-300 overflow-hidden">
                        <CardHeader className="pb-3">
                            <CardTitle className="line-clamp-2 text-base sm:text-lg">{post.title}</CardTitle>
                            <CardDescription className="line-clamp-3 mt-2 text-sm">{post.body}</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <div className="flex items-center justify-between">
                                <span className="text-xs sm:text-sm text-muted-foreground">Post #{post.id}</span>
                                <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
                                    User {post.userId}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default ISRPostsPage