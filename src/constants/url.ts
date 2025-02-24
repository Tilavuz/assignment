export const url = {
  teacher: {
    create: "/teachers/create",
    update: "/teachers/update",
    get_one: (id: number) => `/teachers/one/${id}`,
    delete: (id: number) => `/teachers/delete/${id}`,
    filter: "/teachers/filter",
  },
};
