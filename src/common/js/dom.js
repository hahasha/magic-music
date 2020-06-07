export function addClass (el, className) {
  if (hasClass(el, className)) {
    return true
  }
  const classList = el.className.split(' ')
  classList.push(className)
  el.className = classList.join(' ')
}

export function hasClass (el, className) {
  const reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}
