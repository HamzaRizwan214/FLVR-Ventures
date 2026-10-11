import { useEffect, useState } from "react";
import { loadArticle, loadArticles } from "@/sanity/articles";

// status: "loading" | "ready" | "error"
export function useArticles() {
  const [state, setState] = useState({ status: "loading", articles: [] });

  useEffect(() => {
    let live = true;
    loadArticles()
      .then(({ articles }) => live && setState({ status: "ready", articles }))
      .catch(() => live && setState({ status: "error", articles: [] }));
    return () => {
      live = false;
    };
  }, []);

  return state;
}

export function useArticle(slug) {
  const [state, setState] = useState({ status: "loading", article: null });

  useEffect(() => {
    let live = true;
    setState({ status: "loading", article: null });
    loadArticle(slug)
      .then((article) => live && setState({ status: "ready", article }))
      .catch(() => live && setState({ status: "error", article: null }));
    return () => {
      live = false;
    };
  }, [slug]);

  return state;
}
