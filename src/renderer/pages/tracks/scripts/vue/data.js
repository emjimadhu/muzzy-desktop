export default () => ({
  songs: [],
  headers: [
    {
      text: 'Title',
      align: 'center',
      value: 'title'
    },
    {
      text: 'Artist',
      align: 'center',
      value: 'artist'
    },
    {
      text: 'Album',
      align: 'center',
      value: 'album'
    }
  ],
  listLoading: false,
  playingIndex: null,
  songLoaded: false
})
