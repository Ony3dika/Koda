"use client";
import { useId, useState } from "react";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import Image from "next/image";
import { MaleBodyType } from "@/constants/preferences";
import { FemaleBodyType } from "@/constants/preferences";
import { styles } from "@/constants/preferences";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
const PreferenceSelectiion = () => {
  const id = useId();
  const [gender, setGender] = useState("male");
  const [bodyType, setBodyType] = useState("rectangle");
  const [clothStyle, setClothStyle] = useState([]);

  const handleCheck = (value, checked) => {
    setClothStyle((prev) =>
      checked ? [...prev, value] : prev.filter((v) => v !== value)
    );
  };
  const savePreferences = async (e) => {
    e.preventDefault();

    const body = {
      gender,
      bodyType,
      clothStyle,
    };

    console.log(body);
  };
  return (
    <form className='mt-5' onSubmit={savePreferences}>
      <div>
        <Label htmlFor={id}>Gender</Label>
        <p
          className='text-muted-foreground my-1 text-xs'
          role='gender'
          aria-live='gender'
        >
          Select your Gender
        </p>
        <Select
          onValueChange={(value) => {
            setGender(value);
          }}
          defaultValue='male'
        >
          <SelectTrigger id={id} className={"md:w-1/3 w-1/2"}>
            <SelectValue placeholder='Male' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='male'>Male</SelectItem>
            <SelectItem value='female'>Female</SelectItem>
            <SelectItem value='non-binary'>Non-binary</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className='mt-5'>
        <Label>Body Type</Label>
        <p
          className='text-muted-foreground my-1 text-xs'
          role='body-type'
          aria-live='body-type'
        >
          Select your Body Type for better fits
        </p>
        <RadioGroup
          defaultValue={bodyType}
          onValueChange={(val) => setBodyType(val)}
          className={"grid 2xl:grid-cols-3 md:grid-cols-2 grid-cols-1"}
        >
          {gender == "female"
            ? FemaleBodyType.map(({ type, value, description, figure, id }) => (
                <div
                  key={value}
                  className='border-input has-data-[state=checked]:border-primary relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none'
                >
                  <RadioGroupItem
                    value={value}
                    id={id}
                    aria-describedby={`${id}-description`}
                    className='order-1 after:absolute after:inset-0'
                  />
                  <div className='flex grow items-center gap-3'>
                    <Image
                      src={figure}
                      className='w-20 h-20 rounded'
                      height={200}
                      width={200}
                      alt='img'
                    />
                    <div className='grid grow gap-2'>
                      <Label htmlFor={`${id}-1`}>{type}</Label>
                      <p
                        id={`${id}-1-description`}
                        className='text-muted-foreground text-xs'
                      >
                        {description}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            : MaleBodyType.map(({ type, value, description, figure, id }) => (
                <div
                  key={value}
                  className='border-input has-data-[state=checked]:border-primary relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none'
                >
                  <RadioGroupItem
                    value={value}
                    id={id}
                    aria-describedby={`${id}-description`}
                    className='order-1 after:absolute after:inset-0'
                  />
                  <div className='flex grow items-center gap-3'>
                    <Image
                      src={figure}
                      className='w-20 h-20 object-cover rounded'
                      height={200}
                      width={200}
                      alt='img'
                    />
                    <div className='grid grow gap-2'>
                      <Label htmlFor={`${id}-1`}>{type}</Label>
                      <p
                        id={`${id}-1-description`}
                        className='text-muted-foreground text-xs'
                      >
                        {description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
        </RadioGroup>
      </div>

      <div className='mt-5'>
        <Label>Style Preference</Label>
        <p
          className='text-muted-foreground my-1 text-xs'
          role='style'
          aria-live='style'
        >
          Pick what fits your vibe
        </p>

        <div className='grid lg:grid-cols-3 grid-cols-3 gap-2'>
          {styles.map(({ id, value }) => (
            <div
              key={id}
              className='border-input has-data-[state=checked]:border-primary/50 relative flex flex-col items-start gap-4 rounded-md border p-3 shadow-xs outline-none'
            >
              <div className='flex items-center gap-2'>
                <Checkbox
                  id={id}
                  value={value}
                  onCheckedChange={(checked) =>
                    handleCheck(value, checked === true)
                  }
                  className='after:absolute after:inset-0'
                />
                <Label className={"capitalize"} htmlFor={id}>
                  {value}
                </Label>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Button className='mt-5 w-full py-6'>Save</Button>
    </form>
  );
};

export default PreferenceSelectiion;
