import { useCallback, useState } from 'react'

const PROGRESS_KEY = 'gc-ai4all-progress-v3'

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(PROGRESS_KEY) || '') || { videos: [], sims: [], games: [], code: 0, notes: {} }
  } catch {
    return { videos: [], sims: [], games: [], code: 0, notes: {} }
  }
}

export function useProgress() {
  const [progress, setProgress] = useState(loadProgress)

  const save = useCallback((next) => {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(next))
    setProgress(next)
  }, [])

  const addProgress = useCallback((type, id) => {
    setProgress((prev) => {
      let next
      if (type === 'code') {
        next = { ...prev, code: prev.code + 1 }
      } else if (!prev[type].includes(id)) {
        next = { ...prev, [type]: [...prev[type], id] }
      } else {
        return prev
      }
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const saveNote = useCallback((videoId, text) => {
    setProgress((prev) => {
      const next = { ...prev, notes: { ...prev.notes, [videoId]: text } }
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const resetProgress = useCallback(() => {
    const next = { videos: [], sims: [], games: [], code: 0, notes: {} }
    save(next)
  }, [save])

  return { progress, addProgress, saveNote, resetProgress }
}
