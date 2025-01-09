import edge from 'edge.js'
import env from '#start/env'
import { edgeIconify } from 'edge-iconify'
import moment from 'moment'

edge.use(edgeIconify)

edge.global('appUrl', env.get('HOST'))
edge.global('dateFormat', (date = '', format = 'MMM YYYY') => {
  if (!date) return 'NOW'
  return moment(date).format(format)
})

edge.global('ifNull', (data = null) => {
  if (!data) return ''
  return data
})
edge.global('ifComa', (data = null) => {
  if (!data) return ''
  return ','
})
