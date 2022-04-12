import type { Filter, FilterAction } from '../../types'

const initialState: Filter = {
  status: 'all',
  colors: [],
}

export default function filterReducer(
  state: Filter = initialState,
  action: FilterAction
): Filter {
  switch (action.type) {
    case 'filter/statusFilterChanged':
      return {
        ...state,
      }
    case 'filter/colorFilterChanged':
      return {
        ...state,
      }
    default:
      return {
        ...state,
      }
  }
}
