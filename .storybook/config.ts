import '@fortawesome/fontawesome-free/js/all'
import { configure } from '@storybook/react'
import '../src/fonts.css'

function loadStories() {
  const req = require.context('../src', true, /\.story\.(js|tsx)$/)
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
