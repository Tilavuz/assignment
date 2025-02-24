class TeachersFilterStorage {
  getQuery() {
    const query = localStorage.getItem("filterTeachers");
    if (query) {
      return JSON.parse(query);
    }
    return null;
  }
  setQuery({
    query,
  }: {
    query: {
      page: number;
      size: number;
      id?: number;
      phone?: string;
      firstName?: string;
      lastName?: string;
      pinfl?: string;
      keyword?: string;
    };
  }) {
    const filterTeachers = JSON.stringify(query);
    localStorage.setItem("filterTeachers", filterTeachers);
    return localStorage.getItem("filterTeachers");
  }
  stringQuery({
    page,
    size,
    id,
    phone,
    firstName,
    lastName,
    pinfl,
    keyword,
  }: {
    page: number;
    size: number;
    id?: number;
    phone?: string;
    firstName?: string;
    lastName?: string;
    pinfl?: string;
    keyword?: string;
  }) {
    return `${page}${size}${id}${phone}${firstName}${lastName}${pinfl}${keyword}`;
  }
}

export const teachersFilterStorage = new TeachersFilterStorage();
