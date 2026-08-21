import { supabase } from "@/integrations/supabase/client";

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  image_url: string | null;
  published_at: string;
}

export type NewsInput = Omit<NewsItem, "id"> & { id?: string };

export class NewsModel {
  static async fetchNews(): Promise<NewsItem[]> {
    const { data, error } = await supabase
      .from("news")
      .select("id, title, summary, image_url, published_at")
      .order("published_at", { ascending: false });

    if (error) throw error;
    return data ?? [];
  }

  static async insertNews(news: Omit<NewsItem, "id">): Promise<void> {
    const { error } = await supabase.from("news").insert(news);
    if (error) throw error;
  }

  static async updateNews(id: string, news: Omit<NewsItem, "id">): Promise<void> {
    const { error } = await supabase.from("news").update(news).eq("id", id);
    if (error) throw error;
  }

  static async deleteNews(id: string): Promise<void> {
    const { error } = await supabase.from("news").delete().eq("id", id);
    if (error) throw error;
  }
}
