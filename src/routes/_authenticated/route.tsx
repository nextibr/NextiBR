import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { AuthModel } from "@/models/auth.model";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    try {
      const user = await AuthModel.getUser();
      if (!user) throw redirect({ to: "/auth" });
      return { user };
    } catch {
      throw redirect({ to: "/auth" });
    }
  },
  component: () => <Outlet />,
});
