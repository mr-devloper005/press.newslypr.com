import type { TaskKey } from "@/lib/site-config";

export const slot4TaskSupport = {
  article: false,
  mediaDistribution: true,
  classified: true,
  sbm: true,
  profile: true,
  pdf: true,
  listing: true,
  image: true,
} satisfies Record<TaskKey, boolean>;

export const slot4TaskNotes = {
  article: "Article pages and article detail backlinks",
  mediaDistribution: "Newswire updates, announcements, press coverage, and media distribution posts",
  classified: "Classified ads pages and detail backlinks",
  sbm: "Social bookmarking pages and detail backlinks",
  profile: "Profile/user pages",
  pdf: "PDF/document pages and detail backlinks",
  listing: "Business listing pages and detail backlinks",
  image: "Image/gallery pages and detail backlinks",
} satisfies Record<TaskKey, string>;
