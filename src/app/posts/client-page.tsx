'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import { Post } from '@/entities/post/model/model';
import { PostModalForm } from '@/components/post-modal-form';
import { useState } from 'react';
import { useToast } from '@/lib/hooks/use-toast';

interface ClientPostsPageProps {
  posts: Post[];
}

export function ClientPostsPage({ posts }: ClientPostsPageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  const handlePostCreated = () => {
    toast({
      title: 'Success',
      description: 'Post created successfully!'
    });
  };

  return (
    <div className="space-y-6 py-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Posts</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Server-side rendered page with modal form integration
          </p>
        </div>
        <Button 
          onClick={() => setIsModalOpen(true)} 
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 w-full sm:w-auto text-sm sm:text-base h-9 sm:h-10"
        >
          Create Post
        </Button>
      </div>
      
      {posts.length > 0 ? (
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
      ) : (
        <div className="text-center py-12">
          <div className="text-muted-foreground">No posts found</div>
        </div>
      )}
      
      <PostModalForm 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onPostCreated={handlePostCreated}
      />
    </div>
  );
}