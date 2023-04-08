export interface Article {
  id: string;
  title: string;
  slug: string;
  draft: boolean;
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
  draft?: boolean;
}
