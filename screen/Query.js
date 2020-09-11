import {gql} from 'apollo-boost';

export const SEE_TOP_SONG = gql`
  query seeTopSong {
    seeTopSong {
      id
      videoId
      title
      singer
      thumbnail
      duration
      createdAt
    }
  }
`;

export const SEE_VIDEO = gql`
  query seeVideo($division: String!, $pageNumber: Int!, $items: Int!) {
    seeVideo(division: $division, pageNumber: $pageNumber, items: $items) {
      id
      videoId
      title
      singer
      thumbnail
      duration
      division
      createdAt
    }
  }
`;

export const CREATE_VIDEO = gql`
  mutation createVideo(
    $videoId: [String!]!
    $title: [String!]!
    $singer: [String!]!
    $thumbnail: [String!]!
    $duration: [String!]!
    $division: [String]!
  ) {
    createVideo(
      videoId: $videoId
      title: $title
      singer: $singer
      thumbnail: $thumbnail
      duration: $duration
      division: $division
    )
  }
`;

export const FAVORITE_VIDEO = gql`
  query favoriteVideo($videoId: [String!]!) {
    favoriteVideo(videoId: $videoId) {
      id
      videoId
      title
      singer
      thumbnail
      duration
      division
      createdAt
    }
  }
`;

export const ARTIST_VIDEO = gql`
  query artistVideo($artist: String!, $pageNumber: Int!, $items: Int!) {
    artistVideo(artist: $artist, pageNumber: $pageNumber, items: $items) {
      id
      videoId
      title
      singer
      thumbnail
      duration
      createdAt
    }
  }
`;

export const SEARCH_VIDEO = gql`
  query searchVideo($value: String!, $pageNumber: Int!, $items: Int!) {
    searchVideo(value: $value, pageNumber: $pageNumber, items: $items) {
      id
      videoId
      title
      singer
      thumbnail
      duration
      createdAt
    }
  }
`;

export const DELETE_VIDEO = gql`
  mutation deleteVideo {
    deleteVideo
  }
`;

export const MAIN_VIEW_VIDEO = gql`
  query mainViewVideo {
    mainViewVideo {
      videoId
      title
      thumbnail
      duration
      division
      createdAt
      updatedAt
    }
  }
`;

export const SEE_PROGRAM_VIDEO = gql`
  query seeProgramVideo($program: String!, $items: Int!, $pageNumber: Int!) {
    seeProgramVideo(program: $program, items: $items, pageNumber: $pageNumber) {
      videoId
      title
      thumbnail
      duration
      division
      newVideo
      createdAt
      updatedAt
    }
  }
`;

export const SEE_GENERATION_VIDEO = gql`
  query seeGenerationVideo {
    seeGenerationVideo {
      id
      videoId
      title
      singer
      thumbnail
      duration
      ranking
      division
      createdAt
    }
  }
`;

export const SEE_PROGRAM_BOX = gql`
  query seeProgram($division: String) {
    seeProgram(division: $division) {
      programName
      imageUrl
      newVideos
    }
  }
`;

export const SEE_SINGER_BOX = gql`
  query seeSinger($division: String) {
    seeSinger(division: $division) {
      singerName
      imageUrl
    }
  }
`;

export const SEE_PLAY_LIST_BOX = gql`
  query seePlayList($division: String) {
    seePlayList(division: $division) {
      id
      playListName
      imageUrl
      videoLength
    }
  }
`;

export const SEE_PLAY_LIST_SONG = gql`
  query seePlayListSong($id: String!) {
    seePlayListSong(id: $id) {
      id
      videos {
        id
        videoId
        title
        singer
        thumbnail
        duration
        division
        program
        createdAt
      }
    }
  }
`;

export const SEE_LATEST_VIDEO = gql`
  query seeLatestVideo($division: String, $items: Int, $pageNumber: Int) {
    seeLatestVideo(
      division: $division
      items: $items
      pageNumber: $pageNumber
    ) {
      id
      videoId
      title
      singer
      thumbnail
      duration
      division
      program
      releaseDate
      createdAt
    }
  }
`;
