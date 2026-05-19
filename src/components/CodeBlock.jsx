import React from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/dracula'

export default function CodeBlock({code, language='bash'}){
  return (
    <div className="my-3">
      <Highlight {...defaultProps} theme={theme} code={code.trim()} language={language}>
        {({className, style, tokens, getLineProps, getTokenProps}) => (
          <pre className={`${className} p-4 rounded-md glass-card overflow-auto`} style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({line, key:i})}>
                {line.map((token, key) => <span key={key} {...getTokenProps({token, key})} />)}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  )
}
