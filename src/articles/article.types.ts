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
