import { useSearchParams } from 'react-router-dom'

export const useQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const getParam = (key: string) => searchParams.get(key)

  const setParam = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams)
    newParams.set(key, value)
    setSearchParams(newParams)
  }

  const deleteParam = (key: string) => {
    const newParams = new URLSearchParams(searchParams)
    newParams.delete(key)
    setSearchParams(newParams)
  }

  return { getParam, setParam, deleteParam, searchParams }
}