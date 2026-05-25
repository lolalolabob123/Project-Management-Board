import {Board} from "@/features/board/types"

const KEY = "board"

export function loadBoard(): Board | null {
  if (typeof window === "undefined") return null

  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return null

    const parsed = JSON.parse(raw)

    if (!parsed?.columns || !Array.isArray(parsed.columns)) {
      return null
    }

    return parsed
  } catch {
    return null
  }
}

export function saveBoard(board: Board) {
  if (typeof window === "undefined") return

  localStorage.setItem(KEY, JSON.stringify(board))
}