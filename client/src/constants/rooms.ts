import { users } from "./users";

export const roomData = [
  {
    id: "4d738aaf-82af-43c5-ba35-4f82c439cc51",
    thumbnail: "https://source.unsplash.com/2ShvY8Lf6l0/800x599",
    title: "Room 1",
    listeners: {
      total: 25,
      users: users?.slice(0, 4).map((user) => ({
        id: user.login.uuid,
        avatar: user.picture.medium,
        name: `${user.name} ${user.name.last}`,
      })),
    },
    speaker: {
      id: users[4].login.uuid,
      avatar: users[4].picture.medium,
      name: `${users[4].name} ${users[4].name.last}`,
    },
    topic: "The History of Flexbox",
  },
  {
    id: "3f6b7abe-9dd9-4f20-83ac-2f206b860610",
    thumbnail: "https://source.unsplash.com/Dm-qxdynoEc/800x799",
    title: "Room 2",
    listeners: {
      total: 25,
      users: users?.slice(4, 8).map((user) => ({
        id: user.login.uuid,
        avatar: user.picture.medium,
        name: `${user.name} ${user.name.last}`,
      })),
    },
    speaker: {
      id: users[9].login.uuid,
      avatar: users[9].picture.medium,
      name: `${users[9].name} ${users[9].name.last}`,
    },
    topic: "Introduction to Machine Learning",
  },
];
