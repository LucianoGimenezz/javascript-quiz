import { useQuestionsStore } from '../store/questionStore'

export default function useQuestionData () {
  const questions = useQuestionsStore(state => state.questions)

  let correct = 0
  let incorrect = 0
  let unanswered = 0

  questions.forEach((q) => {
    if (q.userAnswer !== undefined) {
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (q.isCorrectUserAnswer) {
        correct++
      } else { incorrect++ }
    } else { unanswered++ }
  })

  return { correct, incorrect, unanswered }
}
