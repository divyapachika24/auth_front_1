import React from 'react'

export default function ErrorHighlighter(props) {
    return (
            <div className="error-highlight">
              <span>{props.message}</span>
              <button onClick={props.clearError}>X</button>
            </div>
          );

}
