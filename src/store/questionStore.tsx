import { create } from 'zustand'
import { type Question, type State } from '../types'
import { persist } from 'zustand/middleware'
import confetti from 'canvas-confetti'
import getQuestions from '../services/getQuestions'

export const useQuestionsStore = create<State>()(persist((set, get) => {
  return {
    questions: [],
    currentQuestion: 0,
    getQuestions: async (limit: number) => {
      const json = await getQuestions()
      const questions = json.sort(() => Math.random() - 0.5).slice(0, limit)

      set({ questions })
    },

    selectUserAnswer: (questionId: number, answerIndex: number) => {
      const { questions } = get()
      const newQuestions = structuredClone(questions)
      const questionIndex = newQuestions.findIndex((q: Question) => q.id === questionId)

      const questionInfo = newQuestions[questionIndex]

      const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex

      if (isCorrectUserAnswer) {
        confetti()?.catch(err => console.log(err))
      }

      newQuestions[questionIndex] = {
        ...questionInfo,
        isCorrectUserAnswer,
        userAnswer: answerIndex
      }
      set({ questions: newQuestions })
    },

    goNextQuestion: () => {
      const { currentQuestion, questions } = get()
      const nextPage = currentQuestion + 1

      if (nextPage < questions.length) {
        set({ currentQuestion: nextPage })
      }
    },

    goForwardQuestion: () => {
      const { currentQuestion } = get()

      const prevPage = currentQuestion - 1

      if (prevPage >= 0) {
        set({ currentQuestion: prevPage })
      }
    },

    reset: () => {
      set({ currentQuestion: 0, questions: [] })
    }
  }
}, {
  name: 'questions'
}))
