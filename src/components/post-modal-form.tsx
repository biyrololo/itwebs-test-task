"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { PostCreate, PostCreateSchema } from '@/entities/post/model/model';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Modal } from '@/components/ui/modal';
import instance from '@/shared/api/instance';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useToast } from '@/lib/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';

interface PostModalFormProps {
  isOpen: boolean;
  onClose: () => void;
  onPostCreated?: () => void;
}

function PostModalForm({ isOpen, onClose, onPostCreated }: PostModalFormProps) {
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
      
      if (onPostCreated) {
        onPostCreated();
      }
      
      toast({
        title: 'Success',
        description: 'Post created successfully!'
      });
      
      onClose();
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

  const handleClose = () => {
    form.reset();
    setFile(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Create New Post" className="max-w-xs sm:max-w-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                    className="w-full min-h-[80px] sm:min-h-[100px] border rounded-md p-2 dark:bg-gray-700 dark:border-gray-600 text-sm"
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
              />
            </FormControl>
          </FormItem>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button 
              type="button" 
              variant="outline"
              onClick={handleClose}
              className="h-8 sm:h-9 text-xs sm:text-sm"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 h-8 sm:h-9 text-xs sm:text-sm"
            >
              {isSubmitting ? (
                <>
                  <span className="mr-1 h-2 w-2 sm:mr-2 sm:h-3 sm:w-3 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                  Creating...
                </>
              ) : (
                'Create Post'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
}

export { PostModalForm };