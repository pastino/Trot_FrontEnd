import gql from 'graphql-tag';

export const SEE_CHAT = gql`
  query seeChat {
    seeChat {
      fcmToken
      id
      nickName
      avatar
      text
      commentTargetId
      commentText
      commentNickName
      videoId
      thumbnail
      title
      singer
      duration
      delete
      createdAt
    }
  }
`;

export const CREATE_CHAT = gql`
  mutation createChat(
    $fcmToken: String
    $nickName: String!
    $avatar: String
    $text: String!
    $commentTargetId: String
    $commentText: String
    $commentNickName: String
    $videoId: String
    $thumbnail: String
    $title: String
    $singer: String
    $duration: String
  ) {
    createChat(
      fcmToken: $fcmToken
      nickName: $nickName
      avatar: $avatar
      text: $text
      commentTargetId: $commentTargetId
      commentText: $commentText
      commentNickName: $commentNickName
      videoId: $videoId
      thumbnail: $thumbnail
      title: $title
      singer: $singer
      duration: $duration
    ) {
      fcmToken
      id
      nickName
      avatar
      text
      commentTargetId
      commentText
      commentNickName
      videoId
      thumbnail
      title
      singer
      duration
      delete
      createdAt
    }
  }
`;

export const NEW_CHAT = gql`
  subscription subscriptionChat {
    subscriptionChat {
      fcmToken
      id
      nickName
      avatar
      text
      commentTargetId
      commentText
      commentNickName
      videoId
      thumbnail
      title
      singer
      duration
      delete
    }
  }
`;

export const DELETE_CHAT = gql`
  mutation deleteChat($chatId: String!, $fcmToken: String!) {
    deleteChat(chatId: $chatId, fcmToken: $fcmToken)
  }
`;
