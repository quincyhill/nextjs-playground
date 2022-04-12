import type { Filter, FilterAction } from '../../types'

export const initialState: Filter = {
  status: 'all',
  colors: [],
}

export default function filterReducer(
  state: Filter = initialState,
  action: FilterAction
): Filter {
  switch (action.type) {
    // Payload is the filter status we want to set
    case 'filter/filterStatusChanged':
      return {
        ...state,
        status: action.payload.status,
      }
    case 'filter/filterColorChanged':
      // Payload is the color we want to set
      return {
        ...state,
        colors: action.payload.colors,
      }
    default:
      return {
        ...state,
      }
  }
}
