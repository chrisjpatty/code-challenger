import React from 'react'

export const usePrevious = value => {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

export const useKeyboardShortcut = ({keyCode, modifiers = [], action, disabled}) => {
  React.useEffect(() => {
    if(!disabled){
      enable()
    }
    return () => {
      disable()
    }
  })

  const enable = () => {
    document.addEventListener('keydown', handleAction)
  }

  const disable = () => {
    document.removeEventListener('keydown', handleAction)
  }

  const handleAction = e => {
    if(e.keyCode === keyCode){
      const allModifiersPressed = modifiers.every(mod => {
        switch (mod.toLowerCase()) {
          case 'meta':
            return e.getModifierState('Control') || e.getModifierState('Meta')
          default:
            return e.getModifierState(mod)
        }
      })
      if(allModifiersPressed){
        e.preventDefault()
        action(e)
      }
    }
  }

  return {enable, disable}
}
