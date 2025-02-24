import { AppDispatch, RootState } from "@/app/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { filterTeachersThunk } from "@/features/teacher-slice";
import { teachersFilterStorage } from "@/utils/teachers-filter-storage";
import { Filter } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function FilterSheet() {
  const [id, setId] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [pinfl, setPinfl] = useState<string>("");

  const dispatch: AppDispatch = useDispatch();
  const { teachers } = useSelector((state: RootState) => state.teachers);

  const handleSearch = async () => {
    try {
      const query = {
        id,
        firstName,
        lastName,
        phone,
        pinfl,
        page: 1,
        size: 10,
      };

      const stringQuery = teachersFilterStorage.stringQuery({
        ...query,
        size: 10,
        page: 1,
        id: Number(query?.id),
      });

      if (!teachers[stringQuery]) {
        dispatch(
          filterTeachersThunk({
            ...query,
            id: Number(query?.id),
          })
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleReset = () => {
    try {
      dispatch(filterTeachersThunk({ page: 0, size: 10 }));
      setId("");
      setFirstName("");
      setLastName("");
      setPhone("");
      setPinfl("");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const query: {
      page: number;
      size: number;
      id?: number;
      phone?: string;
      firstName?: string;
      lastName?: string;
      pinfl?: string;
      keyword?: string;
    } = teachersFilterStorage.getQuery();

    if (query.id) setId(`${query?.id}`);
    if (query.firstName) setFirstName(query?.firstName);
    if (query.lastName) setLastName(query?.lastName);
    if (query.phone) setPhone(query?.phone);
    if (query.pinfl) setPinfl(query?.pinfl);
  }, []);

  return (
    <Sheet>
      <SheetTrigger asChild className="cursor-pointer">
        <Button variant={"outline"}>
          <Filter />
          Filter
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Fileter</SheetTitle>
          <SheetDescription>filter teacher data</SheetDescription>
        </SheetHeader>
        <div className="p-2 flex flex-col gap-3 mb-6">
          <div className="flex flex-col gap-1">
            <Label htmlFor="teacherId" className="font-bold">
              Teacher id
            </Label>
            <Input
              onChange={(e) => setId(e.target.value)}
              value={id}
              type="text"
              id="teacherId"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="firstName" className="font-bold">
              First name
            </Label>
            <Input
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              type="text"
              id="firstName"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="lastName" className="font-bold">
              Last name
            </Label>
            <Input
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              type="text"
              id="lastName"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="phone" className="font-bold">
              Phone
            </Label>
            <Input
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              type="text"
              id="phone"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="pinfl" className="font-bold">
              Pinfl
            </Label>
            <Input
              onChange={(e) => setPinfl(e.target.value)}
              value={pinfl}
              type="text"
              id="pinfl"
            />
          </div>
        </div>
        <SheetFooter>
          <div className="flex items-center gap-4 p-2">
            <Button
              onClick={handleReset}
              className="flex-1"
              variant={"outline"}
            >
              Reset
            </Button>
            <Button onClick={handleSearch} className="flex-1">
              Filter
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
