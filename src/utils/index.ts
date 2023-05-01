import { Question } from '../types'

export const getBackgroundColor = (info: Question, index: number) => {
  const { userAnswer, correctAnswer } = info

  if (userAnswer == null) return 'bg-slate-400'

  if (index !== correctAnswer && index !== userAnswer) return 'bg-slate-400'

  if (index === correctAnswer) return 'bg-lime-500 text-white'

  if (index === userAnswer) return 'bg-red-600 text-white'

  return 'bg-slate-400'
}
