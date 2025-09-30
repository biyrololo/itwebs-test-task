import { ClientPostsPage } from './client-page';
import { Post } from '@/entities/post/model/model';
import instance from '@/shared/api/instance';

export default async function PostsPage() {
  const { data: posts } = await instance.get<Post[]>('/posts?_limit=12');
  
  return <ClientPostsPage posts={posts} />;
}