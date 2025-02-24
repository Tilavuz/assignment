import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ITeacher } from "@/interfaces/teacher-interface";
import { teacherService } from "@/services/teacher.service";
import { AxiosError } from "axios";
import { Camera } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Identification() {
  const [teacher, setTeacher] = useState<ITeacher>();
  const [loading, setLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [id, setId] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!id) {
      setError("O'qituvchi id sini kiriting!");
      return;
    }

    const teacherId = Number(id);
    if (!teacherId) {
      setError("Id raqamdan iborat bo'lishi kerak!");
      return;
    }

    setLoading(true);
    const handler = setTimeout(async () => {
      try {
        const data = await teacherService.getOneTeacher(teacherId);
        setTeacher(data);
        setError("");
      } catch (error) {
        console.error("Xatolik:", error);
        setError("O'qituvchi topilmadi!");
      } finally {
        setLoading(false);
      }
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [id]);

  const isButtonDisabled =
    !id || !!error || loading || teacher?.id !== Number(id);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Kamerani yoqib bo‘lmadi:", error);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      const video = videoRef.current;
      const canvas = canvasRef.current;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL("image/png");
        setPhoto(imageData);
      }
    }
  };

  const uploadPhoto = async () => {
    try {
      setUploadLoading(true);
      if (!teacher || !photo) return;
      const data = await teacherService.uploadTeacherPhoto({
        photo,
        id: teacher.id,
      });
      console.log(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.response?.data?.errorMessage);
      }
    } finally {
      setUploadLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="max-w-[600px] w-full border rounded p-4 flex flex-col gap-4">
        <div>
          <Input
            onChange={(e) => setId(e.target.value)}
            placeholder="Teacher's id"
          />
          <>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
                {error ? (
                  <p className="text-red-500">{error}</p>
                ) : (
                  <p>
                    {teacher?.firstName} {teacher?.lastName}
                  </p>
                )}
              </>
            )}
          </>
        </div>
        <div className="">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant={"outline"}
                disabled={isButtonDisabled}
                className="w-full cursor-pointer"
                onClick={() => startCamera()}
              >
                Image upload
                <Camera />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Face capture</DialogTitle>
                <DialogDescription>
                  Hold your face to the camera and take a picture
                </DialogDescription>
              </DialogHeader>
              <div>
                <canvas
                  ref={canvasRef}
                  className="w-full h-full"
                  style={{ display: "none" }}
                ></canvas>
                {photo ? (
                  <img src={photo} alt="Captured" className="w-full h-full" />
                ) : (
                  <video
                    ref={videoRef}
                    autoPlay
                    className="w-full h-full rounded"
                  ></video>
                )}
              </div>
              <DialogFooter>
                {photo ? (
                  <div className="flex items-center gap-2 w-full">
                    <Button
                      className="cursor-pointer max-w-24 w-full"
                      variant={"destructive"}
                      onClick={() => {
                        setPhoto(null);
                        startCamera();
                      }}
                    >
                      Reset
                    </Button>
                    <Button
                      className="cursor-pointer flex-1"
                      variant={"outline"}
                      onClick={uploadPhoto}
                    >
                      {uploadLoading ? "Loading..." : "Upload"}
                    </Button>
                  </div>
                ) : (
                  <Button onClick={capturePhoto} className="cursor-pointer">
                    Take a picture
                  </Button>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
