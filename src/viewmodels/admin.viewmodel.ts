import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AuthModel } from "@/models/auth.model";
import { NewsModel, type NewsItem } from "@/models/news.model";
import { SiteContentModel } from "@/models/site-content.model";

const emptyNewsForm = { id: "", title: "", summary: "", image_url: "", published_at: "" };

export function useAdminViewModel() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [newsForm, setNewsForm] = useState(emptyNewsForm);
  const [aboutForm, setAboutForm] = useState({ about_title: "", about_text: "" });

  // 1. Authorization check
  const { data: isAdmin, isLoading: checkingRole } = useQuery({
    queryKey: ["is_admin"],
    queryFn: async () => {
      const user = await AuthModel.getUser();
      if (!user) return false;
      return await AuthModel.checkIsAdmin(user.id);
    },
  });

  // 2. Fetch news list
  const { data: news = [], isLoading: loadingNews } = useQuery({
    queryKey: ["news"],
    queryFn: NewsModel.fetchNews,
  });

  // 3. Fetch about content
  const { data: siteContent, isLoading: loadingContent } = useQuery({
    queryKey: ["site_content"],
    queryFn: SiteContentModel.fetchContent,
  });

  // Bind siteContent to local form state on fetch
  useEffect(() => {
    if (siteContent) {
      setAboutForm({
        about_title: siteContent["about_title"] ?? "",
        about_text: siteContent["about_text"] ?? "",
      });
    }
  }, [siteContent]);

  // 4. Mutations
  const saveNewsMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        title: newsForm.title.trim(),
        summary: newsForm.summary.trim(),
        image_url: newsForm.image_url.trim() || null,
        published_at: newsForm.published_at || new Date().toISOString().slice(0, 10),
      };
      
      if (!payload.title) throw new Error("Informe o título.");

      if (newsForm.id) {
        await NewsModel.updateNews(newsForm.id, payload);
      } else {
        await NewsModel.insertNews(payload);
      }
    },
    onSuccess: () => {
      toast.success(newsForm.id ? "Notícia atualizada!" : "Notícia publicada!");
      setNewsForm(emptyNewsForm);
      queryClient.invalidateQueries({ queryKey: ["news"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const removeNewsMutation = useMutation({
    mutationFn: async (id: string) => {
      await NewsModel.deleteNews(id);
    },
    onSuccess: () => {
      toast.success("Notícia excluída.");
      queryClient.invalidateQueries({ queryKey: ["news"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const saveAboutMutation = useMutation({
    mutationFn: async () => {
      await SiteContentModel.saveContent(aboutForm);
    },
    onSuccess: () => {
      toast.success("Textos institucionais atualizados.");
      queryClient.invalidateQueries({ queryKey: ["site_content"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  async function signOut() {
    try {
      await queryClient.cancelQueries();
      queryClient.clear();
      await AuthModel.signOut();
      navigate({ to: "/auth", replace: true });
    } catch (e: any) {
      toast.error(e.message || "Erro ao sair.");
    }
  }

  function startEditNews(item: NewsItem) {
    setNewsForm({
      id: item.id,
      title: item.title,
      summary: item.summary,
      image_url: item.image_url ?? "",
      published_at: item.published_at,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelEditNews() {
    setNewsForm(emptyNewsForm);
  }

  return {
    isAdmin,
    checkingRole,
    news,
    loadingNews,
    loadingContent,
    newsForm,
    aboutForm,
    setNewsForm,
    setAboutForm,
    saveNews: () => saveNewsMutation.mutate(),
    isSavingNews: saveNewsMutation.isPending,
    removeNews: (id: string) => removeNewsMutation.mutate(id),
    isRemovingNews: removeNewsMutation.isPending,
    saveAbout: () => saveAboutMutation.mutate(),
    isSavingAbout: saveAboutMutation.isPending,
    signOut,
    startEditNews,
    cancelEditNews,
  };
}
