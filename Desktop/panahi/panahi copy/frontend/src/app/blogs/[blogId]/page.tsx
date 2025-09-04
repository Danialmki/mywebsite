"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPostBySlug, getRelatedPosts, type BlogPost } from "@/lib/api";

export default function BlogPage() {
  const params = useParams();
  const slug = params.blogId as string;
  
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPostData = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        setError(null);

        // Fetch the main post
        const postData = await getPostBySlug(slug);
        
        if (!postData) {
          setError('Blog post not found');
          return;
        }

        setPost(postData);

        // Fetch related posts
        try {
          const related = await getRelatedPosts(postData.id, 3);
          setRelatedPosts(related);
        } catch (relatedError) {
          console.error('Error fetching related posts:', relatedError);
          // Don't set error for related posts, just continue without them
        }
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Failed to load blog post. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPostData();
  }, [slug]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getImageUrl = (post: BlogPost) => {
    if (post.heroImage?.url) {
      // If URL is relative, prepend the API base URL
      if (post.heroImage.url.startsWith('/')) {
        return `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}${post.heroImage.url}`;
      }
      return post.heroImage.url;
    }
    // Fallback image
    return "/api/placeholder/800/400";
  };

  // Simple rich text renderer for Lexical content
  const renderContent = (content: any) => {
    if (typeof content === 'string') {
      return <p className="mb-4">{content}</p>;
    }

    if (content?.root?.children) {
      return content.root.children.map((node: any, index: number) => {
        if (node.type === 'paragraph') {
          return (
            <p key={index} className="mb-4">
              {node.children?.map((child: any, childIndex: number) => {
                if (child.type === 'text') {
                  return <span key={childIndex}>{child.text}</span>;
                }
                return null;
              })}
            </p>
          );
        }
        if (node.type === 'heading') {
          const HeadingTag = `h${node.tag}` as keyof JSX.IntrinsicElements;
          return (
            <HeadingTag key={index} className="font-bold mb-4 mt-6">
              {node.children?.map((child: any, childIndex: number) => {
                if (child.type === 'text') {
                  return <span key={childIndex}>{child.text}</span>;
                }
                return null;
              })}
            </HeadingTag>
          );
        }
        return null;
      });
    }

    // Fallback for simple content
    return <p className="mb-4">{String(content)}</p>;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-violet-600 mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading blog post...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Blog Post Not Found</h1>
            <p className="text-muted-foreground mb-6">
              {error || "The blog post you're looking for doesn't exist."}
            </p>
            <Link href="/blogs">
              <Button>Back to Blog</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

        {/* Hero Section */}
      <div className="relative">
        <div className="aspect-[21/9] relative overflow-hidden">
            <Image
            src={getImageUrl(post)}
            alt={post.heroImage?.alt || post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
          </div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-4xl">
            <div className="flex items-center justify-center gap-2 mb-4">
              {post.categories?.map((category, index) => (
                <span
                  key={category.id}
                  className="bg-violet-600 text-white px-3 py-1 rounded-full text-sm"
                >
                  {category.title}
                  </span>
              ))}
                </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {post.title}
            </h1>
            <p className="text-xl mb-6 opacity-90">
              {post.meta?.description || "Explore this comprehensive guide to improve your English skills."}
            </p>
            <div className="text-sm opacity-75">
              {post.publishedAt && `Published on ${formatDate(post.publishedAt)}`}
                  </div>
                  </div>
                  </div>
                </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link href="/blogs" className="hover:text-foreground">Blog</Link>
          <span>/</span>
          <span className="text-foreground">{post.title}</span>
                </div>

        {/* Article Content */}
        <article className="prose prose-lg max-w-none">
          <div className="text-foreground leading-relaxed">
            {renderContent(post.content)}
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Card key={relatedPost.id} className="group hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative overflow-hidden rounded-t-lg">
                    <Image
                      src={getImageUrl(relatedPost)}
                      alt={relatedPost.heroImage?.alt || relatedPost.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
              <CardHeader>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      {relatedPost.categories?.map((category, index) => (
                        <span key={category.id}>
                          {category.title}
                          {index < (relatedPost.categories?.length || 0) - 1 && ", "}
                        </span>
                      ))}
                    </div>
                    <CardTitle className="text-lg line-clamp-2 group-hover:text-violet-600 transition-colors">
                      {relatedPost.title}
                    </CardTitle>
              </CardHeader>
              <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        {relatedPost.publishedAt && formatDate(relatedPost.publishedAt)}
                  </div>
                      <Link href={`/blogs/${relatedPost.slug}`}>
                        <Button variant="outline" size="sm">
                          Read More
                        </Button>
                      </Link>
                </div>
              </CardContent>
            </Card>
              ))}
            </div>
          </div>
        )}

        {/* Back to Blog Button */}
        <div className="mt-12 text-center">
          <Link href="/blogs">
            <Button variant="outline" size="lg">
              ← Back to Blog
            </Button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
