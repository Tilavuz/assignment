import { RootState } from "@/app/store";
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
import { Label } from "@/components/ui/label";
import { addTeacher, changeTeacher } from "@/features/teacher-slice";
import { ITeacher } from "@/interfaces/teacher-interface";
import { teacherService } from "@/services/teacher.service";
import { FilePlus, Pen } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function TeacherDialog({
  type,
  teacher,
}: {
  type: "create" | "update";
  teacher?: ITeacher;
}) {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [pinfl, setPinfl] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const [degree, setDegree] = useState<string>("");
  const dispatch = useDispatch();
  const { query } = useSelector((state: RootState) => state.teachers);

  useEffect(() => {
    if (type === "update" && teacher) {
      setFirstName(teacher?.firstName);
      setLastName(teacher?.lastName);
      setPhone(teacher?.phone);
      setPinfl(teacher?.pinfl);
      setDegree(teacher?.degree);
      setPosition(teacher?.position);
    }
  }, []);

  const handleSubmit = async () => {
    try {
      if (type === "create") {
        const teacher = await teacherService.createTeacher({
          degree,
          firstName,
          lastName,
          phone,
          pinfl,
          position,
        });
        dispatch(addTeacher({ teacher, query }));
      }
      if (type === "update" && teacher) {
        const data = await teacherService.updateTeacher({
          degree,
          firstName,
          id: teacher?.id,
          lastName,
          phone,
          pinfl,
          position,
        });
        dispatch(changeTeacher({ query, teacher: data }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild className="cursor-pointer">
        {type === "create" ? (
          <Button>
            <FilePlus />
            Create
          </Button>
        ) : (
          <Button className="cursor-pointer" variant={"outline"}>
            <Pen />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {type === "create" ? "Create teacher" : "Update teacher"}
          </DialogTitle>
          <DialogDescription>
            {type === "create"
              ? "Enter the information of the new teacher"
              : "Update teacher information"}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                placeholder="John"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                value={lastName}
                id="lastName"
                name="lastName"
                placeholder="Doe"
                required
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              placeholder="+998908827251"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="degree">Degree</Label>
              <Input
                id="degree"
                name="degree"
                placeholder="Enter degree"
                required
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pinfl">PINFL</Label>
              <Input
                id="pinfl"
                name="pinfl"
                placeholder="Enter PINFL"
                required
                value={pinfl}
                onChange={(e) => setPinfl(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="position">Position</Label>
            <Input
              id="position"
              name="position"
              placeholder="e.g. Professor, Assistant Teacher"
              required
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} className="w-full">
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
