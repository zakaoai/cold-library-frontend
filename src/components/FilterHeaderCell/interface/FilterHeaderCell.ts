import order from "@/interfaces/containers/Activite/TrackedTorrent/Modal/order"

export default interface FilterHeaderCell<Type extends object> {
  id: string
  filter?: boolean
  label?: string
  orderBy: keyof Type | undefined
  order: order
  sortBy: (property: keyof Type) => void
}
