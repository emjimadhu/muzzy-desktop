const init = () => {
  return Promise.all([
    require('./models/tracks').tracks
  ].map((o) => o.sync({
    force: true
  }))).then(() => {
    console.log('db ready')
  }).catch((err) => {
    console.log('sequelize error')
    console.log(err)
  })
}

export default init
