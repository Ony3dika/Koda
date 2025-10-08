"use client";
import { useState, useId } from "react";
import { Plus, FilesIcon, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { toast } from "sonner";
import { useStore } from "@/app/store";
import { useAddDocument } from "@/lib/documet-actions";
function StatusDot({ className }) {
  return (
    <svg
      width='8'
      height='8'
      fill='currentColor'
      viewBox='0 0 8 8'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      aria-hidden='true'
    >
      <circle cx='4' cy='4' r='4' />
    </svg>
  );
}
const categoryOptions = [
  { name: "sales", color: "#f54a00" },
  { name: "blogging", color: "#0d9488" },
  { name: "personal", color: "#9333ea" },
  { name: "work", color: "#eab308" },
  { name: "other", color: "#6a7282" },
];
export default function Component() {
  const id = useId();
  const { userID } = useStore();
  const [open, setOpen] = useState(false);

  const [documentData, setDocumentData] = useState({
    title: "",
    description: "",
    category: "sales",
    color: "#f54a00",
  });

  const { mutate: addDocument, isPending: isCreatingLoading } =
    useAddDocument();
  // Create Document
  const handleCreateDocument = async (e) => {
    e.preventDefault();
    const document = {
      ...documentData,
      content: `title: ${documentData.title} Content`,
      owner_id: userID,
    };

    addDocument(document, {
      onSuccess: () => {
        toast.success("Document created successfully");

        setDocumentData({
          title: "",
          description: "",
          category: "sales",
          color: "#00b8db",
        });
        setOpen(false);
      },
      onError: (error) => {
        console.error(error);
        toast.error(error?.message || "Failed to create document");
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className='flex justify-between'>
        <h2 className='text-3xl font-semibold'>Recent files</h2>

        <DialogTrigger>
          <Button>
            <Plus /> Create New
          </Button>
        </DialogTrigger>
      </div>

      <DialogContent>
        <div className='flex flex-col gap-2'>
          <div
            className='flex size-11 shrink-0 items-center justify-center rounded-full border'
            aria-hidden='true'
          >
            <FilesIcon className='opacity-80' size={16} />
          </div>
          <DialogHeader>
            <DialogTitle className='text-left'>
              Create a new document
            </DialogTitle>
            <DialogDescription className='text-left'>
              Create a new document to store your files.
            </DialogDescription>
          </DialogHeader>
        </div>

        <form className='space-y-5' onSubmit={handleCreateDocument}>
          <div className='space-y-4'>
            {/* Label */}
            <div className='*:not-first:mt-2'>
              <Label>Title</Label>
              <Input
                type='text'
                required
                value={documentData.title}
                onChange={(e) =>
                  setDocumentData({ ...documentData, title: e.target.value })
                }
              />
            </div>
            {/* Desc */}
            <div className='*:not-first:mt-2'>
              <Label htmlFor={`number-${id}`}>Description</Label>

              <Textarea
                className={"h-24 resize-none"}
                required
                value={documentData.description}
                onChange={(e) =>
                  setDocumentData({
                    ...documentData,
                    description: e.target.value,
                  })
                }
              ></Textarea>
            </div>

            {/* Category */}
            <div className='*:not-first:mt-2'>
              <Label htmlFor={id}>Category</Label>
              <Select
                defaultValue='sales'
                onValueChange={(e) =>
                  setDocumentData({
                    ...documentData,
                    category: e,
                    color: categoryOptions.find((c) => c.name === e).color,
                  })
                }
              >
                <SelectTrigger
                  id={id}
                  className='[&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_svg]:shrink-0'
                >
                  <SelectValue placeholder='Select status' />
                </SelectTrigger>
                <SelectContent className='[&_*[role=option]>span>svg]:text-muted-foreground/80 [&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2 [&_*[role=option]>span>svg]:shrink-0'>
                  <SelectItem value='sales'>
                    <span className='flex items-center gap-2'>
                      <StatusDot className='text-orange-600' />
                      <span className='truncate'>Sales</span>
                    </span>
                  </SelectItem>
                  <SelectItem value='blogging'>
                    <span className='flex items-center gap-2'>
                      <StatusDot className='text-teal-600' />
                      <span className='truncate'>Blogging</span>
                    </span>
                  </SelectItem>
                  <SelectItem value='personal'>
                    <span className='flex items-center gap-2'>
                      <StatusDot className='text-purple-600' />
                      <span className='truncate'>Personal</span>
                    </span>
                  </SelectItem>
                  <SelectItem value='work'>
                    <span className='flex items-center gap-2'>
                      <StatusDot className='text-yellow-500' />
                      <span className='truncate'>Work</span>
                    </span>
                  </SelectItem>
                  <SelectItem value='other'>
                    <span className='flex items-center gap-2'>
                      <StatusDot className='text-gray-500' />
                      <span className='truncate'>Other</span>
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            
          </div>

          {isCreatingLoading ? (
            <Button type='submit' disabled className='w-full animate-pulse'>
              <LoaderCircle className='animate-spin mr-2' /> Creating
              Document...
            </Button>
          ) : (
            <Button type='submit' className='w-full'>
              Create Document
            </Button>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
