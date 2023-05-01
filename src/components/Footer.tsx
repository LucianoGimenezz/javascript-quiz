import useQuestionData from '../hooks/useQuestionData'
import { useConfigurationStore } from '../store/userConfigurationStore'

function Span ({ label }: { label: string }) {
  const theme = useConfigurationStore(state => state.theme)
  return <span className={`${theme === 'dark' ? 'text-slate-50' : 'text-slate-800'}`}>{label}</span>
}

export default function Footer () {
  const { correct, incorrect, unanswered } = useQuestionData()
  return (
    <footer className='flex p-2 items-center justify-center gap-5 w-full'>
      <Span label={`✅ ${correct} correctas`} />
      <Span label={`❌ ${incorrect} incorrectas`} />
      <Span label={`❓ ${unanswered} sin responser`} />
    </footer>
  )
}
