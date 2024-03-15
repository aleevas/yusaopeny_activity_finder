import axios from 'axios'

const DEFAULT = 'af/get-data'
const SESSION_DATA = 'af/api/v1/session-data'
const MORE_INFO = 'af/more-info'
const YGBW_ADS = 'ads'

const client = flag => {
  let url = ''
  switch (flag) {
    case 'session_data':
      url = SESSION_DATA
      break

    case 'more_info':
      url = MORE_INFO
      break

    case 'ygbw_ads':
      url = YGBW_ADS
      break

    default:
      url = DEFAULT
  }
  return axios.create({
    baseURL: window.drupalSettings.path.baseUrl + url
  })
}

export default client
