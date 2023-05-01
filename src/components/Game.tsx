import { useQuestionsStore } from '../store/questionStore'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { nord, tomorrow } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { type Question as QuestionType } from '../types'
import { ArrowForwardICon, ArrowNextIcon, ClipboardIcon } from './Icons'
import { getBackgroundColor } from '../utils'
import Footer from './Footer'
import { useConfigurationStore } from '../store/userConfigurationStore'

function Question ({ info, limit }: { info: QuestionType, limit: number }) {
  const theme = useConfigurationStore(state => state.theme)
  const [
    selectAnswer,
    currentQuestion,
    goNextQuestion,
    goForwardQuestion
  ] = useQuestionsStore(state => [
    state.selectUserAnswer,
    state.currentQuestion,
    state.goNextQuestion,
    state.goForwardQuestion
  ])

  const handleClick = (index: number) => () => {
    selectAnswer(info.id, index)
  }

  const handleClipBoard = () => {
    window.navigator.clipboard.writeText(info.code).catch(err => console.log(err))
  }
  return (
    <section
      className={`p-2 flex flex-col mt-5 w-11/12 rounded-sm justify-center items-center ${theme === 'dark' ? 'bg-slate-500' : 'bg-slate-300'}`}
    >
      <div className='w-full grid grid-cols-[90px,400px] items-center p-2 '>
        <div className='flex'>
          <button
            onClick={goForwardQuestion}
            disabled={currentQuestion === 0} className='disabled:opacity-50 disabled:cursor-not-allowed'
          >
            <ArrowForwardICon color={theme === 'dark' ? 'text-white' : 'text-slate-900'} />
          </button>
          <p className={`${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{currentQuestion + 1} / {limit}</p>
          <button onClick={goNextQuestion} disabled={currentQuestion + 1 === limit || info.userAnswer === undefined} className='disabled:opacity-50 disabled:cursor-not-allowed'>
            <ArrowNextIcon color={theme === 'dark' ? 'text-white' : 'text-slate-900'} />
          </button>
        </div>
        <h1 className={`p-2 justify-self-center ${theme === 'dark' ? 'text-slate-50' : 'text-slate-900 font-bold'}`}>
          {info.question}
        </h1>
      </div>
      <div className='flex flex-col w-full relative'>
        <span
          onClick={handleClipBoard}
          className='absolute right-0 p-2 cursor-pointer'
        >
          <ClipboardIcon />
        </span>
        <SyntaxHighlighter
          language='javascript'
          style={theme === 'dark' ? nord : tomorrow}
          customStyle={{
            display: 'flex',
            justifyContent: 'center',
            paddingTop: 14,
            paddingBottom: 14,
            overflow: 'auto'

          }}
        >
          {info.code}
        </SyntaxHighlighter>
      </div>
      <div className='w-full flex flex-col gap-1 mt-2'>
        {info.answers.map((q, index) => (
          <button
            disabled={info.userAnswer !== undefined}
            onClick={handleClick(index)}
            className={` ${getBackgroundColor(info, index)} py-2 text-textColor font-semibold hover:bg-slate-300  disabled:opacity-50 disabled:pointer-events-none`}
            key={index}
          >{q}
          </button>
        ))}
      </div>
      <Footer />
    </section>
  )
}

export default function Game () {
  const [questions, currentQuestion] = useQuestionsStore(state => [
    state.questions,
    state.currentQuestion
  ])

  const questionInfo = questions[currentQuestion]
  const limit = questions.length

  return (
    <Question info={questionInfo} limit={limit} />
  )
}
