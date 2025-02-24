import { apiUrl } from "@/helpers/shared";
import { teacherService } from "@/services/teacher.service";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Teacher() {
  const { id } = useParams();
  const [teacherFaces, setTeacherFaces] =
    useState<{ id: number; imgId: number; faceId: number }[]>();

  useEffect(() => {
    (async () => {
      try {
        const numberId = Number(id);
        if (numberId) {
          const data = await teacherService.getTeacherFaces(numberId);
          setTeacherFaces(data.data);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [id]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {teacherFaces &&
        teacherFaces?.map((teacherFace, i) => {
          return (
            <div className="aspect-square relative overflow-hidden rounded-lg shadow-md">
              <img
                key={teacherFace?.id}
                src={`${apiUrl}/v1/file/view/${teacherFace?.imgId}`}
                alt={`teacher's image ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          );
        })}
      <p>
        {teacherFaces !== undefined &&
          teacherFaces.length === 0 &&
          "Teacher has not images"}
      </p>
    </div>
  );
}
