import {useMediaQuery} from '@mantine/hooks'

export function useIsPointerDevice() {
  const query = '(hover: hover) and (pointer: fine)'
  return useMediaQuery(query)
}
