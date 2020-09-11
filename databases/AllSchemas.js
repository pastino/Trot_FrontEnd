import Realm from 'realm';



/// Favorite Schema

export const FAVORITE_SCHEMA = 'Favorite';

export const FavoriteSchema = {
  name: FAVORITE_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'string',
    videoId: 'string',
    creationDate: 'date',
  },
};

const databaseOnptions = {
  path: 'trotApp.realm',
  schema: [FavoriteSchema],
  schemaVersion: 0,
};

export const insertNewFavorte = (newFavorite) =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOnptions)
      .then((realm) => {
        realm.write(() => {
          realm.create(FAVORITE_SCHEMA, newFavorite);
          resolve(newFavorite);
        });
      })
      .catch((error) => reject(error));
  });

export const updateFavorte = (favorite) =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOnptions)
      .then((realm) => {
        realm.write(() => {
          let updatingFavorte = realm.objectForPrimaryKey(
            FAVORITE_SCHEMA,
            favorite.id,
          );
          updatingFavorte.name = favorite.name;
          resolve();
        });
      })
      .catch((error) => reject(error));
  });

export const deleteFavorite = (favoriteId) =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOnptions)
      .then((realm) => {
        realm.write(() => {
          let deleteFavorite = realm
            .objects(FAVORITE_SCHEMA)
            .filtered('videoId == $0', favoriteId);
          realm.delete(deleteFavorite);

          // realm.delete(
          //   realm
          //     .objects(FAVORITE_SCHEMA)
          //     .filtered("categories.serverId == $0", categoryObject.serverId),
          // );
          resolve();
        });
      })
      .catch((error) => reject(error));
  });

export const deleteAllFavorite = () =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOnptions)
      .then((realm) => {
        realm.write(() => {
          let allFavorite = realm.objects(FAVORITE_SCHEMA);
          realm.delete(allFavorite);
          resolve();
        });
      })
      .catch((error) => reject(error));
  });

export const queryAllFavorite = () =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOnptions)
      .then((realm) => {
        realm.write(() => {
          let allFavorite = realm.objects(FAVORITE_SCHEMA);
          resolve(allFavorite);
        });
      })
      .catch((error) => reject(error));
  });

export default new Realm(databaseOnptions);
