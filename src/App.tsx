import { profile } from "./data/resume";

export default function App() {
  return (
    <main className="display flex min-h-screen items-center justify-center bg-paper">
      <h1 className="text-4xl">
        {profile.name} · {profile.role}
      </h1>
    </main>
  );
}
