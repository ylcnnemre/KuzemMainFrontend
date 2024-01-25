import { SWRConfig } from 'swr';
import './assets/scss/themes.scss';
import Route from "./Routes"
import { fetcher } from './api/AxiosInstance';

const App = () => {
  return (
      <Route />
  )
}

export default App