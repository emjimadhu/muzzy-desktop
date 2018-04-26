export default () => ({
  songs: [],
  headers: [
    {
      text: 'ID',
      align: 'center',
      value: 'id'
    },
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
    },
    {
      text: 'Genre',
      align: 'center',
      value: 'genre'
    },
    {
      text: 'Duration',
      align: 'center',
      value: 'duration'
    }
  ],
  pagination: {
    sortBy: 'id',
    rowsPerPage: -1
  },
  listLoading: false,
  playingIndex: null,
  songLoaded: false,
  totalSelectedSongs: 0,
  processedSongs: 0,
  totalSongsDurations: null
})
