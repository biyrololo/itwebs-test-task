'use client';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { PostCreate, PostCreateSchema } from '@/entities/post/model/model';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import instance from '@/shared/api/instance';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useToast } from '@/lib/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';

export default function CreatePostPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<PostCreate>({
    resolver: zodResolver(PostCreateSchema),
    defaultValues: {
      userId: 1,
      title: '',
      body: ''
    }
  });

  const onSubmit = async (data: PostCreate) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('body', data.body);
      formData.append('userId', data.userId.toString());
      
      if (file) {
        formData.append('file', file);
      }

      await instance.post('/posts', formData);
      
      form.reset();
      setFile(null);
      
      toast({
        title: 'Success',
        description: 'Post created successfully!'
      });
    } catch (error) {
      console.error('Error creating post:', error);
      toast({
        title: 'Error',
        description: 'Failed to create post. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-6">
      <div className="text-center space-y-2 mb-6">
        <div className="inline-block bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
          Client Side Rendering
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold">Create New Post</h1>
        <p className="text-sm sm:text-base text-muted-foreground px-4">
          Fill in the form below to create a new post. All fields are required except file upload.
        </p>
      </div>
      
      <div className="bg-card border rounded-xl p-4 sm:p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Title</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter post title" 
                      {...field} 
                      className="h-10 sm:h-12"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Content</FormLabel>
                  <FormControl>
                    <textarea
                      placeholder="Enter post content"
                      className="w-full min-h-[100px] sm:min-h-[120px] border rounded-md p-3 text-sm sm:text-base"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormItem>
              <FormLabel className="text-sm">Attachment</FormLabel>
              <FormControl>
                <Input 
                  type="file"
                  onChange={handleFileChange}
                  className="h-10 sm:h-12 py-1 text-sm"
                />
              </FormControl>
              <FormDescription className="text-xs">
                Select a file to upload (optional)
              </FormDescription>
            </FormItem>
            
            <div className="flex justify-end pt-4">
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 px-4 sm:px-6 py-2 text-sm sm:text-base h-9 sm:h-10"
              >
                {isSubmitting ? (
                  <>
                    <span className="mr-2 h-3 w-3 sm:h-4 sm:w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                    Creating...
                  </>
                ) : (
                  'Create Post'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}