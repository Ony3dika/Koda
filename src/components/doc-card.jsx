import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";

const DocCard = ({ doc }) => {
  const categoryOptions = [
    { name: "Sales", color: "orange-600" },
    { name: "Blogging", color: "teal-600" },
    { name: "Personal", color: "purple-600" },
    { name: "Work", color: "yellow-500" },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle>{doc.title}</CardTitle>
      </CardHeader>

      <CardContent>
        <CardDescription>{doc.description}</CardDescription>
      </CardContent>

      <CardFooter className='flex justify-between'>
        <Badge
          className={` ${
            categoryOptions.find((c) => c.name === doc.category).color
          }`}
        >
          {doc.category}
        </Badge>
        <Badge className={"invert"}>{doc.date}</Badge>
      </CardFooter>
    </Card>
  );
};

export default DocCard;
