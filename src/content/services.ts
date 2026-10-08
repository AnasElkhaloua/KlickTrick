export const serviceCategories = [
  {id: "digitalMarketing", icon: "growth"},
  {id: "brandingCreative", icon: "spark"},
  {id: "webTechnology", icon: "code"},
  {id: "socialMedia", icon: "community"},
  {id: "aiAutomation", icon: "automation"},
  {id: "strategyAnalytics", icon: "insight"}
] as const;

export type ServiceIconName = (typeof serviceCategories)[number]["icon"];
