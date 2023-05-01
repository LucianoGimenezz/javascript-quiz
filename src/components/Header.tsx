import { useConfigurationStore } from '../store/userConfigurationStore'
import { MoonIcon, SunIcon } from './Icons'

export default function Header () {
  const theme = useConfigurationStore(state => state.theme)
  const changeTheme = useConfigurationStore(state => state.changeTheme)
  return (
    <header className='w-full max-w-4xl m-auto flex p-4'>
      <nav className='w-11/12 flex flex-row-reverse h-full'>
        <ul>
          <li className='cursor-pointer' onClick={changeTheme}>
            {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
          </li>
        </ul>
      </nav>
    </header>
  )
}
