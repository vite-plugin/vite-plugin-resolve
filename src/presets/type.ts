export interface LibMeta {
    name: string
    members: string[]
  }
export interface LibEsmResult {
    window: string;
    require: string;
    exports: string;
    keywords: Record<string, string>;
}