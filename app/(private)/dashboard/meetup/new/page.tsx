"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { CreateMeetupForm } from "@/components/meetup/form/create-meetup-form";
import {
  meetupClientSchema,
  type MeetupClientSchema,
} from "@/validations/private/meetupValidation";

export default function CreateMeetup() {
  const form = useForm<MeetupClientSchema>({
    resolver: zodResolver(meetupClientSchema),
    defaultValues: {
      name: "",
      scheduledAt: new Date(),
    },
    mode: "onChange",
  });

  const action = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(
      "formData",
      form.getValues("name"),
      " ",
      form.getValues("scheduledAt"),
    );
  };
  return (
    <div className="flex min-h-screen flex-1 flex-col gap-6 px-4 py-6 sm:px-6 lg:px-10">
      <DashboardHeader
        eyebrow="create meetup"
        title="Meetupを作成"
        description="参加したMeetupを登録すると、そこで出会った人の記録を整理できます。"
      />
      <section className="flex flex-col">
        <CreateMeetupForm form={form} action={action} />
      </section>
    </div>
  );
}
