import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props){
    super(props)
    this.state = {error: null, info: null}
  }
  static getDerivedStateFromError(error){
    return {error}
  }
  componentDidCatch(error, info){
    this.setState({error, info})
    console.error('ErrorBoundary caught:', error, info)
  }
  render(){
    if(this.state.error){
      return (
        <div className="p-6 glass-card text-red-300">
          <h2 className="text-xl font-bold">Something went wrong</h2>
          <p className="mt-2">An unexpected error occurred while rendering the page. Details are shown below — refresh to retry.</p>
          <pre className="mt-4 overflow-auto text-sm text-slate-200 bg-black/40 p-3 rounded">{this.state.error && this.state.error.toString()}</pre>
          <details className="mt-2 text-sm text-slate-400">
            <summary>Stack trace</summary>
            <pre className="whitespace-pre-wrap">{this.state.info?.componentStack}</pre>
          </details>
        </div>
      )
    }
    return this.props.children
  }
}
