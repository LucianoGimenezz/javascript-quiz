export default async function getQuestions () {
  const res = await fetch(import.meta.env.VITE_API)
  const json = await res.json()

  return json
}
