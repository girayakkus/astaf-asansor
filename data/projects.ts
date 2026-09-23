export const projectTypes=['Montaj','Revizyon','Bakım','Ray','Kapı'] as const;
export type Project={slug:string;title:string;location:string;operation:string;type:typeof projectTypes[number];buildingType:string;description:string;image:string;imageAlt:string;completedAt:string;published:boolean;sections:{title:string;text:string}[]};
// TODO: Yalnızca izinli görselleri olan, doğrulanmış gerçek projeleri ekleyin.
export const projects:Project[]=[];
export const publishedProjects=projects.filter(p=>p.published);
