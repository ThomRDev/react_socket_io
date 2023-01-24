import { animateScroll } from 'react-scroll'

// sin animacion
export const scrollToBottom = ( elementId:string ) => {
  animateScroll.scrollToBottom({
    containerId: elementId,
    duration: 0
  });
  
}

// con animacion
export const scrollToBottomAnimated = ( elementId:string ) => {
  animateScroll.scrollToBottom({
      containerId: elementId,
      duration: 250,
  });
}