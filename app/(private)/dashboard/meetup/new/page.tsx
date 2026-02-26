"use client";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { CreateMeetupForm } from "@/components/meetup/form/create-meetup-form";

export default function CreateMeetup() {
  return (
    <div className="flex min-h-screen flex-1 flex-col gap-6 px-4 py-6 sm:px-6 lg:px-10">
      <DashboardHeader
        eyebrow="create meetup"
        title="Meetupを作成"
        description="参加したMeetupを登録すると、そこで出会った人の記録を整理できます。"
      />
      <section className="flex flex-col">
        <CreateMeetupForm />
      </section>
    </div>
  );
}
