import Image from "next/image";

export default async function UsersPage() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/flashcards/`);
  const data = await response.json();
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1>flashcards</h1>
      <ul>
        {data.map((flashcard: any) => (
          <li key={flashcard.id}>{flashcard.question} {flashcard.answer}</li>
        ))}
      </ul>
    </div>
  );
}
