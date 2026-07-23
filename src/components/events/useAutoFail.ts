import { useEffect } from 'react'

/**
 * Every mini-game calls this itself — it is the "internal timer" that ends
 * the event as a miss if the player doesn't resolve it in time. The engine
 * never tracks per-event expiry; each component is fully responsible for its
 * own lifecycle and only ever calls onSuccess/onFail.
 */
export function useAutoFail(onFail: () => void, timeLimitMs: number) {
  useEffect(() => {
    const t = setTimeout(onFail, timeLimitMs)
    return () => clearTimeout(t)
  }, [onFail, timeLimitMs])
}
