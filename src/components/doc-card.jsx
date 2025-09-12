import React from "react";
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
  BoltIcon,
  ChevronDownIcon,
  CopyPlusIcon,
  FilesIcon,
  Layers2Icon,
  TrashIcon,
  FilePenLine,
} from "lucide-react";
import Link from "next/link";

const DocCard = ({ doc }) => {
  const categoryOptions = [
    { name: "Sales", color: "#00b8db" }, // orange-600
    { name: "Blogging", color: "#0d9488" }, // teal-600
    { name: "Personal", color: "#9333ea" }, // purple-600
    { name: "Work", color: "#eab308" }, // yellow-500
  ];
  const category = categoryOptions.find((c) => c.name === doc.category);
  console.log(category);

  return (
    <Card>
      <CardHeader className={"flex justify-between items-center"}>
        <CardTitle>{doc.title}</CardTitle>

        <Button
          variant={"ghost"}
          className={"rounded-md bg-accent/30"}
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
          <Badge variant={"outline"}>{doc.date}</Badge>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost'>
                <Ellipsis />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
               
                <DropdownMenuItem>
                  <FilePenLine
                    size={16}
                    className='opacity-60'
                    aria-hidden='true'
                  />
                  Edit
                </DropdownMenuItem>
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
        <Badge style={{ color: category.color }} className={"bg-accent mt-5"}>
          {doc.category}
        </Badge>
      </CardFooter>
    </Card>
  );
};

export default DocCard;
