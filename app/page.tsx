import CallNotification from "@/components/CallNotification";
import ListOnlineUsers from "@/components/ListOnlineUsers";

export default function Home() {
  return (
    <main className="">
      <section className="">
        <ListOnlineUsers />
        <CallNotification />
      </section>
    </main>
  );
}
