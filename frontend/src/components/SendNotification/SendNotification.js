import { getDatabase, ref, set, child, get } from "firebase/database";

export function SendNotification(user, type, userId, userData) {
  const db = getDatabase();

  get(child(ref(getDatabase()), `notification/${user}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        let data = snapshot.val();
        send(userId, data.value, type);
      } else {
        send(userId, [], type);
      }
    })
    .catch((error) => {
      console.error(error);
    });

  function send(userId, data, type) {
    data.push({
      userId,
      type,
      watched: false,
      data: userData,
    });

    set(ref(db, "notification/" + user), {
      value: data,
    });
  }
}
