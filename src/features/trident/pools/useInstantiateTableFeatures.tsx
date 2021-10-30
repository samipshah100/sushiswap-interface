import { useMemo } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { TableInstance } from '../../transactions/types'
import { feeTiersFilterAtom, searchQueryAtom, showTWAPOnlyAtom, sortTableFuncAtom } from './context/atoms'

const useInstantiateFilters = (setFilter: TableInstance['setFilter']) => {
  const searchQuery = useRecoilValue(searchQueryAtom)
  const twapEnabled = useRecoilValue(showTWAPOnlyAtom)
  useMemo(() => setFilter('symbols', { searchQuery, twapEnabled }), [searchQuery, setFilter, twapEnabled])

  const feeTiersSelected = useRecoilValue(feeTiersFilterAtom)
  useMemo(() => setFilter('swapFeePercent', { feeTiersSelected }), [feeTiersSelected, setFilter])
}

export const useInstantiateSorting = (toggleSortBy: TableInstance['toggleSortBy']) => {
  /* Gives sort dropdown access to sort table */
  const setSortFuncAtom = useSetRecoilState(sortTableFuncAtom)
  useMemo(() => {
    setSortFuncAtom(() => toggleSortBy)
  }, [setSortFuncAtom, toggleSortBy])
}

export const useInstantiateTableFeatures = (
  setFilter: TableInstance['setFilter'],
  toggleSortBy: TableInstance['toggleSortBy']
) => {
  useInstantiateFilters(setFilter)
  useInstantiateSorting(toggleSortBy)
}