import { supabase } from "@/integrations/supabase/client";

export class SiteContentModel {
  static async fetchContent(): Promise<Record<string, string>> {
    const { data, error } = await supabase.from("site_content").select("key, value");
    if (error) throw error;
    
    return Object.fromEntries(
      (data ?? []).map((r) => [r.key, r.value])
    ) as Record<string, string>;
  }

  static async saveContent(content: Record<string, string>): Promise<void> {
    const rows = Object.entries(content).map(([key, value]) => ({ key, value }));
    const { error } = await supabase.from("site_content").upsert(rows, { onConflict: "key" });
    if (error) throw error;
  }
}
