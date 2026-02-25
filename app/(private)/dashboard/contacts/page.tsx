import ApolloContactsList from "./ContactsList";

import { getContacts } from "@/app/(private)/dashboard/contacts/_server/server";
import { getUser } from "@/auth";
import { ContactsErrorCard } from "@/components/contacts/contacts-error-card";
import { ContactsHeader } from "@/components/contacts/contacts-header";
import { ContactsList } from "@/components/contacts/contacts-list";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";

export default async function ContactsPage() {
  const contacts = await getContacts();
  const user = await getUser();
  if (!contacts.ok) {
    return <ContactsErrorCard message={contacts.error?.message?.join(" / ")} />;
  }

  const contactList = contacts.data;
  if (!user) return null;
  return (
    <div className="flex min-h-screen flex-1 flex-col gap-6 px-4 py-6 sm:px-6 lg:px-10">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <DashboardHeader
          eyebrow="contacts"
          title="コンタクト一覧"
          description="Meetupで記録したコンタクトの情報を確認し、次のアクションに備えましょう。"
        />
        <ContactsHeader count={contactList.length} />
      </div>

      <section className="space-y-4">
        <ApolloContactsList userId={user.id} />
        <ContactsList contacts={contactList} />
      </section>
    </div>
  );
}
