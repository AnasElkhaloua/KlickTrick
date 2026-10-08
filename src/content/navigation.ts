export const navigationItems = [
  {key: "home", href: "/"},
  {key: "services", href: "/services"},
  {key: "about", href: "/about"},
  {key: "contact", href: "/contact"}
] as const;

export type AppPathname = (typeof navigationItems)[number]["href"];
