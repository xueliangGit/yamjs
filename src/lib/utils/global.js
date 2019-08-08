let global = window || {
  MutationObserver: () => {}
}
let doc = document || {
  
}
export {
  global,
  doc
}
