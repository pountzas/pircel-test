import { getHouses } from "@/actions/getHouses";
import HouseList from "@/components/HouseList";

const INITIAL_HOUSES = 4;

export default async function Home() {
  const initialHouses = await getHouses(0, INITIAL_HOUSES);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white space-y-[48px] py-[80px]">
      <HouseList initialHouses={initialHouses} />
    </main>
  );
}
