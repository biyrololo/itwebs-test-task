'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Post } from "@/entities/post/model/model"
import instance from "@/shared/api/instance"

const CSRPostsPage = () => {
    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchPosts = async () => {
        try {
            setLoading(true)
            const response = await instance.get<Post[]>('/posts?_limit=12')
            setPosts(response.data)
        } catch (err) {
            setError('Failed to fetch posts')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="text-center py-10">
                <div className="text-red-500 mb-4 text-sm sm:text-base">{error}</div>
                <Button onClick={fetchPosts} className="text-sm sm:text-base h-8 sm:h-10">Retry</Button>
            </div>
        )
    }

    return (
        <div className="space-y-6 py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="space-y-2">
                    <div className="inline-block bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                        Client Side Rendering
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold">Posts</h1>
                    <p className="text-sm sm:text-base text-muted-foreground">
                        This page fetches data on the client side
                    </p>
                </div>
                <Button onClick={fetchPosts} variant="secondary" className="w-full sm:w-auto text-sm sm:text-base h-8 sm:h-10">
                    Refresh
                </Button>
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

export default CSRPostsPage