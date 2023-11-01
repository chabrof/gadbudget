import React, { useState, useEffect } from 'react'

type Options = {
  threshold: number,
  onStart: (any) => any,
  onFinish: (any) => any,
  onCancel: (any) => any
} | undefined

function isTouchEvent ({ nativeEvent }) {
  return window.TouchEvent
    ? nativeEvent instanceof TouchEvent
    : 'touches' in nativeEvent
}

function isMouseEvent (event) {
  return event.nativeEvent instanceof MouseEvent
}

export function useLongPress (callback, options: Options) {
  const { threshold = 400, onStart, onFinish, onCancel } = options || {}
  const isLongPressActive = React.useRef(false)
  const isPressed = React.useRef(false)
  const timerId: any = React.useRef()

  return React.useMemo(() => {
    if (typeof callback !== 'function') {
      return {}
    }

    const start = (event) => {
      if (!isMouseEvent(event) && !isTouchEvent(event)) return

      if (onStart) {
        onStart(event)
      }

      isPressed.current = true
      timerId.current = setTimeout(() => {
        callback(event)
        isLongPressActive.current = true
      }, threshold)
    }

    const cancel = (event) => {
      if (!isMouseEvent(event) && !isTouchEvent(event)) return

      if (isLongPressActive.current) {
        if (onFinish) {
          onFinish(event)
        }
      } else if (isPressed.current) {
        if (onCancel) {
          onCancel(event)
        }
      }

      isLongPressActive.current = false
      isPressed.current = false

      if (timerId.current) {
        window.clearTimeout(timerId.current)
      }
    }

    const mouseHandlers = {
      onMouseDown: start,
      onMouseUp: cancel,
      onMouseLeave: cancel,
    }

    const touchHandlers = {
      onTouchStart: start,
      onTouchEnd: cancel,
    }

    return {
      ...mouseHandlers,
      ...touchHandlers,
    }
  }, [callback, threshold, onCancel, onFinish, onStart])
}

export const identity = (arg) => arg

export function useLoadExtScript (
  url: string,
  onLoadCbk: any,
  onErrorCbk: any = identity,
  postLoadingCbk): void {
  useEffect(() => {
    const scriptTag = document.createElement('script')
    scriptTag.src = url
    scriptTag.async = true
    scriptTag.defer = true
    scriptTag.onload = () => postLoadingCbk().then(() => onLoadCbk())
    scriptTag.onerror = onErrorCbk

    document.body.appendChild(scriptTag)

    return () => {
      document.body.removeChild(scriptTag)
    }
  }, [])
}