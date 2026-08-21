import { useQuery } from "@tanstack/react-query";
import { NewsModel } from "@/models/news.model";
import { SiteContentModel } from "@/models/site-content.model";

export function useHomeViewModel() {
  const { data: news = [], isLoading: loadingNews } = useQuery({
    queryKey: ["news"],
    queryFn: NewsModel.fetchNews,
  });

  const { data: content, isLoading: loadingContent } = useQuery({
    queryKey: ["site_content"],
    queryFn: SiteContentModel.fetchContent,
  });

  return {
    news,
    loadingNews,
    aboutTitle: content?.["about_title"] ?? "Sobre a NextBR",
    aboutText: content?.["about_text"] ?? "A NextBR é uma startup de tecnologia nascida no Piauí, dedicada a criar soluções de inteligência artificial que aproximam pessoas e máquinas.",
    loadingContent,
  };
}
