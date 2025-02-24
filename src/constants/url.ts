export const url = {
  teacher: {
    create: "/teachers/create",
    update: "/teachers/update",
    get_one: (id: number) => `/teachers/one/${id}`,
    delete: (id: number) => `/teachers/delete/${id}`,
    filter: "/teachers/filter",
    get_faces: (id: number) => `/v1/teacher/face/list/${id}`,
    upload_photo: "/v1/teacher/face/recognize/by/id",
  },
};
