import { Board } from "../features/board/types";

export function loadBoard(): Board | null {
  if (typeof window === "undefined") return null;

  const saved = localStorage.getItem("board");
  return saved ? JSON.parse(saved) : null;
}

export function saveBoard(board: Board) {
  localStorage.setItem("board", JSON.stringify(board));
}