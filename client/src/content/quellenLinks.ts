export const quellenLinks = {
  apa2022: "/quellen#src-american-psychiatric-association-2022",
  apa2024: "/quellen#src-american-psychiatric-association-keepers-2024",
  awmf2022:
    "/quellen#src-arbeitsgemeinschaft-der-wissenschaftlichen-medizinischen-fachgesellschaften-awmf-2022",
  batemanFonagy2009: "/quellen#src-bateman-fonagy-2009",
  first2017: "/quellen#src-first-williamsw-benjamin-spitzer-2017",
  fruzzetti2006: "/quellen#src-fruzzetti-2006",
  gunderson1997: "/quellen#src-gunderson-berkowitz-ruiz-sancho-1997",
  gunderson2011: "/quellen#src-gunderson-2011",
  hoffman2005: "/quellen#src-hoffman-2005",
  icd11: "/quellen#src-world-health-organization-2019",
  ipde1999: "/quellen#src-loranger-1999",
  lamberti2023: "/quellen#src-lamberti-2023",
  linehan1993: "/quellen#src-linehan-1993",
  linehan2015: "/quellen#src-linehan-2015",
  projectAir: "/quellen#src-project-air-strategy-laufend",
  storebo2020: "/quellen#src-storeb-2020",
  zanarini1998:
    "/quellen#src-zanarini-frankenburg-dubo-sickel-trikha-levin-reynolds-1998",
  zanarini2004: "/quellen#src-zanarini-frankenburg-hennen-reich-silk-2004",
  zanarini2010: "/quellen#src-zanarini-2010",
  zanarini2012: "/quellen#src-zanarini-2012",
} as const;

export type QuellenLinkKey = keyof typeof quellenLinks;
