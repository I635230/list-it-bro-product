import { atom } from 'jotai'
import Cookies from 'js-cookie'

export const loginState = atom(isLogin())

function isLogin() {
  if (Cookies.get('userId')) {
    return true
  } else {
    return false
  }
}
