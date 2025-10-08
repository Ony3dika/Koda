"use client";
import React, { useState, useId } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "./ui/badge";
import {
  ChevronRight,
  Ellipsis,
  FilesIcon,
  TrashIcon,
  FilePenLine,
  LoaderCircle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Tag, TagInput } from "emblor-maintained";
import Link from "next/link";
import { toast } from "sonner";
import { useEditDocument } from "@/lib/documet-actions";
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

const DocCard = ({ doc }) => {
  const categoryOptions = [
    { name: "sales", color: "#f54a00" },
    { name: "blogging", color: "#0d9488" },
    { name: "personal", color: "#9333ea" },
    { name: "work", color: "#eab308" },
    { name: "other", color: "#6a7282" },
  ];
  const id = useId();
  const [open, setOpen] = useState(false);
  const [documentData, setDocumentData] = useState({
    title: "",
    description: "",
    category: "sales",
    color: "#f54a00",
    id: "",
  });
  const [collaborators, setCollaborators] = useState([]);
  const [activeTagIndex, setActiveTagIndex] = useState(null);

  const { mutate: editDocument, isPending: isEditingLoading } =
    useEditDocument();
  const handleEditDocument = async (e) => {
    e.preventDefault();
    editDocument({...documentData, collaborators}, {
      onSuccess: () => {
        toast.success("Document edited successfully");
        setDocumentData({
          title: "",
          description: "",
          category: "sales",
          id: "",
        });
        setOpen(false);
      },
      onError: (error) => {
        console.error(error);
        toast.error(error?.message || "Failed to edit document");
      },
    });
  };
  return (
    <Card>
      <CardHeader className={"flex justify-between items-center"}>
        <CardTitle>{doc.title}</CardTitle>

        <Button
          variant={"ghost"}
          className={
            "rounded-full cursor-pointer border border-primary/40 bg-accent/30 text-primary"
          }
          asChild
          size={"icon"}
        >
          <Link href={`/app/doc/${doc.id}`}>
            <ChevronRight />
          </Link>
        </Button>
      </CardHeader>

      <CardContent>
        <CardDescription>{doc.description}</CardDescription>
      </CardContent>

      <CardFooter>
        <div className='flex justify-between'>
          {" "}
          <Badge variant={"outline"}>
            {doc.created_at
              ? new Date(doc.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : ""}
          </Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost'>
                <Ellipsis />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant={"ghost"}
                      className={"w-full justify-start px-0 py-1.5 mx-0"}
                      onClick={() => {
                        setDocumentData({
                          title: doc.title,
                          description: doc.description,
                          category: doc.category,
                          id: doc.id,
                        });
                      }}
                    >
                      <FilePenLine
                        size={16}
                        className='opacity-60'
                        aria-hidden='true'
                      />
                      Edit
                    </Button>
                  </DialogTrigger>
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
                          Edit Document
                        </DialogTitle>
                        <DialogDescription className='text-left'>
                          Edit document to make changes
                        </DialogDescription>
                      </DialogHeader>
                    </div>
                    <form className='space-y-5' onSubmit={handleEditDocument}>
                      <div className='space-y-4'>
                        {/* Label */}
                        <div className='*:not-first:mt-2'>
                          <Label>Title</Label>
                          <Input
                            type='text'
                            required
                            value={documentData.title}
                            onChange={(e) =>
                              setDocumentData({
                                ...documentData,
                                title: e.target.value,
                              })
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
                            defaultValue={documentData.category}
                            onValueChange={(e) =>
                              setDocumentData({
                                ...documentData,
                                category: e,
                                color: categoryOptions.find((c) => c.name === e)
                                  .color,
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

                        {/* Collaborators */}
                        <div className='*:not-first:mt-2 w-full gap-2'>
                          {" "}
                          <Label htmlFor={id}>Collaborators</Label>
                          <TagInput
                            id={id}
                            tags={collaborators}
                            type="email"
                            setTags={(newTags) => {
                              setCollaborators(newTags);
                            }}
                           
                            placeholder='e.g johnDoe@gmail.com'
                            styleClasses={{
                              tagList: {
                                container: "gap-3 flex-wrap",
                              },
                              input:
                                "rounded-md w-full transition-[color,box-shadow] placeholder:text-muted-foreground/70 focus-visible:border-ring outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
                              tag: {
                                body: "relative h-7 bg-background border border-input col-span-1 hover:bg-background rounded-md font-medium text-xs ps-2 -mt-1 pe-7",
                                closeButton:
                                  "absolute cursor-pointer -inset-y-px -end-px p-0 rounded-s-none rounded-e-md flex size-7 transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] text-muted-foreground/80 hover:text-foreground",
                              },
                            }}
                            activeTagIndex={activeTagIndex}
                            setActiveTagIndex={setActiveTagIndex}
                            inlineTags={false}
                            inputFieldPosition='top'
                          />
                        </div>
                      </div>
                      {isEditingLoading ? (
                        <Button
                          type='submit'
                          disabled
                          className='w-full animate-pulse'
                        >
                          <LoaderCircle className='animate-spin mr-2' /> Saving
                          Changes...
                        </Button>
                      ) : (
                        <Button type='submit' className='w-full'>
                          Save Changes
                        </Button>
                      )}
                    </form>
                  </DialogContent>
                </Dialog>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <FilesIcon
                    size={16}
                    className='opacity-60'
                    aria-hidden='true'
                  />
                  Clone
                </DropdownMenuItem>
                <DropdownMenuItem className={"text-ring"} variant='destructive'>
                  <TrashIcon size={16} aria-hidden='true' />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Badge
          style={{
            backgroundColor: `${doc?.color}30`,
            color: doc?.color,
            borderColor: doc?.color,
          }}
          className={`mt-5 capitalize`}
        >
          {doc.category}
        </Badge>
      </CardFooter>
    </Card>
  );
};

export default DocCard;
