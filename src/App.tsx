import { JavaScriptLogo } from './components/Icons'
import { useQuestionsStore } from './store/questionStore'
import Game from './components/Game'
import Header from './components/Header'
import { useConfigurationStore } from './store/userConfigurationStore'

function App () {
  const theme = useConfigurationStore(state => state.theme)
  const [questions, getQuestions, reset] = useQuestionsStore(
    state => [
      state.questions,
      state.getQuestions,
      state.reset
    ])

  const handleClick = () => {
    getQuestions(15)
      .catch(err => console.log(err))
  }

  return (
    <div className={`w-full h-full ${theme === 'light' ? 'bg-slate-100' : 'bg-darkBg'}`}>
      <Header />
      <main className='w-full max-w-2xl h-screen m-auto flex flex-col justify-center items-center '>
        <div className='w-full flex flex-col justify-center items-center gap-5'>

          <div className='flex gap-4 items-center'>
            <JavaScriptLogo />
            <h1 className={`text-3xl sm:text-5xl font-bold ${theme === 'light' ? 'text-slate-700' : 'text-slate-100'}`}>JavaScript Quiz</h1>
          </div>
          {questions.length === 0 &&
            <button
              onClick={handleClick}
              className='bg-slate-600 py-2 px-4 rounded-md text-lg font-bold hover:bg-slate-500'
            >
              Comenzar
            </button>}
        </div>

        {questions.length > 0 && <Game />}
        {questions.length > 0 && <button onClick={() => reset()} className={`bg-slate-400 py-2 px-4 rounded-sm font-bold ${theme === 'dark' ? 'text-slate-100' : 'text-slate-600'} cursor-pointer mt-5`}>Resetear juego</button>}
      </main>
    </div>
  )
}

export default App
