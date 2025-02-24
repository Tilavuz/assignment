import { privateInstance } from "@/api/client-api";
import { url } from "@/constants/url";

class TeacherService {
  async createTeacher({
    firstName,
    lastName,
    phone,
    pinfl,
    degree,
    position,
  }: {
    firstName: string;
    lastName: string;
    phone: string;
    pinfl: string;
    degree: string;
    position: string;
  }) {
    try {
      const res = await privateInstance.post(url.teacher.create, {
        firstName,
        lastName,
        phone,
        pinfl,
        position,
        degree,
      });
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async updateTeacher({
    id,
    firstName,
    lastName,
    phone,
    degree,
    position,
    pinfl,
  }: {
    id: number;
    firstName: string;
    lastName: string;
    phone: string;
    pinfl: string;
    degree: string;
    position: string;
  }) {
    try {
      const res = await privateInstance.put(url.teacher.update, {
        firstName,
        lastName,
        phone,
        degree,
        position,
        pinfl,
        id,
      });
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async getOneTeacher(id: number) {
    try {
      const res = await privateInstance.get(url.teacher.get_one(id));
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async deleteTeacher(id: number) {
    try {
      const res = await privateInstance.delete(url.teacher.delete(id));
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  async filterTeacher({
    keyword,
    page,
    phone,
    size,
    firstName,
    lastName,
    pinfl,
    id,
  }: {
    keyword?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    pinfl?: string;
    page: number;
    size: number;
    id?: number;
  }) {
    try {
      const res = await privateInstance.post(url.teacher.filter, {
        keyword,
        filter: {
          id,
          phone,
          firstName,
          lastName,
          pinfl,
        },
        paging: {
          page,
          size,
        },
      });
      return res.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export const teacherService = new TeacherService();
