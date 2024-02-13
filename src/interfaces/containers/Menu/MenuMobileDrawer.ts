import Route from "@/interfaces/route/Route"

export default interface MenuMobileDrawer {
  handleClose: () => void
  links: Route[]
  open: boolean
}
