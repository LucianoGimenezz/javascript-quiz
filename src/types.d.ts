export interface Question {
  id: number
  question: string
  code: string
  answers: string[]
  correctAnswer: number
  userAnswer?: number
  isCorrectUserAnswer?: boolean
}

export interface State {
  questions: Question[]
  currentQuestion: number
  getQuestions: (limit: number) => Promise<void>
  selectUserAnswer: (questionId: number, answerIndex: number) => void
  goNextQuestion: () => void
  goForwardQuestion: () => void
  reset: () => void
}
