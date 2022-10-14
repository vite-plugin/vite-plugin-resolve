import { createRequire } from "node:module";
const cjs_require = createRequire(import.meta.url);
const _M_ = cjs_require("./cjs");
export const keyword_default = _M_.default || _M_;
export const keyword_delete = _M_.delete;
export const foo = _M_.foo;
export const bar = _M_.bar;
export {
  keyword_default as default,
  keyword_delete as delete,
};