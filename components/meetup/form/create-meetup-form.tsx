"use client";
import { useMutation } from "@apollo/client/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import type { MeetupClientSchema } from "@/validations/private/meetupValidation";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AddMeetupDocument } from "@/graphql/__generated__/graphql";
import {
  meetupClientSchema,
  type MeetupClientSchema,
} from "@/validations/private/meetupValidation";

export function CreateMeetupForm() {
  const [open, setOpen] = useState(false);
  const [addMeetup, loading] = useMutation(AddMeetupDocument);
  const form = useForm<MeetupClientSchema>({
    resolver: zodResolver(meetupClientSchema),
    defaultValues: {
      name: "",
      scheduledAt: new Date(),
    },
  });

  const action = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addMeetup({
        variables: {
          userId: "",
          name: form.getValues("name"),
          scheduledAt: form.getValues("scheduledAt").toISOString(),
        },
      });
      console.log("true!");
      return true;
    } catch (error) {
      console.log("addMeetup Error: ", error);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={action} className="h-full flex flex-col gap-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ミートアップ名</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="例: ReMeet Community Night"
                  className="text-base"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="scheduledAt"
          render={({ field }) => (
            <FormItem className="space-y-4">
              <div className="">
                <FormLabel>開催日</FormLabel>
              </div>
              <FormControl>
                <div className="flex flex-col gap-3">
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="date"
                        className="w-48 justify-between font-normal"
                      >
                        {field.value
                          ? field.value.toLocaleDateString()
                          : "日付を選択"}
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto overflow-hidden p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => date && field.onChange(date)}
                        captionLayout="dropdown"
                        buttonVariant="ghost"
                        className="w-full"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </FormControl>
              <input
                type="hidden"
                name="scheduledAt"
                value={field.value ? field.value.toLocaleDateString() : ""}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-orange-500 text-white shadow-sm hover:bg-orange-500/90 sm:w-auto"
        >
          {loading.loading ? "追加中" : "追加"}
          {loading.loading ? "TRUE" : "FALSE"}
        </Button>
      </form>
    </Form>
  );
}
