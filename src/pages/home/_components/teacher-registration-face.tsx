import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScanFace } from "lucide-react";
import { Input } from "@/components/ui/input";
import { teacherService } from "@/services/teacher.service";
import { useState } from "react";

export default function TeacherRegistrationFace({ id }: { id: number }) {
  const [file, setFile] = useState<File>();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (file && id) {
        const data = await teacherService.registrationTeacherFace({ id, file });
        console.log(data);

        setFile(undefined);
        setOpen(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          <ScanFace />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Face registration</DialogTitle>
          <DialogDescription>Registering the teacher's face</DialogDescription>
        </DialogHeader>
        <div>
          <Input
            onChange={(e) => setFile(e.target.files?.[0])}
            required
            type="file"
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"outline"}>Close</Button>
          </DialogClose>
          <Button onClick={handleSubmit}>
            {loading ? "loading..." : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
