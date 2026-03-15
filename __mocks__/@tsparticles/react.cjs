const React = require('react')

function Particles() {
  return React.createElement('div', { 'data-testid': 'particles-bg' })
}

function initParticlesEngine() {
  return Promise.resolve()
}

module.exports = { default: Particles, initParticlesEngine }
module.exports.Particles = Particles
module.exports.initParticlesEngine = initParticlesEngine
