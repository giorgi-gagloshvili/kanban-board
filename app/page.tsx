import Board from "@/components/Board";
import { getData } from "@/lib/api";

export default async function Home() {
  const data = await getData("/inquiries", "");
  return <Board data={data} />;
}
