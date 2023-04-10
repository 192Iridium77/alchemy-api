export interface Article {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  description: string;
  author: string;
  publishedDate: Date;
  imageId: string;
}

export interface ArticlesFilter {
  id?: number;
  title?: string;
  authorId?: number;
  category?: string;
  published?: boolean;
}
