import Messages from "./Messages";
export default function MainPage() {
  return (
    <main className="bg-black w-full">
      <div className="w-[35%] h-full flex flex-col items-center mx-auto relative min-h-screen">
        <div className="w-full h-[5rem] flex justify-center items-center bg-purple-400 rounded-b-lg">
          <h1>Chat Room</h1>
        </div>
        <Messages />
      </div>
    </main>
  );
}
