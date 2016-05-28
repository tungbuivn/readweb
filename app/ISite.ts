export interface ISite {
  name:string;
  desc:string;
  getListDocs():string[];
  getChapters(query:any):string[];
}
